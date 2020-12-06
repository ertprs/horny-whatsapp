import type { Message } from "whatsapp-web.js";

export interface Command {
    name: string;
    description?: string;
    aliases?: string[];
    groupOnly?: boolean;
    execute(message: Message, args?: string[]): any;
}