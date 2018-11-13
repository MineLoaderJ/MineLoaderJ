package tk.a0x00000000.MineLoaderJ;


import com.eclipsesource.v8.V8Array;
import com.eclipsesource.v8.V8Value;

import java.lang.reflect.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Logger;

import static tk.a0x00000000.MineLoaderJ.Utils.getStackString;
import static tk.a0x00000000.MineLoaderJ.Utils.releaseV8Values;


public class Reflector {
    private int key = 1;
    private HashMap<Integer, Object> pointers = new HashMap<Integer, Object>();
    private Logger logger;
    static private Reflector instance;

    static public Reflector getInstance() {
        return instance;
    }

    public Reflector() {
        instance = this;
    }

    public Reflector(Logger logger) {
        this.logger = logger;
        instance = this;
    }

    private static boolean isCompatibleType(Class clazz) {
        if(null == clazz) return true;
        else if(clazz == int.class) return true;
        else if(clazz == float.class) return true;
        else if(clazz == double.class) return true;
        else if(clazz == boolean.class) return true;
        else if(clazz == void.class) return true;
        else if(clazz == String.class) return true;
        else if(clazz == Integer.class) return true;
        else if(clazz == Float.class) return true;
        else if(clazz == Double.class) return true;
        else if(clazz == Boolean.class) return true;
        else return clazz == Void.class;
    }

    private static boolean canBeCompatibleType(Class clazz) {
        if(isCompatibleType(clazz)) return true;
        if(clazz == long.class) return true;
        else if(clazz == short.class) return true;
        else if(clazz == char.class) return true;
        else if(clazz == byte.class) return true;
        else if(clazz == Long.class) return true;
        else if(clazz == Short.class) return true;
        else if(clazz == Character.class) return true;
        else return clazz == Byte.class;
    }

    private static Object toCompatibleValue(Object value) {
        if(null == value) return null;
        Class type = value.getClass();
        if(isCompatibleType(type)) return value;
        if(type == long.class) return new Long((long) value).intValue();
        else if(type == short.class) return new Short((short) value).intValue();
        else if(type == char.class) return Character.toString((char) value);
        else if(type == byte.class) return new Integer(((byte) value) & 0xff).intValue();
        else if(type == Long.class) return ((Long) value).intValue();
        else if(type == Short.class) return ((Short) value).intValue();
        else if(type == Character.class) return Character.toString((Character) value);
        else if(type == Byte.class) return ((Byte) value).intValue();
        else throw new RuntimeException("Could not convert object type");
    }

    public int putObject(Object obj) {
        assert(null != obj);
        pointers.put(key, obj);
        return key++;
    }
    public boolean releasePointer(int objectPointer) {
        if(pointers.containsKey(objectPointer)) {
            pointers.remove(objectPointer);
            return true;
        } else return false;
    }

    private Class getClassObjectByName(String name) throws ClassNotFoundException {
        switch(name) {
            case "int": return int.class;
            case "long": return long.class;
            case "short": return short.class;
            case "char": return char.class;
            case "float": return float.class;
            case "double": return double.class;
            case "boolean": return boolean.class;
            case "void": return void.class;
            case "byte": return byte.class;
        }
        // Default
        Class<?> clazz;
        if(name.startsWith("[L")) {
            clazz = getClassObjectByName(name.substring(2));
        } else if(name.startsWith("[[")) {
            clazz = getClassObjectByName(name.substring(1));
        }else if(name.endsWith("[]")) {
            clazz = getClassObjectByName(name.substring(0, name.length() - 2));
        } else return Class.forName(name);
        return Array.newInstance(clazz, 0).getClass();
    }

    public int getArrayTypeOfClass(int classPointer) {
        Class<?> clazz = (Class) pointers.getOrDefault(classPointer, null);
        if(null == clazz) return -1;
        return putObject(Array.newInstance(clazz, 0).getClass());
    }

    public int getClassByName(String name) {
        try {
            return putObject(getClassObjectByName(name));
        } catch (ClassNotFoundException e) {
            return -1;
        }
    }

    private String getClassName(Class clazz, String type) {
        switch(type) {
            case "canonical": return clazz.getCanonicalName();
            case "simple": return clazz.getSimpleName();
            case "type": return clazz.getTypeName();
            case "":
            default: return clazz.getName();
        }
    }

    public String getClassName(int classPointer, String type) {
        try {
            Class<?> clazz = (Class) pointers.getOrDefault(classPointer, null);
            return getClassName(clazz, type);
        } catch (ClassCastException err) {
            return null;
        }
    }

    private String getMethodSignature(Method method) {
        StringBuilder sig = new StringBuilder();
        sig
                .append(method.getName()).append(":")
                .append(method.getReturnType().getName()).append(":");
        Class<?>[] types = method.getParameterTypes();
        for (int j = 0, pcount = method.getParameterCount(); j < pcount; j++) {
            sig.append(types[j].getName()).append(j < pcount - 1 ? "," : "");
        }
        return sig.toString();
    }

