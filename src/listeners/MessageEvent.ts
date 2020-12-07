import type { Message } from "whatsapp-web.js";
import type { Event } from "../@typings";
import CommandHandler from "../classes/CommandHandler";
import HornyClient from "../classes/HornyClient";

export default class MessageEvent implements Event {
    readonly name = "message";
    constructor(private client: HornyClient) {}

    public async execute(message: Message) {
        if (message.fromMe || !(await message.getContact()).isMyContact) return;
        if ((await message.getChat()).isReadOnly && (await message.getChat()).isGroup) {
           return;
        }
        else {
           const msg = message.body.toLowerCase();
           const botName = this.client.config.botName.replace(/(bot)?( +)/gi, "");
           if (msg === "halo " + botName) {
                await message.reply(`Halo, nama saya *${this.client.config.botName}* kamu bisa menggunakanku dengan awalan *horny*, contoh: *horny help*`);
           }

               if (msg.startsWith(this.client.config.PREFIX.toLowerCase())) {
                   new CommandHandler(this.client).handle(message);
               }
           }
        }
}