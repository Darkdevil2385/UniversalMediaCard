import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/card/universal-media-card.ts",
  output: {
    file: "dist/universal-media-card.js",
    format: "es",
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
  external: ["lit", "home-assistant-js-websocket"],
};
