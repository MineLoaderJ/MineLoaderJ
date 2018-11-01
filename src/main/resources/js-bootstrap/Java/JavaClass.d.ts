/// <reference path="../../src/bridge.d.ts" />
import JavaObject from './JavaObject';
import Method from './Method';
import Field from './Field';
import Pointer from '../Pointer';
declare class ClassReleaseError extends Error {
}
declare class ClassAllocateError extends Error {
}
declare class ClassNotFoundError extends Error {
}
declare class ClassManager {
    static ClassReleaseError: typeof ClassReleaseError;
    static ClassAllocateError: typeof ClassAllocateError;
    private classes;
    private static _instance;
    static readonly instance: ClassManager;
    constructor();
    /**
     * @description Register a new class.
     * @param clazz Instance of `JavaClass`.
     * @param name Unique name of this class.
     */
    alloc(clazz: JavaClass, name: string): void;
    /**
     * @description Release a class.
     * @param clazz Class to be released.
     */
    delete(clazz: JavaClass | string, noException?: boolean): void;
    /**
     * @description Get registered class object by name.
     * @param name Name of the class.
     */
    getClass(name: string): JavaClass;
}
/**
 * Wrapper of Java class.
 */
export declare class JavaClass extends JavaObject {
    static ClassNotFoundError: typeof ClassNotFoundError;
    ClassManager: typeof ClassManager;
    pointer: Pointer;
    name: string;
    class: JavaClass;
    javaName: {
        [typeName in TypeNameType]: string;
    };
    methods?: {
        [methodName: string]: Method | Method[];
    };
    fields?: {
        [fieldName: string]: Field;
    };
    constructor({ name, pointer }: {
        name: string;
        pointer: Pointer;
    });
    /**
     * @description Get or create the class object by name. May not be initialized.
     * @param name Class name.
     */
    static forName(name: string): JavaClass;
    init(): JavaClass;
    destroy(noException?: boolean): void;
    /**
     * @description Get name of this class in Java.
     * `this.name` cannot be trusted.
     * @param type Type of desired type string format in returned value.
     */
    getName(type?: TypeNameType): string;
    /**
     * @description Get all methods.
     */
    getMethods(): {
        [methodName: string]: Method | Method[];
    };
    /**
     * @description Get method object by name.
     * @param methodName Method name.
     */
    getMethod(methodName: string): Method | Method[] | undefined;
    /**
     * @description Get all fields.
     */
    getFields(): {
        [fieldName: string]: Field;
    };
    /**
     * @description Get field object by name.
     * @param fieldName Name of the field.
     */
    getField(fieldName: string): Field | undefined;
}
export default JavaClass;
//# sourceMappingURL=JavaClass.d.ts.map