package tk.a0x00000000.MineLoaderJ;

import com.eclipsesource.v8.*;
import org.bukkit.Bukkit;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitRunnable;
import org.bukkit.scheduler.BukkitTask;
import tk.a0x00000000.MineLoaderJ.listeners.PlayerListener;

import java.util.logging.Level;
import java.util.logging.Logger;

import static tk.a0x00000000.MineLoaderJ.Utils.getStackString;


public class Main extends JavaPlugin implements NodeWrapper.NodeWrapperOwner {
    private static NodeWrapper nodeWrapper;
    private static BukkitTask nodeClock;
    private static Logger logger;

    private int pluginInstancePointer = 0;
    static final String JS_FUNC_PREFIX = "__MINE_LOADER_J_";

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
        nodeWrapper = new NodeWrapper(this, logger);
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
        if(command.getName().equals("eval")) {
            if(args.length <= 0) return true;
            try {
                sender.sendMessage(nodeWrapper.eval(String.join(" ", args), !(sender instanceof Player)));
            } catch(Exception err) {
                sender.sendMessage("Error evaluating script:");
                sender.sendMessage(getStackString(err));
            }
            return true;
        } else if(command.getName().equals("rua")) {
            sender.sendMessage(nodeWrapper.nodeJS.isRunning() + "");
            return true;
        }
        return false;
    }
}
