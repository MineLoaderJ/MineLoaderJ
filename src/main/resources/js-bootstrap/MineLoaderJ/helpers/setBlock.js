Object.defineProperty(exports, "__esModule", { value: true });
var Java_1 = require("../../Java");
var assert = require("assert");
var Block = Java_1.JavaClass.forName('tk.a0x00000000.MineLoaderJ.block.Block').init();
var method = Block.methods.setBlock;
function setBlock(world, x, y, z, material, data) {
    if (data === void 0) { data = 0x00; }
    assert(0 <= data && data < 256, 'Block data out of range');
    method.invoke(Block, [world || null, x, y, z, material, data]);
}
exports.setBlock = setBlock;
//# sourceMappingURL=setBlock.js.map