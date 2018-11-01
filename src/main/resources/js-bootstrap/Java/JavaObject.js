/// <reference path="../bridge.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var Pointer_1 = require("../Pointer");
var assert = require("assert");
var JavaObject = /** @class */ (function () {
    function JavaObject(_a) {
        var name = _a.name, pointer = _a.pointer;
        this.name = name || '';
        this.pointer = pointer || Pointer_1.default.NULL;
    }
    JavaObject.prototype.init = function () {
        assert(this.pointer.pointer > 0, 'Invalid pointer');
        var className = __REFLECTOR_getTypeNameOfObject(this.pointer.pointer, '');
        assert(className, 'Could not determine value type, please initialize this object manually');
        // Avoid recusive import
        // `forName` is available only when `JavaClass` is imported, but `JavaClass` is a subclass of `JavaObject` and therefore must be imported after `JavaObject`
        this.class = JavaObject.classLoader(className).init();
        return this;
    };
    JavaObject.prototype.getClass = function () {
        return this.class;
    };
    JavaObject.prototype.destroy = function (noException) {
        if (noException === void 0) { noException = false; }
        // Class will not be destroyed
        try {
            this.pointer.release();
            this.pointer = Pointer_1.default.NULL;
        }
        catch (err) {
            if (!noException)
                throw err;
        }
    };
    JavaObject.prototype.toStringValue = function () {
        assert(this.pointer.pointer > 0, 'Invalid pointer');
        return __REFLECTOR_objectToString(this.pointer.pointer);
    };
    return JavaObject;
}());
exports.JavaObject = JavaObject;
exports.default = JavaObject;
//# sourceMappingURL=JavaObject.js.map