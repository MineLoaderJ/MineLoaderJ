/// <reference path="bridge.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var _Java = require("./Java");
var Pointer_1 = require("./Pointer");
var MineLoaderJ_1 = require("./MineLoaderJ"); // Must be imported after JavaObject and JavaClass
Object.defineProperty(global, 'require', {
    enumerable: true,
    writable: false,
    configurable: true,
    value: require
});
Object.defineProperty(global, 'Java', {
    enumerable: true,
    writable: false,
    configurable: true,
    value: _Java
});
Object.defineProperty(global, 'Pointer', {
    enumerable: true,
    writable: false,
    configurable: true,
    value: Pointer_1.default
});
Object.defineProperty(global, 'MineLoaderJ', {
    enumerable: true,
    writable: false,
    configurable: true,
    value: MineLoaderJ_1.default
});
//# sourceMappingURL=index.js.map