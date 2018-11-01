package tk.a0x00000000.MineLoaderJ;

import com.eclipsesource.v8.*;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
//import java.util.LinkedList;
//import java.util.Queue;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

import static tk.a0x00000000.MineLoaderJ.Utils.getStackString;
import static tk.a0x00000000.MineLoaderJ.Utils.releaseV8Values;

public class NodeWrapper {
    interface NodeWrapperOwner {
        void registerBootstrapFunctions(V8 runtime, Reflector reflector);
    }
    NodeJS nodeJS;
    V8 runtime;
    Reflector reflector;
    Logger logger;
    NodeWrapperOwner owner;
    Thread currentThread;
    static final String SCRIPT_DIRECTORY = "js-bootstrap";
    static final String SCRIPT_ENTRY = "index.js";
    static final String JS_FUNC_PREFIX = "__REFLECTOR_";


//    private Queue<Runnable> tasks = new LinkedList<>();
//    private synchronized void handleTask() {
//        if(tasks.isEmpty()) return;
//        Runnable task = tasks.poll();
//        task.run();
//    }
//    synchronized void postTask(Runnable task) {
//        tasks.add(task);
//    }

    NodeWrapper(NodeWrapperOwner owner, Logger logger) {
        this.owner = owner;
        this.logger = logger;
        currentThread = Thread.currentThread();
        nodeJS = NodeJS.createNodeJS();
        runtime = nodeJS.getRuntime();
        reflector = new Reflector(logger);
        registerBootstrapFunctions();
        try {
            Path dst = Utils.copyResource(SCRIPT_DIRECTORY, null);
            nodeJS.exec(Paths.get(dst.toString(), SCRIPT_DIRECTORY, SCRIPT_ENTRY).toFile());
            dst.toFile().deleteOnExit();
        } catch (IOException e) {
            if(null != logger) {
                logger.severe("Cannot init Node.js environment: " + getStackString(e));
            }
        }
        if(null != logger) logger.info("Node.js runtime created.");
    }

    void tick() {
        nodeJS.handleMessage();
//        handleTask();
    }

    private void registerBootstrapFunctions() {
        Method[] methods = Reflector.class.getMethods();
        for (Method method : methods) {
            runtime.registerJavaMethod((caller, args) -> {
                int length = args.length();
                Object[] _args = new Object[length];
                for (int i = 0; i < length; i++) {
                    _args[i] = args.get(i);
                }
                try {
                    return method.invoke(reflector, _args);
                } catch (IllegalAccessException | InvocationTargetException err) {
                    releaseV8Values(_args);
                    args.release();
                }
                releaseV8Values(_args);
                args.release();
                return null;
            }, JS_FUNC_PREFIX + method.getName());
        }
        runtime.registerJavaMethod((caller, args) -> {
            return new Long(runtime.getObjectReferenceCount()).intValue();
        }, "getRefs");
        owner.registerBootstrapFunctions(runtime, reflector);
    }

    public String eval(String command, boolean colors) {
        Object result = null;
        V8Array args = new V8Array(runtime);
        try {
            result = runtime.executeScript(command);
            if(null == result) args.pushNull();
            else if(result instanceof V8Value) args.push((V8Value) result);
            else if(result.getClass() == Integer.class) args.push((Integer) result);
            else if(result instanceof String) args.push((String) result);
            else if(result.getClass() == Double.class) args.push((Double) result);
            else if(result.getClass() == Boolean.class) args.push((Boolean) result);
            else {
                args.release();
                return "[ invalid type of result: " + result.getClass().getName() + " ]";
            }
        } catch (V8ResultUndefined err) {
            args.release();
            return colors ? "\u001b[90mundefined\033[0m" : "undefined";  // Not working
        } catch(Exception err) {
            if(result instanceof V8Value) ((V8Value) result).release();
            args.release();
            throw err;
        }
        args.push(colors);
        String str;
        try {
            str = runtime.executeStringFunction("__INSPECT", args);
        } catch(V8RuntimeException e) {
            args.release();
            throw e;
        }
        if(result instanceof V8Value) ((V8Value) result).release();
        args.release();
        if(colors && str.equals("undefined")) return "\u001b[90mundefined\033[0m";  // Not working
        return str.replaceAll("(\u001b\\[39m)|(\u001b\\[22m)", "\033[0m");
    }

    void destroy() {
        // Invoke onDisable hook
        try {
            runtime.executeVoidScript("if(global.onDisable) global.onDisable();");
            // Pump remaining messages
            while(true) {
                if (!nodeJS.handleMessage()) break;
            }
        } catch(V8RuntimeException e) {
            if(null != logger) logger.severe("Cannot emmit onDisable event on Node.js.");
        }
        // Handling remaining tasks
//        while(!tasks.isEmpty()) {
//            handleTask();
//        }
        reflector = null;
        runtime = null;
        try {
            nodeJS.release();
        } catch(IllegalStateException err) {
            if(null != logger) logger.info("Could not release Node.js at this time: " + getStackString(err));
        }
        nodeJS = null;
    }
}
