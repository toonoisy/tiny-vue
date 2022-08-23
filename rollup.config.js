import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    name: 'Instance',
    format: 'iife',
    plugins: [terser()],
    sourcemap: "true"
  }
};