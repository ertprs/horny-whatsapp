import { existsSync } from "fs";
import { resolve } from "path";
import type { ClientSession } from "whatsapp-web.js";
import HornyClient from "./classes/HornyClient";

let sessionConfig: ClientSession | undefined;

if (existsSync(resolve(__dirname, "session.json"))) {
    sessionConfig = require(resolve(__dirname, "session.json"));
}

new HornyClient({
    puppeteer: {
        headless: true
    },
    session: sessionConfig!
}).build();