    public String getMethods(int classPointer, String typeNameType) {
        try {
            Class obj = (Class) pointers.getOrDefault(classPointer, null);
            Method[] methods = obj.getMethods();
            StringBuilder methodInfo = new StringBuilder();
            for (int i = 0, count = methods.length; i < count; i++) {
                methodInfo
                        .append(methods[i].getName()).append(":")
                        .append(getClassName(methods[i].getReturnType(), typeNameType)).append(":");
                Class<?>[] types = methods[i].getParameterTypes();
                for (int j = 0, pcount = methods[i].getParameterCount(); j < pcount; j++) {
                    methodInfo.append(getClassName(types[j], typeNameType)).append(j < pcount - 1 ? "," : "");
                }
                if(i < count - 1) methodInfo.append("\n");
            }
            return methodInfo.toString();
        } catch(ClassCastException err) {
            return null;
        }
    }

    public boolean isStatic(int pointer) {
        Object obj = pointers.getOrDefault(pointer, null);
        if(null == obj) return false;
        if(obj instanceof Method) {
            return Modifier.isStatic(((Method) obj).getModifiers());
        } else if(obj instanceof Field) {
            return Modifier.isStatic(((Field) obj).getModifiers());
        } else return false;
    }

    public boolean isValidPointer(int ptr) {
        return pointers.containsKey(ptr);
    }

    protected Object[] mapPointers(int[] ptrs) {
        if(null == ptrs || ptrs.length == 0) return null;
        int length = ptrs.length;
        Object[] objs = new Object[length];
        for (int i = 0; i < length; i++) {
            objs[i] = pointers.getOrDefault(ptrs[i], null);
        }
        return objs;
    }

    protected Class[] mapTypes(Object[] objs) {
        if(null == objs || objs.length == 0) return null;
        int length = objs.length;
        Class[] clss = new Class[length];
        for (int i = 0; i < length; i++) {
            clss[i] = objs[i].getClass();  // Shouldn't be null
        }
        return clss;
    }

    public int newInstance(int classPointer, V8Array args, V8Array rawIntMap) {
        try {
            if(!pointers.containsKey(classPointer)) return -1;
            Class<?> clazz = (Class) pointers.get(classPointer);
            Object[] argObjects = mapPointers(args, rawIntMap);
            if(argObjects != null && argObjects.length > 0) {
                Constructor<?> constructor = clazz.getConstructor(mapTypes(argObjects));
                return putObject(constructor.newInstance(argObjects));
            } else return putObject(clazz.newInstance());
        } catch (IllegalAccessException | InstantiationException | NoSuchMethodException | InvocationTargetException e) {
            return -1;
        }
    }

    public int getMethod(int classPointer, String methodSignature) {
        try {
            if(!pointers.containsKey(classPointer)) return -1;
            Class<?> clazz = (Class) pointers.get(classPointer);
            String[] sig = methodSignature.split(":", -1);
            String[] typeNames = sig[2].split(",");  // sig[1] should be the type of returned value
            ArrayList<Class<?>> types = new ArrayList<>();
            for (String typeName : typeNames) {
                if(typeName.isEmpty()) continue;
                types.add(getClassObjectByName(typeName));
            }
            if(types.size() == 0) return putObject(clazz.getMethod(sig[0]));
            else return putObject(clazz.getMethod(sig[0], types.toArray(new Class[0])));
        } catch (ClassCastException | ClassNotFoundException | NoSuchMethodException | IndexOutOfBoundsException err) {
            if(null != logger) logger.severe(getStackString(err));
            return -1;
        }
    }

    protected Object[] mapPointers(V8Array args, V8Array rawIntMap) {
        int length = args.length();
        Object[] _args = new Object[length];
        for (int i = 0; i < length; i++) {
            switch (args.getType(i)) {
                // case V8Value.STRING: _args[i] = args.getString(i); break;
                case V8Value.INTEGER: _args[i] = rawIntMap.getBoolean(i) ? args.getInteger(i) : pointers.getOrDefault(args.getInteger(i), null); break;
                default: _args[i] = args.get(i);
            }
        }
        return _args;
    }

