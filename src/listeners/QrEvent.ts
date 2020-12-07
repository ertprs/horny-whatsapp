import type { Event } from "../@typings";
import type HornyClient from "../classes/HornyClient";

export default class QrEvent implements Event {
    readonly name = "qr";
    constructor(private client: HornyClient) {}
    
    public execute(qr: string): void {
        if (this.client.qr.length > 0) return;
        this.client.qr = qr;
    }
}