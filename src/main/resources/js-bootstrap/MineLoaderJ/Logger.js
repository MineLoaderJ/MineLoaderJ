Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    function Logger(name) {
        this.name = name;
        this.prefix = name && name.length ? "[" + name + "] " : '';
    }
    /**
     * @description Write severe logging message.
     * @param messages Logging message.
     */
    Logger.prototype.severe = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logSEVERE(this.prefix + messages.join(' '));
    };
    /**
     * @description Alias of `severe`.
     * @param messages Logging message.
     */
    Logger.prototype.err = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logSEVERE(this.prefix + messages.join(' '));
    };
    /**
     * @description Alias of `severe`.
     * @param messages Logging message.
     */
    Logger.prototype.error = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logSEVERE(this.prefix + messages.join(' '));
    };
    /**
     * @description Write warning logging message.
     * @param messages Logging message.
     */
    Logger.prototype.warning = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logWARNING(this.prefix + messages.join(' '));
    };
    /**
     * @description Alias of `warning`.
     * @param messages Logging message.
     */
    Logger.prototype.warn = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logWARNING(this.prefix + messages.join(' '));
    };
    /**
     * @description Write info logging message.
     * @param messages Logging message.
     */
    Logger.prototype.info = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logINFO(this.prefix + messages.join(' '));
    };
    /**
     * @description Write config logging message.
     * @param messages Logging message.
     */
    Logger.prototype.config = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logCONFIG(this.prefix + messages.join(' '));
    };
    /**
     * @description Write fine logging message.
     * @param messages Logging message.
     */
    Logger.prototype.fine = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logFINE(this.prefix + messages.join(' '));
    };
    /**
     * @description Alias of `fine`.
     * @param messages Logging message.
     */
    Logger.prototype.verbose = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logFINE(this.prefix + messages.join(' '));
    };
    /**
     * @description Write finer logging message.
     * @param messages Logging message.
     */
    Logger.prototype.finer = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logFINER(this.prefix + messages.join(' '));
    };
    /**
     * @description Write finest logging message.
     * @param messages Logging message.
     */
    Logger.prototype.finest = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i] = arguments[_i];
        }
        __MINE_LOADER_J_logFINEST(this.prefix + messages.join(' '));
    };
    return Logger;
}());
exports.Logger = Logger;
exports.default = Logger;
//# sourceMappingURL=Logger.js.map