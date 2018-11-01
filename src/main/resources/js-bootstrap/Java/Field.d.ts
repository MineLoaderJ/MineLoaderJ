/// <reference path="../../src/bridge.d.ts" />
import JavaClass from './JavaClass';
import Pointer from '../Pointer';
import JavaObject from "./JavaObject";
declare class FieldNotFoundError extends Error {
}
declare class FieldAccessError extends Error {
}
export declare class Field extends JavaObject {
    static FieldNotFoundError: typeof FieldNotFoundError;
    static FieldAccessError: typeof FieldAccessError;
    name: string;
    parent: JavaClass;
    pointer: Pointer;
    signature: string;
    type: string;
    isStatic: boolean;
    private constructor();
    /**
     * @description Initialize this instance using its parent and name.
     */
    init(): this;
    /**
     * @description Create an uninitialized `Field` instance.
     * @param parent Parent class.
     * @param signature Field signature.
     * e.g. "someField:java.lang.String"
     */
    static createField(parent: JavaClass, signature: string): Field;
    /**
     * @description Set the value of the field.
     * @param instance Instance object.
     * @param value Desired field value.
     */
    set(instance: JavaObject | null, value: JavaCompatibleValue | JavaObject): void;
    /**
     * @description Get the value of a field, return an uninitialized instance of `JavaObject` or compatible value.
     * @param instance Instance object.
     */
    get(instance: JavaObject | null): JavaCompatibleValue | JavaObject;
}
export default Field;
//# sourceMappingURL=Field.d.ts.map