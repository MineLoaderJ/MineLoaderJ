/// <reference path="../../../src/bridge.d.ts" />
import JavaObject from "../JavaObject";
/**
 * @description Get uninitialized object or compatible value according to its type.
 * @param type Class name of the type of the object.
 * @param value Value.
 * @param name Name of the value.
 */
export declare function objectOrCompatibleValue(type: string, value: JavaCompatibleValue | RawPointer, name?: string): JavaCompatibleValue | JavaObject;
//# sourceMappingURL=types.d.ts.map