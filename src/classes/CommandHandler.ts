import type { Message } from "whatsapp-web.js";
import type HornyClient from "./HornyClient";

export default class CommandHandler {
    constructor(private client: HornyClient) {}

    public async handle(message: Message) {
        const args = message.body.slice(this.client.config.PREFIX.length).trim().split(/ +/g);
        const cmd = args.shift()!.toLowerCase();

        const command = this.client.commandLoader.commands.get(cmd) || this.client.commandLoader.commands.get(
            this.client.commandLoader.aliases.get(cmd)!
        );
        
        if (!command) return;
        if (command.groupOnly && (await message.getChat()).isGroup) return;
        else {
            command.execute(message, args);
        }
    }
}