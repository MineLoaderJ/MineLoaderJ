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
var Java_1 = require("../../../Java");
var CommandSender = /** @class */ (function (_super) {
    __extends(CommandSender, _super);
    function CommandSender(_a) {
        var e_1, _b;
        var name = _a.name, pointer = _a.pointer;
        var _this = _super.call(this, { name: name, pointer: pointer }) || this;
        if (!CommandSender._sendMessage) {
            _this.init();
            var method = _this.getClass().methods.sendMessage;
            if (method instanceof Array) {
                try {
                    for (var method_1 = __values(method), method_1_1 = method_1.next(); !method_1_1.done; method_1_1 = method_1.next()) {
                        var m = method_1_1.value;
                        if (m.argumentTypes.length == 1 && m.argumentTypes[0] == 'java.lang.String') {
                            CommandSender._sendMessage = m;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (method_1_1 && !method_1_1.done && (_b = method_1.return)) _b.call(method_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else
                CommandSender._sendMessage = method;
        }
        return _this;
    }
    CommandSender.prototype.sendMessage = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        CommandSender._sendMessage.invoke(this, [args.join(' ')]);
    };
    return CommandSender;
}(Java_1.JavaObject));
exports.CommandSender = CommandSender;
exports.default = CommandSender;
//# sourceMappingURL=CommandSender.js.map