/// <reference path="../../src/bridge.d.ts" />
import Pointer from '../Pointer';
import JavaClass from './JavaClass';
export declare class JavaObject {
    pointer: Pointer;
    name: string;
    class: JavaClass;
    static classLoader: (className: string) => JavaClass;
    /**
     * @description `JavaObject` constructor, returns an uninitialized `JavaObject`.
     * @param param0 Name and pointer of the object.
     */
    constructor({ name, pointer }: {
        name: string;
        pointer: Pointer;
    });
    init(): JavaObject;
    getClass(): JavaClass;
    destroy(noException?: boolean): void;
    toStringValue(): string;
}
export default JavaObject;
//# sourceMappingURL=JavaObject.d.ts.map