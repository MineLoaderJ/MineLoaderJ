/// <reference types="node" />
import JavaObject from '../Java/JavaObject';
import JavaClass from '../Java/JavaClass';
import Method from '../Java/Method';
import _ChatColor from './bukkit/ChatColor';
import _Logger from './Logger';
import { EventEmitter } from 'events';
declare global {
    const onDisable: Function;
    const __INSPECT: Function;
}
export declare class MineLoaderJ extends EventEmitter {
    static ChatColor: typeof _ChatColor;
    static Logger: typeof _Logger;
    static instance: MineLoaderJ;
    pluginInstance: JavaObject;
    server: JavaObject;
    Server: JavaClass;
    consoleSender: JavaObject;
    ConsoleSender: JavaClass;
    sendMessage: Method;
    static jarPath: string;
    static path: string;
    logger: _Logger;
    static ENABLE: string;
    static DISABLE: string;
    /**
     * @description Don't instantiate this class manually!
     */
    constructor();
    /**
     * @description Send messages directly to the console.
     * @param messages Messages to send.
     */
    sendMessageToConsole(...messages: any[]): void;
    /**
     * @description Broadcast message to whole server.
     * @param messages Message to broadcast.
     */
    broadcastMessage(...messages: any[]): void;
}
export default MineLoaderJ;
//# sourceMappingURL=index.d.ts.map