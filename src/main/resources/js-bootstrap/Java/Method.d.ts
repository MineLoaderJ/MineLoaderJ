/// <reference path="../../src/bridge.d.ts" />
import JavaClass from './JavaClass';
import Pointer from '../Pointer';
import JavaObject from "./JavaObject";
declare class MethodNotFoundError extends Error {
}
declare class InvocationError extends Error {
}
export declare class Method extends JavaObject {
    static MethodNotFoundError: typeof MethodNotFoundError;
    static InvocationError: typeof InvocationError;
    name: string;
    parent: JavaClass;
    pointer: Pointer;
    returnedType: string;
    argumentTypes: string[];
    signature: string;
    isStatic: boolean;
    private constructor();
    /**
     * @description Initialize this instance using its parent and signature.
     */
    init(): this;
    /**
     * @description Create an uninitialized `Method` instance.
     * @param parent Parent class.
     * @param signature Method signature.
     * e.g. "someMethod:java.lang.String:[I,[Ljava.lang.Object"
     */
    static createMethod(parent: JavaClass, signature: string): Method;
    /**
     * @description Invoke a method.
     * @param caller Caller object.
     * @param args Arguments of invocation.
     */
    invoke(caller: JavaObject | null, args: (JavaCompatibleValue | JavaObject)[]): any;
}
export default Method;
//# sourceMappingURL=Method.d.ts.map