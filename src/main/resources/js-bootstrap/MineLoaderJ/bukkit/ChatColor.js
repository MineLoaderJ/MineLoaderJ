Object.defineProperty(exports, "__esModule", { value: true });
var ChatColor = /** @class */ (function () {
    function ChatColor(_a) {
        var code = _a.code, intCode = _a.intCode, isFormat = _a.isFormat;
        this.code = code;
        this.intCode = intCode;
        this.isFormat = isFormat;
        this.string = ChatColor.COLOR_CHAR + code;
    }
    ChatColor.prototype.toString = function () {
        return this.string;
    };
    ChatColor.prototype.valueOf = function () {
        return this.string;
    };
    ChatColor.COLOR_CHAR = '§';
    ChatColor.BLACK = new ChatColor({ code: "0", intCode: 0, isFormat: false });
    ChatColor.DARK_BLUE = new ChatColor({ code: "1", intCode: 1, isFormat: false });
    ChatColor.DARK_GREEN = new ChatColor({ code: "2", intCode: 2, isFormat: false });
    ChatColor.DARK_AQUA = new ChatColor({ code: "3", intCode: 3, isFormat: false });
    ChatColor.DARK_RED = new ChatColor({ code: "4", intCode: 4, isFormat: false });
    ChatColor.DARK_PURPLE = new ChatColor({ code: "5", intCode: 5, isFormat: false });
    ChatColor.GOLD = new ChatColor({ code: "6", intCode: 6, isFormat: false });
    ChatColor.GRAY = new ChatColor({ code: "7", intCode: 7, isFormat: false });
    ChatColor.DARK_GRAY = new ChatColor({ code: "8", intCode: 8, isFormat: false });
    ChatColor.BLUE = new ChatColor({ code: "9", intCode: 9, isFormat: false });
    ChatColor.GREEN = new ChatColor({ code: "a", intCode: 10, isFormat: false });
    ChatColor.AQUA = new ChatColor({ code: "b", intCode: 11, isFormat: false });
    ChatColor.RED = new ChatColor({ code: "c", intCode: 12, isFormat: false });
    ChatColor.LIGHT_PURPLE = new ChatColor({ code: "d", intCode: 13, isFormat: false });
    ChatColor.YELLOW = new ChatColor({ code: "e", intCode: 14, isFormat: false });
    ChatColor.WHITE = new ChatColor({ code: "f", intCode: 15, isFormat: false });
    ChatColor.MAGIC = new ChatColor({ code: "k", intCode: 16, isFormat: false });
    ChatColor.BOLD = new ChatColor({ code: "l", intCode: 17, isFormat: false });
    ChatColor.STRIKETHROUGH = new ChatColor({ code: "m", intCode: 18, isFormat: false });
    ChatColor.UNDERLINE = new ChatColor({ code: "n", intCode: 19, isFormat: false });
    ChatColor.ITALIC = new ChatColor({ code: "o", intCode: 20, isFormat: false });
    ChatColor.RESET = new ChatColor({ code: "r", intCode: 21, isFormat: false });
    return ChatColor;
}());
exports.ChatColor = ChatColor;
exports.default = ChatColor;
//# sourceMappingURL=ChatColor.js.map