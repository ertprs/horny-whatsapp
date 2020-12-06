import { resolve } from "path";
import { Client, ClientOptions } from "whatsapp-web.js";
import CommandsLoader from "./Commands";
import express from "express";
import EventLoader from "./Events";
import config from "../config.json";
import { toDataURL } from "qrcode";

export default class HornyClient extends Client {
    constructor(options: ClientOptions) {
        super(options);
    }
    public qr = "";
    public eventLoader = new EventLoader(this);
    public commandLoader = new CommandsLoader(this);
    readonly config = config;
    public server = express();

    build(): void {
            this.eventLoader.load(
                resolve(__dirname, "..", "listeners")
            );
            this.commandLoader.load(
                resolve(__dirname, "..", "commands")
            );
        this.initialize();
        this.server.get("/", (_, res) => {
            if (!this.qr.length) return res.send("<strong>Refresh web sekali lagi!</strong>");
            else {
                toDataURL(this.qr, (error, url) => {
                    if (error) {
                        console.error(error.message);
                        return res.send("<pre>Rusak</pre>");
                    } else {
                        return res.send(`<strong>Scan QR nya</strong><br /><img src="${url}" />`);
                    }
                });
            }
        });

        const listener = this.server.listen(process.env.PORT ? process.env.PORT : 3000, () => {
            console.log(`Server menyala di PORT ${(listener.address() as any).port}`);
        });
    }
}