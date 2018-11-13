package tk.a0x00000000.MineLoaderJ;

import com.eclipsesource.v8.*;
import com.eclipsesource.v8.utils.V8ObjectUtils;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.scheduler.BukkitTask;
import tk.a0x00000000.MineLoaderJ.block.Block;
import tk.a0x00000000.MineLoaderJ.listeners.PlayerListener;

import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

import static tk.a0x00000000.MineLoaderJ.Utils.getStackString;


public class Main extends JavaPlugin implements NodeWrapper.NodeWrapperOwner {
    private static NodeWrapper nodeWrapper;
    private static BukkitTask nodeClock;
    private static Logger logger;

    private int pluginInstancePointer = 0;
    static final String JS_FUNC_PREFIX = "__MINE_LOADER_J_";
    static final String PLUGIN_DIRECTORY = "MineLoaderJ";

    @Override
    public void registerBootstrapFunctions(V8 runtime, Reflector reflector) {
        runtime.registerJavaMethod((caller, args) -> {
            if(pluginInstancePointer > 0) return pluginInstancePointer;
            else return reflector.putObject(this);
        }, JS_FUNC_PREFIX + "getPluginInstance");
        runtime.registerJavaMethod((caller, args) -> {
            getServer().getConsoleSender().sendMessage(args.getString(0));
        }, JS_FUNC_PREFIX + "sendMessage");
        final Level[] levels = new Level[] { Level.SEVERE, Level.WARNING, Level.INFO, Level.CONFIG, Level.FINE, Level.FINER, Level.FINEST };
        for (Level level : levels) {
            runtime.registerJavaMethod((caller, args) -> {
                logger.log(level, args.getString(0));
            }, JS_FUNC_PREFIX + "log" + level.getName());
        }
        runtime.registerJavaMethod((caller, args) -> {
            Bukkit.broadcastMessage(args.getString(0));
        }, JS_FUNC_PREFIX + "broadcastMessage");
        getServer().getPluginManager().registerEvents(new PlayerListener(runtime), this);
    }

    @Override
    public void onEnable() {
        getLogger().info("MineLoaderJ loaded.");
        logger = getLogger();
        final String jarPath = getClass().getProtectionDomain().getCodeSource().getLocation().toString().replaceFirst("file:/", "");
        nodeWrapper = new NodeWrapper(this, logger, Paths.get(System.getProperty("os.name").contains("Mac OS") ? "/" : "", Paths.get(jarPath).getParent().toString(), Main.PLUGIN_DIRECTORY, "node_modules"));
        nodeClock = new BukkitRunnable() {
            @Override
            public void run() {
                nodeWrapper.tick();
            }
        }.runTaskTimer(this, 10, 1);
    }

    @Override
    public void onDisable() {
        getLogger().info("MineLoaderJ disabled.");
        try {
            nodeClock.cancel();
            nodeWrapper.destroy();
        } catch (Exception e) {
            logger.info("Could not release Node.js runtime at this time: " + getStackString(e));
        } finally {
            nodeClock = null;
            nodeWrapper = null;
            logger = null;
        }
    }

    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        final String commandName = command.getName();
        switch (commandName) {
            case "eval":
                if (args.length <= 0) return true;
                try {
                    sender.sendMessage(nodeWrapper.eval(String.join(" ", args), !(sender instanceof Player)));
                } catch (Exception err) {
                    sender.sendMessage("Error evaluating script:");
                    sender.sendMessage(getStackString(err));
                }
                return true;
            case "rua":
                sender.sendMessage(nodeWrapper.nodeJS.isRunning() + "");
                return true;
            case "js":
                if (args.length < 1) return false;
                V8Array onCommandArgs = new V8Array(nodeWrapper.runtime);
                V8Array commandArgs = new V8Array(nodeWrapper.runtime);
                try {
                    onCommandArgs.push(nodeWrapper.reflector.putObject(sender));
                    onCommandArgs.push(args[0]);
                    for (int i = 1, length = args.length; i < length; i++) commandArgs.push(args[i]);
                    onCommandArgs.push(commandArgs);
                    nodeWrapper.runtime.executeVoidFunction("onCommand", onCommandArgs);
                    return true;
                } catch (Exception err) {
                    logger.warning("Error emitting `command` event: " + getStackString(err));
                    return false;
                } finally {
                    // I create them and they are not passed pack via a return statement, so I must release them
                    commandArgs.release();
                    onCommandArgs.release();
                }
        }
        return false;
    }
}