    private String getArgumentTypes(Object[] args) {
        if(null == args) return "[ the argument itself is null ]";
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0, length = args.length; i < length; i++) {
            stringBuilder.append(args[i].getClass().getName());
            if(i < length - 1) stringBuilder.append(", ");
        }
        return stringBuilder.toString();
    }

    public Object invokeMethod(int objectPointer, int methodPointer, V8Array args, V8Array rawIntMap) throws InvocationTargetException, IllegalAccessException {
        Object obj = pointers.getOrDefault(objectPointer, null);  // Could be null for static method
        Method method = (Method) pointers.getOrDefault(methodPointer, null);
        Object[] _args = null;
        try {
            Object ret = method.invoke(obj, _args = mapPointers(args, rawIntMap));
            if(null == ret) return null;
            else if(canBeCompatibleType(method.getReturnType())) return toCompatibleValue(ret);
            else return putObject(ret);
        } catch (IllegalAccessException | InvocationTargetException | RuntimeException e) {
            if(null != logger) {
                logger.info(getStackString(e));
                logger.info("Method signature: " + (null != method ? getMethodSignature(method) : "[ the method itself is null ]"));
                logger.info("Got caller type: " + (null != obj ? obj.getClass().getName() : "null"));
                logger.info("Got arguments length: " + (null != _args ? _args.length : 0));
                logger.info("Got argument types: " + getArgumentTypes(_args));
            }
            throw e;
        } finally {
            releaseV8Values(_args);
            args.release();
            rawIntMap.release();
        }
    }

    public String getFields(int classPointer) {
        try {
            Class obj = (Class) pointers.getOrDefault(classPointer, null);
            Field[] fields = obj.getFields();
            StringBuilder fieldInfo = new StringBuilder();
            for (int i = 0, count = fields.length; i < count; i++) {
                fieldInfo
                        .append(fields[i].getName()).append(":")
                        .append(fields[i].getType().getName());
                if(i < count - 1) fieldInfo.append("\n");
            }
            return fieldInfo.toString();
        } catch(ClassCastException err) {
            return null;
        }
    }

    public int getField(int classPointer, String name) {
        try {
            Class obj = (Class) pointers.getOrDefault(classPointer, null);
            return putObject(obj.getField(name));
        } catch (ClassCastException | NoSuchFieldException | NullPointerException e) {
            return -1;
        }
    }

    public Object getFieldValue(int objectPointer, int fieldPointer) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        Field field = (Field) pointers.getOrDefault(fieldPointer, null);
        if(obj == null || field == null) return -1;
        try {
            field.setAccessible(true);
            Object value = field.get(obj);
            try {
                return toCompatibleValue(value);
            } catch (RuntimeException err) {
                return putObject(value);
            }
        } catch (IllegalAccessException e) {
            return -1;
        }
    }

    private int setFieldValue(Object obj, Field field, Object value) {
        try {
            field.setAccessible(true);
            field.set(obj, value);
            return 0;
        } catch (IllegalAccessException e) {
            return -1;
        }
    }

    public int setFieldValue(int objectPointer, int fieldPointer, int pointer) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        Field field = (Field) pointers.getOrDefault(fieldPointer, null);
        Object value = pointers.getOrDefault(pointer, null);
        if(obj == null || field == null) return -1;
        return setFieldValue(obj, field, value);
    }

    public int setFieldRawValue(int objectPointer, int fieldPointer, V8Array value) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        Field field = (Field) pointers.getOrDefault(fieldPointer, null);
        if(obj == null || field == null) return -1;
        Object val = value.get(0);
        if(val.getClass().isPrimitive()) return setFieldValue(obj, field, val);
        else return -1;
    }

    public int getTypeOfObject(int objectPointer) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        if(null == obj) return -1;
        return putObject(obj.getClass());
    }

    public String getTypeNameOfObject(int objectPointer, String type) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        if(null == obj) return null;
        return getClassName(obj.getClass(), type);
    }

    public boolean isCompatibleType(int classPointer) {
        Class clazz;
        try {
            clazz = (Class) pointers.getOrDefault(classPointer, null);
        } catch (ClassCastException err) {
            throw new IllegalArgumentException("Expected a pointer to a class object");
        }
        if(null == clazz) throw new IllegalArgumentException("Invalid pointer");
        return isCompatibleType(clazz);
    }

    public boolean canBeCompatibleType(int classPointer) {
        Class clazz;
        try {
            clazz = (Class) pointers.getOrDefault(classPointer, null);
        } catch (ClassCastException err) {
            return false;
        }
        if(null == clazz) return false;
        return canBeCompatibleType(clazz);
    }

    public Object getCompatibleValue(int objectPointer) {
        Object obj = pointers.getOrDefault(objectPointer, null);
        if(null == obj) return null;
        try {
            return toCompatibleValue(obj);
        } catch (RuntimeException err) {
            return null;
        }
    }

    public String objectToString(int pointer) {
        Object obj = pointers.getOrDefault(pointer, null);
        if(null == obj) return null;
        return obj.toString();
    }

    static public int staticIntTestMethod(int arg) {
        return arg;
    }

    public void voidTestMethod() {
        try {
            assert (null != pointers);
        } catch (AssertionError ignored) {}
    }

    public int intTestMethod() {
        try {
            assert (null != pointers);
        } catch (AssertionError ignored) {}
        return key;
    }

    static public Object compatibleCheck(String name) {
        switch(name) {
            case "int": return 123;
            case "long": return 123L;  // Incompatible
            case "short": return (short) 123;  // Incompatible
            case "char": return 'c';  // Incompatible
            case "float": return 1.123f;
            case "double": return 1.123d;
            case "boolean": return true;
            case "void": return null;
            case "byte": return (byte) 255;  // Incompatible
            default: return null;
        }
    }
}
