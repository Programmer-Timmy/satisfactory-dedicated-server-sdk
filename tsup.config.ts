import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'], // Build both ESM and CJS
    dts: true, // Generate .d.ts files
    splitting: false,
    clean: true,
});
