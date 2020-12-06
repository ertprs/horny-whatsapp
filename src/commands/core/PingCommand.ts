import { Message } from "whatsapp-web.js";
import type { Command } from "../../@typings";
import type HornyClient from "../../classes/HornyClient";

export default class PingCommand implements Command {
    constructor(private client: HornyClient) {}

    // Command structures.
    readonly name = "ping";
    readonly description = "Ping pong dor!";
    readonly aliases = ["pingopong", "pongo"];
    readonly groupOnly = true;

    public async execute(message: Message) {
       (await message.getChat()).sendMessage("Pong!");
    }
}