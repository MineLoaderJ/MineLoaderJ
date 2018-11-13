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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var promise_1 = require("../helpers/promise");
var path_1 = require("path");
var events_1 = require("events");
var assert = require("assert");
var fs = require("fs");
var CommandSender_1 = require("./bukkit/command/CommandSender");
var Player_1 = require("./bukkit/entity/Player");
var bukkit = require("./bukkit");
var helpers = require("./helpers");
var MineLoaderJ = /** @class */ (function (_super) {
    __extends(MineLoaderJ, _super);
    /**
     * @description Don't instantiate this class manually!
     */
    function MineLoaderJ() {
        var e_1, _a;
        var _this = _super.call(this) || this;
        _this.logger = new Logger_1.default;
        // static COMMAND: string = 'command'
        _this.plugins = [];
        _this.commands = {};
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
        _this.registerGlobalFunctions();
        // TODO: Load modules
        _this.loadPlugins();
        var handler = MineLoaderJ.getOnUncaughtErrorHandler(_this);
        process.on('uncaughtException', handler);
        process.on('unhandledRejection', handler);
        return _this;
    }
    MineLoaderJ.getOnUncaughtErrorHandler = function (self) {
        return function onUncaughtError(err) {
            self.logger.err("An error/rejection has occurred and was not caught: " + (err && (err.stack || err.message) || 'unknown error'));
        };
    };
    MineLoaderJ.prototype.registerGlobalFunctions = function () {
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
        var self = this;
        // Register `onDisable` hook
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
        // Register `onCommand` hook
        function onCommand(senderPointer, commandName, args) {
            if (!(commandName in self.commands))
                return;
            /*
            const name: string = `commandSender@${senderPointer}`
            let sender: any = new JavaObject({
              name,
              pointer: new Pointer(senderPointer, name)
            }).init()
            let sendMessage: Method | Method[] = sender.getClass().methods.sendMessage
            if(sendMessage instanceof Array) {
              for(let m of sendMessage) {
                if(m.argumentTypes.length == 1 && m.argumentTypes[0] == 'java.lang.String') {
                  sendMessage = m
                  break
                }
              }
            }
            function _sendMessage(...args: string[]) {
              (sendMessage as Method).invoke(sender, [ args.join(' ') ])
            }
            sender.sendMessage = _sendMessage
            */
            var name = "commandSender@" + senderPointer;
            var sender;
            if (__REFLECTOR_getTypeNameOfObject(senderPointer, '').match(/Player$/)) {
                var _name = "player@" + senderPointer;
                sender = new Player_1.Player({
                    name: name,
                    pointer: new Pointer_1.default(senderPointer, name)
                });
            }
            else {
                sender = new CommandSender_1.CommandSender({
                    name: name,
                    pointer: new Pointer_1.default(senderPointer, name)
                });
            }
            if (!self.commands[commandName].onCommand(sender, commandName, args)) {
                sender.sendMessage("Usage: " + self.commands[commandName].usage);
            }
            // self.emit(MineLoaderJ.COMMAND, sender as JavaObject & { sendMessage(...args: string[]): void }, commandName, args, (successful: boolean) => {
            //   // onFinish handler
            //   if(!successful) {
            //     (sender.sendMessage as typeof _sendMessage)(`Usage: ${self.commands[commandName].usage}`)
            //   }
            // })
            sender.destroy();
            // self.logger.info('`command` event emitted')
        }
        Object.defineProperty(global, 'onCommand', {
            enumerable: true,
            writable: false,
            configurable: true,
            value: onCommand
        });
    };
    MineLoaderJ.prototype.loadPlugins = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, e_3, _b, e_4, _c, readdir, mkdir, stat, pluginNames, info, err_1, err_2, err_3, pluginNames_1, pluginNames_1_1, pluginName, plugin, commands, commands_1, commands_1_1, command, commands_2, commands_2_1, command;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        readdir = promise_1.default(fs.readdir);
                        mkdir = promise_1.default(fs.mkdir);
                        stat = promise_1.default(fs.stat);
                        this.logger.info('Loading js plugins...');
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, stat(MineLoaderJ.pluginPath)];
                    case 2:
                        info = _d.sent();
                        assert(info && info.isDirectory());
                        return [3 /*break*/, 8];
                    case 3:
                        err_1 = _d.sent();
                        // Doesn't exist or is not a directory
                        this.logger.info('Plugin directory doesn\'t exist, creating...');
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, mkdir(MineLoaderJ.pluginPath)];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_2 = _d.sent();
                        this.logger.err("Unable to create a directory for plugins: " + (err_2 && (err_2.stack || err_2.message) || 'unknonw error'));
                        return [2 /*return*/];
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        _d.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, readdir(MineLoaderJ.pluginPath)];
                    case 9:
                        pluginNames = _d.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        err_3 = _d.sent();
                        this.logger.err("Unable to open plugin directory: " + (err_3 && (err_3.stack || err_3.message) || 'unknonw error'));
                        return [2 /*return*/];
                    case 11:
                        try {
                            for (pluginNames_1 = __values(pluginNames), pluginNames_1_1 = pluginNames_1.next(); !pluginNames_1_1.done; pluginNames_1_1 = pluginNames_1.next()) {
                                pluginName = pluginNames_1_1.value;
                                if (pluginName == 'node_modules')
                                    continue;
                                plugin = void 0;
                                try {
                                    plugin = require(path_1.join(MineLoaderJ.pluginPath, pluginName));
                                    assert(plugin.name);
                                    plugin.logger = new Logger_1.default(plugin.name);
                                    plugin.init(this, plugin.logger); // Plugins must listen to `enable` and `disable` events; plugins must resolve command conflict
                                    commands = void 0;
                                    if (plugin.commands && (commands = Object.keys(plugin.commands)).length) {
                                        try {
                                            for (commands_1 = __values(commands), commands_1_1 = commands_1.next(); !commands_1_1.done; commands_1_1 = commands_1.next()) {
                                                command = commands_1_1.value;
                                                if (typeof plugin.commands[command].onCommand != 'function') {
                                                    this.logger.err("No `onCommand` handler for command: " + command);
                                                    throw new Error('No \`onCommand\` handler');
                                                }
                                                if (command in this.commands) {
                                                    this.logger.err("Conflict command: " + command);
                                                    throw new Error('Conflict command');
                                                }
                                            }
                                        }
                                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                        finally {
                                            try {
                                                if (commands_1_1 && !commands_1_1.done && (_b = commands_1.return)) _b.call(commands_1);
                                            }
                                            finally { if (e_3) throw e_3.error; }
                                        }
                                        try {
                                            for (commands_2 = __values(commands), commands_2_1 = commands_2.next(); !commands_2_1.done; commands_2_1 = commands_2.next()) {
                                                command = commands_2_1.value;
                                                plugin.commands[command].plugin = plugin; // Circular
                                                this.commands[command] = plugin.commands[command];
                                            }
                                        }
                                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                        finally {
                                            try {
                                                if (commands_2_1 && !commands_2_1.done && (_c = commands_2.return)) _c.call(commands_2);
                                            }
                                            finally { if (e_4) throw e_4.error; }
                                        }
                                    }
                                    this.plugins.push(plugin);
                                    this.logger.info("\u001B[36mPlugin loaded: " + plugin.name + "\u001B[0m");
                                }
                                catch (err) {
                                    this.logger.warn("Skipped file/directory: " + pluginName + " (" + err.name + ":" + err.message + ")");
                                    this.logger.finer("Reason " + (err && (err.stack || err.message) || 'unknown'));
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (pluginNames_1_1 && !pluginNames_1_1.done && (_a = pluginNames_1.return)) _a.call(pluginNames_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        if (!this.plugins.length)
                            this.logger.warn('No js plugins are loaded');
                        // Emit `enable` event
                        this.emit(MineLoaderJ.ENABLE);
                        this.logger.info('`enable` event emitted');
                        return [2 /*return*/];
                }
            });
        });
    };
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
    MineLoaderJ.bukkit = bukkit;
    MineLoaderJ.helpers = helpers;
    MineLoaderJ.Logger = Logger_1.default;
    MineLoaderJ.jarPath = process.platform == 'darwin' ? path_1.join('/', __UTIL_getPath()) : __UTIL_getPath();
    MineLoaderJ.path = path_1.dirname(MineLoaderJ.jarPath);
    MineLoaderJ.pluginDirectoryName = 'MineLoaderJ';
    MineLoaderJ.pluginPath = path_1.join(MineLoaderJ.path, MineLoaderJ.pluginDirectoryName);
    MineLoaderJ.ENABLE = 'enable';
    MineLoaderJ.DISABLE = 'disable';
    return MineLoaderJ;
}(events_1.EventEmitter));
exports.MineLoaderJ = MineLoaderJ;
new MineLoaderJ;
exports.default = MineLoaderJ;
//# sourceMappingURL=index.js.map