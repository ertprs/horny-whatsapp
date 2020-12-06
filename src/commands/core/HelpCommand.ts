import type { Message } from "whatsapp-web.js";
import type { Event } from "../../@typings/Event";
import type HornyClient from "../../classes/HornyClient";

export default class HelpCommand implements Event {
    readonly name = "help";
    readonly description = "Menyediakan informasi command yang dipunya oleh bot.";
    readonly aliases = ["h", "halp"];
    readonly groupOnly = true;
    
    constructor(private client: HornyClient) {}
    
    public async execute(message: Message, args?: string[]) {
        if (!args![0]) {
            const awalan = `Halo, nama saya *${this.client.config.botName}*. Saya adalah bot yang digunakan untuk berbagai keperluan, seperti bermain, edukasi, dan lain lain.\nKamu bisa melihat kategori dan perintah yang bisa kamu gunakan disini:\n\n`;
            let cate_and_commands = "";
            const arrayCommands = [...this.client.commandLoader.helps.values()];

            for (var i = 0; i < arrayCommands.length; i++) {
                cate_and_commands += `*${arrayCommands[i].name}* - \`\`\`${arrayCommands.join(", ")}\`\`\`\n`;
            }

            const completeMessage = awalan + cate_and_commands + `\nKamu bisa tahu apa isi perintah dan cara menggunakannya dengan cara: *horny [command_name]* tanpa pakai *[]* dan *command_name* diganti dengan nama command yang ada.`;
            (await message.getChat()).sendMessage(completeMessage);
        } else {
            const command = this.client.commandLoader.commands.get(args![0]) || this.client.commandLoader.commands.get(
                this.client.commandLoader.aliases.get(args![0])!
            );

            if (!command) {
                const predictionCommands = [...this.client.commandLoader.commands.values()].filter(cmd => cmd.name.includes(args![0]));
                const predictionMessage = `Mungkin command yang kamu maksud ada disini?: *${predictionCommands.join(", ")}*`;
                (await message.getChat()).sendMessage(predictionMessage);
            } else {
                const infoMessage = `- Nama Command: ${command.name}\n- Group Only: ${command.groupOnly ? "Hanya Group" : "Bisa Semua"}\n- Aliases: *${command.aliases!.join(", ")}*\n- Deskripsi: \`\`\`${command.description ? command.description : "Tidak ada deskripsi!"}\`\`\``;
                (await message.getChat()).sendMessage(infoMessage);
            }
        }
    }
}