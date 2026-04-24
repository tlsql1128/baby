import fs from "fs";
import path from "path";

const files = process.argv.slice(2);
const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");

for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  const m = t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = m ? m[1] : t;
  const s = stripTags(body).replace(/\s/g, "");
  console.log(path.basename(f), s.length);
}
