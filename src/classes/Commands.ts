import { readdir } from "fs";
import type { Command, Category } from "../@typings";
import type HornyClient from "./HornyClient";

export default class CommandsLoader {
    constructor(private client: HornyClient) {}

    public commands: Map<string, Command> = new Map();
    public aliases: Map<string, string> = new Map();
    public helps: Map<string, Category> = new Map();

    public load(path: string) {
        readdir(path, (error, categories) => {
            if (error) {
                console.error(error);
            } else {
                console.log(`[${categories.length}] memuat categories.`);
                categories.forEach(category => {
                    console.log(`[${category}] memuat.`);
                    let module: Category = require(`${path}/${category}/module.json`);
                    module.cmds = [];
                    this.helps.set(category, module);
                    readdir(`${path}/${category}`, (err, files) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`[${files.length - 1}] memuat commands.`);
                            files.filter(fl => fl.endsWith(".js")).forEach(file => {
                                const prop: Command = new (require(`${path}/${category}/${file}`).default)(this.client);
                                console.info(`[${prop.name}] memuat command.`);
                                this.commands.set(prop.name, prop);
                                prop.aliases!.forEach(alias => {
                                    this.aliases.set(alias, prop.name);
                                });
                                this.helps.get(category)!.cmds.push(prop.name);
                            });
                        }
                    });
                });
            }
        });
    }
}