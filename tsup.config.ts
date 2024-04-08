import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/bin.ts"],
  sourcemap: true,
  minify: true,
  target: "es5",
  outDir: "lib",
  onSuccess: "cp -r _templates/ lib/_templates",
});
