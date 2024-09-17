import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";
import { files } from "./files.mjs";

(async () => {
    for (let i = 0; i < files.length; i++) {
        const entry = files[i];
        const folder = "download/" + path.dirname(entry.name) + "/";
        const file = path.basename(entry.name);
        fs.mkdirSync(folder, {
            recursive: true,
        });
        const writeStream = fs.createWriteStream(folder + file);
        console.info("download", entry.name);
        const req = await fetch(entry.link);
        await finished(Readable.fromWeb(req.body).pipe(writeStream));
    }
})().catch((err) => {
    console.error(err);
});
