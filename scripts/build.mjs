import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const rootDirectory = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = join(rootDirectory, "dist");

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const entry of ["index.html", "style.css", "script.js", "assets"]) {
  cpSync(join(rootDirectory, entry), join(outputDirectory, entry), {
    recursive: true,
  });
}
