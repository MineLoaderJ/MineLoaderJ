/// <reference types="node" />
import JavaObject from '../Java/JavaObject';
import JavaClass from '../Java/JavaClass';
import Method from '../Java/Method';
import _ChatColor from './bukkit/ChatColor';
import _Logger from './Logger';
import { EventEmitter } from 'events';
import { CommandSender } from './bukkit/command/CommandSender';
import * as bukkit from './bukkit';
import * as helpers from './helpers';
declare global {
    const onDisable: Function;
    const __INSPECT: Function;
    const onCommand: Function;
}
export interface CommandDescription {
    description: string;
    usage: string;
    aliases: string[];
    onCommand: (sender: CommandSender, commandName: string, args: string[]) => boolean;
    plugin?: Plugin;
}
export interface CommandDescriptions {
    [commandName: string]: CommandDescription;
}
export interface Plugin {
    init(instance: MineLoaderJ, logger: _Logger): void;
    name: string;
    logger: _Logger;
    commands: CommandDescriptions;
}
export declare class MineLoaderJ extends EventEmitter {
    static ChatColor: typeof _ChatColor;
    static bukkit: typeof bukkit;
    static helpers: typeof helpers;
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
    static pluginDirectoryName: string;
    static pluginPath: string;
    logger: _Logger;
    static ENABLE: string;
    static DISABLE: string;
    plugins: Plugin[];
    commands: CommandDescriptions;
    /**
     * @description Don't instantiate this class manually!
     */
    constructor();
    private static getOnUncaughtErrorHandler;
    private registerGlobalFunctions;
    private loadPlugins;
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