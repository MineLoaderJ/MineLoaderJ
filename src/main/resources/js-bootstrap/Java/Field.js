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
var FieldNotFoundError = /** @class */ (function (_super) {
    __extends(FieldNotFoundError, _super);
    function FieldNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldNotFoundError;
}(Error));
var FieldAccessError = /** @class */ (function (_super) {
    __extends(FieldAccessError, _super);
    function FieldAccessError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldAccessError;
}(Error));
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field(_a) {
        var name = _a.name, type = _a.type, signature = _a.signature, parent = _a.parent, pointer = _a.pointer;
        var _this = _super.call(this, { name: name, pointer: pointer }) || this;
        _this.isStatic = false;
        _this.type = type;
        _this.signature = signature;
        _this.parent = parent;
        return _this;
    }
    /**
     * @description Initialize this instance using its parent and name.
     */
    Field.prototype.init = function () {
        assert(this.parent.pointer.pointer > 0, 'Invalid parent pointer');
        try {
            var pointer = __REFLECTOR_getField(this.parent.pointer.pointer, this.name);
            assert(pointer > 0, new FieldNotFoundError);
            this.pointer = new Pointer_1.default(pointer);
        }
        catch (err) {
            throw new FieldNotFoundError(err);
        }
        this.isStatic = __REFLECTOR_isStatic(this.pointer.pointer);
        return this;
    };
    /**
     * @description Create an uninitialized `Field` instance.
     * @param parent Parent class.
     * @param signature Field signature.
     * e.g. "someField:java.lang.String"
     */
    Field.createField = function (parent, signature) {
        var parts = signature.split(':');
        assert(parts.length == 2, "Invalid signature: " + signature);
        return new Field({
            name: parts[0],
            type: parts[1],
            parent: parent,
            pointer: Pointer_1.default.NULL,
            signature: signature
        });
    };
    /**
     * @description Set the value of the field.
     * @param instance Instance object.
     * @param value Desired field value.
     */
    Field.prototype.set = function (instance, value) {
        assert(this.pointer.pointer > 0, 'Uninitialized field');
        var result = -1;
        try {
            if (value == null)
                __REFLECTOR_setFieldValue(instance && instance.pointer.pointer || 0, this.pointer.pointer, 0);
            else if (value instanceof JavaObject_1.default) {
                result = __REFLECTOR_setFieldValue(instance && instance.pointer.pointer || 0, this.pointer.pointer, value.pointer.pointer);
            }
            else {
                result = __REFLECTOR_setFieldRawValue(instance && instance.pointer.pointer || 0, this.pointer.pointer, [value]);
            }
        }
        catch (err) {
            throw new FieldAccessError(err);
        }
        if (result < 0)
            throw new FieldAccessError;
    };
    /**
     * @description Get the value of a field, return an uninitialized instance of `JavaObject` or compatible value.
     * @param instance Instance object.
     */
    Field.prototype.get = function (instance) {
        assert(this.pointer.pointer > 0, 'Uninitialized field');
        var val;
        try {
            val = __REFLECTOR_getFieldValue(instance && instance.pointer.pointer || 0, this.pointer.pointer);
        }
        catch (err) {
            throw new FieldAccessError(err);
        }
        try {
            val = types_1.objectOrCompatibleValue(this.type, val, this.parent.name + "." + this.name);
        }
        catch (err) {
            throw new FieldAccessError("Unknown value type " + typeof val);
        }
        if (val instanceof JavaObject_1.default) {
            val.class = this.parent;
        }
        return val;
    };
    Field.FieldNotFoundError = FieldNotFoundError;
    Field.FieldAccessError = FieldAccessError;
    return Field;
}(JavaObject_1.default));
exports.Field = Field;
exports.default = Field;
//# sourceMappingURL=Field.js.map