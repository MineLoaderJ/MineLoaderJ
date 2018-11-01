package tk.a0x00000000.MineLoaderJ;

import com.eclipsesource.v8.V8Value;

import java.io.*;
import java.net.JarURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;


class Utils {
    static String getStackString(Exception err) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        err.printStackTrace(pw);
        pw.flush();
        sw.flush();
        try {
            sw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        pw.close();
        return sw.toString();
    }

    static void releaseV8Values(Object[] args) {
        if(null == args) return;
        for (Object arg : args) {
            if(arg instanceof V8Value) ((V8Value) arg).release();
        }
    }

    static Path copyResource(String resource, ClassLoader loader) throws IOException {
        if(null == loader) loader = Utils.class.getClassLoader();
        URL url = loader.getResource(resource);
        if(null == url) throw new IOException("No such resource");
        Path dir = Files.createTempDirectory(Utils.class.getSimpleName());
        String[] paths = url.toString().split("!/");
        String jarPath = paths[0] + "!/";
        URL jarURL = new URL(jarPath);
        JarURLConnection jarURLConnection = (JarURLConnection) jarURL.openConnection();
        JarFile jarFile = jarURLConnection.getJarFile();
        Enumeration<JarEntry> jarEntries = jarFile.entries();
        while(jarEntries.hasMoreElements()) {
            JarEntry entry = jarEntries.nextElement();
            String name = entry.getName();
            if(name.startsWith(resource)) {
                Path dst = Paths.get(dir.toString(), name);
                if(entry.isDirectory()) {
                    Files.createDirectories(dst);
                } else {
                    File parent = dst.toFile().getParentFile();
                    if(!parent.exists()) Files.createDirectories(parent.toPath());
                    try(InputStream is = loader.getResourceAsStream(name)) {
                        Files.copy(is, dst);
                    }
                }
            }
        }
        return dir;
    }
}
