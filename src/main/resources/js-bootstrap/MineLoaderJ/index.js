var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JavaObject_1 = require("../Java/JavaObject");
var Pointer_1 = require("../Pointer");
var ChatColor_1 = require("./bukkit/ChatColor");
var Logger_1 = require("./Logger");
var util_1 = require("util");
var events_1 = require("events");
var MineLoaderJ = /** @class */ (function (_super) {
    __extends(MineLoaderJ, _super);
    /**
     * @description Don't instantiate this class manually!
     */
    function MineLoaderJ() {
        var e_1, _a;
        var _this = _super.call(this) || this;
        _this.logger = new Logger_1.Logger;
        MineLoaderJ.instance = _this;
        var pointer = __MINE_LOADER_J_getPluginInstance();
        _this.pluginInstance = new JavaObject_1.default({
            name: 'MineLoaderJ.instance',
            pointer: new Pointer_1.default(pointer, 'MineLoaderJ.instance')
        }).init();
        if (!(_this.pluginInstance.class.methods.getServer instanceof Array)) {
            _this.server = _this.pluginInstance.class.methods.getServer.invoke(_this.pluginInstance, []).init();
        }
        _this.Server = _this.server.getClass();
        if (!(_this.Server.methods.getConsoleSender instanceof Array)) {
            _this.consoleSender = _this.Server.methods.getConsoleSender.invoke(_this.server, []).init();
        }
        _this.ConsoleSender = _this.consoleSender.getClass();
        if (_this.ConsoleSender.methods.sendMessage instanceof Array) {
            try {
                for (var _b = __values(_this.ConsoleSender.methods.sendMessage), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var method = _c.value;
                    if (method.argumentTypes.length == 1 && method.argumentTypes[0] == 'java.lang.String') {
                        _this.sendMessage = method;
                        break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            _this.sendMessage = _this.ConsoleSender.methods.sendMessage;
        }
        // Register `__INSPECT`
        function __INSPECT(obj, colors) {
            return util_1.inspect(obj, { colors: colors, maxArrayLength: 20 });
        }
        Object.defineProperty(global, '__INSPECT', {
            enumerable: true,
            writable: false,
            configurable: true,
            value: __INSPECT
        });
        // Register `onDisable` hook
        var self = _this;
        function onDisable() {
            self.emit(MineLoaderJ.DISABLE);
            self.logger.info('`disable` event emitted');
        }
        Object.defineProperty(global, 'onDisable', {
            enumerable: true,
            writable: false,
            configurable: true,
            value: onDisable
        });
        // Initialize logger
        // TODO: Load modules
        // Emit `enable` event
        _this.emit(MineLoaderJ.ENABLE);
        _this.logger.info('`enable` event emitted');
        return _this;
    }
    /**
     * @description Send messages directly to the console.
     * @param messages Messages to send.
     */
    MineLoaderJ.prototype.sendMessageToConsole = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        // this.sendMessage.invoke(this.consoleSender, [ args.join(' ') ])
        __MINE_LOADER_J_sendMessage(messages.join(' '));
    };
    /**
     * @description Broadcast message to whole server.
     * @param messages Message to broadcast.
     */
    MineLoaderJ.prototype.broadcastMessage = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_broadcastMessage(messages.join(' '));
    };
    MineLoaderJ.ChatColor = ChatColor_1.default;
    MineLoaderJ.Logger = Logger_1.default;
    MineLoaderJ.ENABLE = 'enable';
    MineLoaderJ.DISABLE = 'disable';
    return MineLoaderJ;
}(events_1.EventEmitter));
exports.MineLoaderJ = MineLoaderJ;
new MineLoaderJ;
exports.default = MineLoaderJ;
//# sourceMappingURL=index.js.map