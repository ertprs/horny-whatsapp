import type { Event } from "../@typings";
import type HornyClient from "../classes/HornyClient";

export default class ReadyEvent implements Event {
    readonly name = "ready";
    constructor(private client: HornyClient) {}

    public execute(): void {
        this.client.setDisplayName(this.client.config.botName);
        console.log(`${this.client.config.botName} is ready!`);
        this.client.setStatus("Hello there!");
    }
}