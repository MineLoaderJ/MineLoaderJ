export declare class Logger {
    name: string;
    prefix: string;
    constructor(name?: string);
    /**
     * @description Write severe logging message.
     * @param messages Logging message.
     */
    severe(...messages: any[]): void;
    /**
     * @description Alias of `severe`.
     * @param messages Logging message.
     */
    err(...messages: any[]): void;
    /**
     * @description Alias of `severe`.
     * @param messages Logging message.
     */
    error(...messages: any[]): void;
    /**
     * @description Write warning logging message.
     * @param messages Logging message.
     */
    warning(...messages: any[]): void;
    /**
     * @description Alias of `warning`.
     * @param messages Logging message.
     */
    warn(...messages: any[]): void;
    /**
     * @description Write info logging message.
     * @param messages Logging message.
     */
    info(...messages: any[]): void;
    /**
     * @description Write config logging message.
     * @param messages Logging message.
     */
    config(...messages: any[]): void;
    /**
     * @description Write fine logging message.
     * @param messages Logging message.
     */
    fine(...messages: any[]): void;
    /**
     * @description Alias of `fine`.
     * @param messages Logging message.
     */
    verbose(...messages: any[]): void;
    /**
     * @description Write finer logging message.
     * @param messages Logging message.
     */
    finer(...messages: any[]): void;
    /**
     * @description Write finest logging message.
     * @param messages Logging message.
     */
    finest(...messages: any[]): void;
}
export default Logger;
//# sourceMappingURL=Logger.d.ts.map