export declare class ChatColor {
    static COLOR_CHAR: string;
    static BLACK: ChatColor;
    static DARK_BLUE: ChatColor;
    static DARK_GREEN: ChatColor;
    static DARK_AQUA: ChatColor;
    static DARK_RED: ChatColor;
    static DARK_PURPLE: ChatColor;
    static GOLD: ChatColor;
    static GRAY: ChatColor;
    static DARK_GRAY: ChatColor;
    static BLUE: ChatColor;
    static GREEN: ChatColor;
    static AQUA: ChatColor;
    static RED: ChatColor;
    static LIGHT_PURPLE: ChatColor;
    static YELLOW: ChatColor;
    static WHITE: ChatColor;
    static MAGIC: ChatColor;
    static BOLD: ChatColor;
    static STRIKETHROUGH: ChatColor;
    static UNDERLINE: ChatColor;
    static ITALIC: ChatColor;
    static RESET: ChatColor;
    code: string;
    intCode: number;
    isFormat: boolean;
    string: string;
    constructor({ code, intCode, isFormat }: {
        code: string;
        intCode: number;
        isFormat: boolean;
    });
    toString(): string;
    valueOf(): string;
}
export default ChatColor;
//# sourceMappingURL=ChatColor.d.ts.map