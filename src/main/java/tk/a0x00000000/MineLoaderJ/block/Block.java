package tk.a0x00000000.MineLoaderJ.block;

import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.World;
//import org.bukkit.plugin.java.JavaPlugin;

public class Block {
//    private JavaPlugin plugin;
//    public Block(JavaPlugin plugin) {
//        this.plugin = plugin;
//    }
    public static void setBlock(World world, int x, int y, int z, String materialName, int data) {
        if(null == world) world = Bukkit.getWorld("world");
        org.bukkit.block.Block block = world.getBlockAt(x, y, z);
        Material material;
        try {
            material = Material.valueOf(materialName);
        } catch(IllegalArgumentException err) {
            return;
        }
        block.setType(material);
        block.setData((byte) data);
    }
}
