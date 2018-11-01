package tk.a0x00000000.MineLoaderJ.listeners;

import com.eclipsesource.v8.V8;
import com.sun.media.jfxmedia.events.PlayerEvent;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;

public class PlayerListener implements Listener {
    private V8 runtime;

    public PlayerListener(V8 runtime) {
        this.runtime = runtime;
    }

    @EventHandler
    public void onPlayerJoin(PlayerJoinEvent event) {
        Bukkit.broadcastMessage(ChatColor.GOLD + "Greetings from MineLoaderJ, " + event.getPlayer().getDisplayName());
    }

//    @EventHandler
//    public void rua(PlayerEvent event) {
//
//    }
}
