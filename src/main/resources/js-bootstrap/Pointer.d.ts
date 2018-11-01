declare class PointerReleaseError extends Error {
}
declare class PointerAllocateError extends Error {
}
declare class PointerManager {
    static PointerReleaseError: typeof PointerReleaseError;
    static PointerAllocateError: typeof PointerAllocateError;
    private pointers;
    private static _instance;
    static readonly instance: PointerManager;
    constructor();
    /**
     * @description Register a new pointer.
     * @param pointer Pointer.
     * @param name Name of this pointer.
     */
    alloc(pointer: Pointer, name: string): void;
    /**
     * @description Release a pointer.
     * @param pointer Pointer to be released.
     */
    delete(pointer: Pointer): void;
    /**
     * @description Get the pointer by name (dangerous).
     * Note that names of `Pointers` is not unique.
     * @param name Name of the pointer.
     */
    getPointer(name: string): Pointer;
    /**
     * @description Get the name of the pointer.
     * Note that the name may not be specified.
     * @param pointer Pointer.
     */
    getName(pointer: Pointer): string;
    /**
     * @description Release all registered pointers.
     * Be aware of that this will invalidate all registered pointers.
     */
    releaseAll(): void;
}
export declare class Pointer {
    static PointerManager: typeof PointerManager;
    static readonly NULL: Readonly<Pointer>;
    pointer: number;
    name?: string;
    constructor(pointer: number, name?: string);
    isValid(): boolean;
    release(): void;
    valueOf(): RawPointer;
}
export default Pointer;
//# sourceMappingURL=Pointer.d.ts.map