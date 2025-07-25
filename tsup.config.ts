import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],     // build both module formats
    dts: true,                 // generate types
    sourcemap: true,           // optional but recommended
    clean: true,
    external: ["node-fetch"],  // mark node-fetch as external dependency
});
