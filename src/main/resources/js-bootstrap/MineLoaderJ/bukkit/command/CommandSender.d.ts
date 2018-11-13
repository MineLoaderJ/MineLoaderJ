import { JavaObject } from "../../../Java";
import Pointer from "../../../Pointer";
export declare class CommandSender extends JavaObject {
    private static _sendMessage;
    constructor({ name, pointer }: {
        name: string;
        pointer: Pointer;
    });
    sendMessage(...args: string[]): void;
}
export default CommandSender;
//# sourceMappingURL=CommandSender.d.ts.map