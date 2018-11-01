/// <reference path="../bridge.d.ts" />
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
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Pointer_1 = require("../Pointer");
var JavaObject_1 = require("./JavaObject");
var types_1 = require("./helpers/types");
var MethodNotFoundError = /** @class */ (function (_super) {
    __extends(MethodNotFoundError, _super);
    function MethodNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MethodNotFoundError;
}(Error));
var InvocationError = /** @class */ (function (_super) {
    __extends(InvocationError, _super);
    function InvocationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvocationError;
}(Error));
var Method = /** @class */ (function (_super) {
    __extends(Method, _super);
    function Method(_a) {
        var name = _a.name, parent = _a.parent, pointer = _a.pointer, returnedType = _a.returnedType, argumentTypes = _a.argumentTypes, signature = _a.signature;
        var _this = _super.call(this, { name: name, pointer: pointer }) || this;
        _this.isStatic = false;
        _this.parent = parent;
        _this.returnedType = returnedType;
        _this.argumentTypes = argumentTypes;
        _this.signature = signature || _this.name + ":" + _this.returnedType + ":" + _this.argumentTypes;
        return _this;
    }
    /**
     * @description Initialize this instance using its parent and signature.
     */
    Method.prototype.init = function () {
        assert(this.parent.pointer.pointer > 0, 'Invalid parent pointer');
        try {
            var pointer = __REFLECTOR_getMethod(this.parent.pointer.pointer, this.signature);
            assert(pointer > 0, new MethodNotFoundError);
            this.pointer = new Pointer_1.default(pointer);
        }
        catch (err) {
            throw new MethodNotFoundError('Method signature may be in invalid format');
        }
        this.isStatic = __REFLECTOR_isStatic(this.pointer.pointer);
        return this;
    };
    /**
     * @description Create an uninitialized `Method` instance.
     * @param parent Parent class.
     * @param signature Method signature.
     * e.g. "someMethod:java.lang.String:[I,[Ljava.lang.Object"
     */
    Method.createMethod = function (parent, signature) {
        var parts = signature.split(':');
        assert(parts.length == 3);
        parts[2] = parts[2].split(',');
        return new Method({
            name: parts[0],
            parent: parent,
            pointer: Pointer_1.default.NULL,
            returnedType: parts[1],
            argumentTypes: parts[2],
            signature: signature
        });
    };
    /**
     * @description Invoke a method.
     * @param caller Caller object.
     * @param args Arguments of invocation.
     */
    Method.prototype.invoke = function (caller, args) {
        assert(this.pointer.pointer > 0, 'Uninitialized method');
        var rawIntMap = [];
        var _args = args.map(function (arg, index) {
            switch (typeof arg) {
                case 'undefined': return null;
                case 'number': if (Math.floor(arg) == arg)
                    rawIntMap[index] = true;
                case 'string':
                case 'boolean': return arg;
                default: {
                    assert(arg instanceof JavaObject_1.default && arg.pointer.pointer > 0, "Invalid argument type (index: " + index + ")");
                    return arg.pointer.pointer;
                }
            }
        });
        try {
            var ret = types_1.objectOrCompatibleValue(this.returnedType, __REFLECTOR_invokeMethod(caller && caller.pointer.pointer || 0, this.pointer.pointer, _args, rawIntMap), this.parent.name + "." + this.name + "()");
            if (ret instanceof JavaObject_1.default)
                ret.init();
            return ret;
        }
        catch (err) {
            throw new InvocationError(err);
        }
    };
    Method.MethodNotFoundError = MethodNotFoundError;
    Method.InvocationError = InvocationError;
    return Method;
}(JavaObject_1.default));
exports.Method = Method;
exports.default = Method;
//# sourceMappingURL=Method.js.map