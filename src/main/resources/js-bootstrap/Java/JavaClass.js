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
var JavaObject_1 = require("./JavaObject");
var Method_1 = require("./Method");
var Field_1 = require("./Field");
var Pointer_1 = require("../Pointer");
var ClassReleaseError = /** @class */ (function (_super) {
    __extends(ClassReleaseError, _super);
    function ClassReleaseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClassReleaseError;
}(Error));
var ClassAllocateError = /** @class */ (function (_super) {
    __extends(ClassAllocateError, _super);
    function ClassAllocateError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClassAllocateError;
}(Error));
var ClassNotFoundError = /** @class */ (function (_super) {
    __extends(ClassNotFoundError, _super);
    function ClassNotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ClassNotFoundError;
}(Error));
var ClassManager = /** @class */ (function () {
    function ClassManager() {
        this.classes = {};
        ClassManager._instance = this;
    }
    Object.defineProperty(ClassManager, "instance", {
        get: function () { return ClassManager._instance; },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Register a new class.
     * @param clazz Instance of `JavaClass`.
     * @param name Unique name of this class.
     */
    ClassManager.prototype.alloc = function (clazz, name) {
        assert(!(name in this.classes), new ClassAllocateError);
        this.classes[name] = clazz;
    };
    /**
     * @description Release a class.
     * @param clazz Class to be released.
     */
    ClassManager.prototype.delete = function (clazz, noException) {
        if (noException === void 0) { noException = false; }
        if (typeof clazz == 'string') {
            this.classes[clazz].destroy(noException);
            delete this.classes[clazz];
        }
        else {
            for (var className in this.classes) {
                if (this.classes[className] == clazz) {
                    try {
                        clazz.destroy(noException);
                    }
                    catch (err) {
                        if (!noException)
                            throw new ClassReleaseError;
                    }
                    delete this.classes[className];
                    return;
                }
            }
        }
    };
    /**
     * @description Get registered class object by name.
     * @param name Name of the class.
     */
    ClassManager.prototype.getClass = function (name) {
        return this.classes[name];
    };
    ClassManager.ClassReleaseError = ClassReleaseError;
    ClassManager.ClassAllocateError = ClassAllocateError;
    return ClassManager;
}());
new ClassManager;
/**
 * Wrapper of Java class.
 */
var JavaClass = /** @class */ (function (_super) {
    __extends(JavaClass, _super);
    function JavaClass(_a) {
        var name = _a.name, pointer = _a.pointer;
        var _this = _super.call(this, { name: name, pointer: pointer }) || this;
        _this.ClassManager = ClassManager;
        if (_this.pointer.pointer > 0)
            ClassManager.instance.alloc(_this, name);
        return _this;
    }
    /**
     * @description Get or create the class object by name. May not be initialized.
     * @param name Class name.
     */
    JavaClass.forName = function (name) {
        var clazz;
        if (clazz = ClassManager.instance.getClass(name))
            return clazz;
        try {
            var pointer = new Pointer_1.default(__REFLECTOR_getClassByName(name), name); // Will throw an error if invalid
            return new JavaClass({ name: name, pointer: pointer });
        }
        catch (err) {
            throw new ClassNotFoundError(err);
        }
    };
    JavaClass.prototype.init = function () {
        assert(this.pointer.pointer > 0, 'Invalid pointer');
        this.getMethods();
        this.getFields();
        return this;
    };
    JavaClass.prototype.destroy = function (noException) {
        if (noException === void 0) { noException = false; }
        _super.prototype.destroy.call(this, noException);
        if (this.methods) {
            var err_1;
            for (var methodName in this.methods) {
                var method = this.methods[methodName];
                if (method instanceof Method_1.default) {
                    try {
                        method.destroy(noException);
                    }
                    catch (e) {
                        err_1 = e;
                    }
                }
                else {
                    method.forEach(function (overloadedMethod) {
                        try {
                            overloadedMethod.destroy(noException);
                        }
                        catch (e) {
                            err_1 = e;
                        }
                    });
                }
            }
            if (err_1 && !noException)
                throw err_1;
        }
        if (this.fields) {
            var err = void 0;
            for (var fieldName in this.fields) {
                try {
                    this.fields[fieldName].destroy();
                }
                catch (e) {
                    err = e;
                }
            }
            if (err && !noException)
                throw err;
        }
    };
    /**
     * @description Get name of this class in Java.
     * `this.name` cannot be trusted.
     * @param type Type of desired type string format in returned value.
     */
    JavaClass.prototype.getName = function (type) {
        if (type === void 0) { type = ''; }
        if (this.javaName[type])
            return this.javaName[type];
        else
            return this.javaName[type] = __REFLECTOR_getClassName(this.pointer.pointer, type);
    };
    /**
     * @description Get all methods.
     */
    JavaClass.prototype.getMethods = function () {
        var _this = this;
        if (this.methods)
            return this.methods;
        this.methods = Object.create(null);
        var methodString = __REFLECTOR_getMethods(this.pointer.pointer, '');
        assert(methodString != null);
        var methodsString = methodString.replace(/;/g, '').split('\n');
        if (methodsString.length == 1 && methodsString[0] == '')
            methodsString = [];
        var methods = methodsString.map(function (method) { return Method_1.default.createMethod(_this, method); });
        methods.forEach(function (method) {
            try {
                method.init();
            }
            catch (err) { } // Ignore uninitialization failure
            // May be overloaded
            if (!_this.methods[method.name])
                _this.methods[method.name] = method;
            else if (_this.methods[method.name] instanceof Array)
                _this.methods[method.name].push(method);
            else if (_this.methods[method.name] instanceof Method_1.default)
                _this.methods[method.name] = [_this.methods[method.name], method];
        });
        return this.methods;
    };
    /**
     * @description Get method object by name.
     * @param methodName Method name.
     */
    JavaClass.prototype.getMethod = function (methodName) {
        return this.getMethods()[methodName];
    };
    /**
     * @description Get all fields.
     */
    JavaClass.prototype.getFields = function () {
        var _this = this;
        if (this.fields)
            return this.fields;
        this.fields = Object.create(null);
        var fieldString = __REFLECTOR_getFields(this.pointer.pointer);
        assert(fieldString != null);
        var fieldsString = fieldString.replace(/;/g, '').split('\n');
        if (fieldsString.length == 1 && fieldsString[0] == '')
            fieldsString = [];
        var fields = fieldsString.map(function (field) { return Field_1.default.createField(_this, field); });
        fields.forEach(function (field) {
            try {
                field.init();
            }
            catch (err) { } // Ignore uninitialization failure
            _this.fields[field.name] = field;
        });
        return this.fields;
    };
    /**
     * @description Get field object by name.
     * @param fieldName Name of the field.
     */
    JavaClass.prototype.getField = function (fieldName) {
        return this.getFields()[fieldName];
    };
    JavaClass.ClassNotFoundError = ClassNotFoundError;
    return JavaClass;
}(JavaObject_1.default));
exports.JavaClass = JavaClass;
JavaObject_1.default.classLoader = JavaClass.forName;
exports.default = JavaClass;
//# sourceMappingURL=JavaClass.js.map