/// <reference path="../../bridge.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var JavaObject_1 = require("../JavaObject");
var Pointer_1 = require("../../Pointer");
/**
 * @description Get uninitialized object or compatible value according to its type.
 * @param type Class name of the type of the object.
 * @param value Value.
 * @param name Name of the value.
 */
function objectOrCompatibleValue(type, value, name) {
    var val = value;
    if (type == 'int' || type == 'java.lang.Integer' || type == 'I')
        return value;
    else if (value == null) {
        return null;
    }
    else {
        switch (typeof val) {
            case 'string':
            case 'boolean': return val;
            case 'number': {
                if (Math.floor(val) == val) {
                    var _name = "value-" + name + "." + name + "@" + val;
                    var ret = new JavaObject_1.default({
                        name: _name,
                        pointer: new Pointer_1.default(val, _name)
                    });
                    return ret;
                }
                else
                    return val;
            }
            default: throw new TypeError("Unknown value type " + typeof val);
        }
    }
}
exports.objectOrCompatibleValue = objectOrCompatibleValue;
//# sourceMappingURL=types.js.map