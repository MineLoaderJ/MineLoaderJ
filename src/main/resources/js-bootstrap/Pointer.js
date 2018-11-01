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
var PointerReleaseError = /** @class */ (function (_super) {
    __extends(PointerReleaseError, _super);
    function PointerReleaseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PointerReleaseError;
}(Error));
var PointerAllocateError = /** @class */ (function (_super) {
    __extends(PointerAllocateError, _super);
    function PointerAllocateError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PointerAllocateError;
}(Error));
var PointerManager = /** @class */ (function () {
    function PointerManager() {
        this.pointers = {};
        PointerManager._instance = this;
    }
    Object.defineProperty(PointerManager, "instance", {
        get: function () { return PointerManager._instance; },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Register a new pointer.
     * @param pointer Pointer.
     * @param name Name of this pointer.
     */
    PointerManager.prototype.alloc = function (pointer, name) {
        assert(!(pointer.pointer in this.pointers), new PointerAllocateError);
        this.pointers[pointer.pointer] = pointer;
    };
    /**
     * @description Release a pointer.
     * @param pointer Pointer to be released.
     */
    PointerManager.prototype.delete = function (pointer) {
        delete this.pointers[pointer.pointer];
        __REFLECTOR_releasePointer(pointer.pointer);
    };
    /**
     * @description Get the pointer by name (dangerous).
     * Note that names of `Pointers` is not unique.
     * @param name Name of the pointer.
     */
    PointerManager.prototype.getPointer = function (name) {
        for (var ptr in this.pointers) {
            if (this.pointers[ptr].name == name)
                return this.pointers[ptr];
        }
    };
    /**
     * @description Get the name of the pointer.
     * Note that the name may not be specified.
     * @param pointer Pointer.
     */
    PointerManager.prototype.getName = function (pointer) {
        return this.pointers[pointer.pointer].name;
    };
    /**
     * @description Release all registered pointers.
     * Be aware of that this will invalidate all registered pointers.
     */
    PointerManager.prototype.releaseAll = function () {
        for (var ptr in this.pointers) {
            if (this.pointers[ptr] != Pointer.NULL)
                this.pointers[ptr].release();
        }
    };
    PointerManager.PointerReleaseError = PointerReleaseError;
    PointerManager.PointerAllocateError = PointerAllocateError;
    return PointerManager;
}());
new PointerManager;
var Pointer = /** @class */ (function () {
    function Pointer(pointer, name) {
        if (Pointer.NULL)
            assert(pointer > 0, 'Invalid pointer value');
        this.pointer = pointer;
        this.name = name;
        PointerManager.instance.alloc(this, name || '');
    }
    Pointer.prototype.isValid = function () {
        return __REFLECTOR_isValidPointer(this.pointer);
    };
    Pointer.prototype.release = function () {
        PointerManager.instance.delete(this);
        this.pointer = 0;
    };
    Pointer.prototype.valueOf = function () {
        return this.pointer;
    };
    Pointer.PointerManager = PointerManager;
    Pointer.NULL = (function () {
        var NULL = new Pointer(0, 'NULL');
        NULL.release = function () { throw new PointerReleaseError('Cannot release NULL pointer'); };
        return Object.freeze(NULL);
    })();
    return Pointer;
}());
exports.Pointer = Pointer;
exports.default = Pointer;
//# sourceMappingURL=Pointer.js.map