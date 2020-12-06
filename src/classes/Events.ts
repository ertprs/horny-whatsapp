import { readdirSync } from "fs";
import type { Event } from "../@typings/Event";
import type HornyClient from "./HornyClient";

export default class EventLoader {
    constructor(private client: HornyClient) {}

    public load(path: string) {
        for (const event of readdirSync(path).filter(fl => fl.endsWith(".js"))) {
            const file: Event = new (require(`${path}/${event}`).default)(this.client);
            console.log(`[${file.name}] memuat event.`);
            this.client.on(file.name, (...args) => file.execute(...args));
        }
    }
}