import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel';
import typescript from "typescript"
import rollupTypescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/main.ts',
  watch: {
    include: ['src/**']
  },
  
  output: {
    file:  '.dev/index.js',
    format: 'iife',    
    strict: true,
    name: 'bestime',
    indent: false,
    sourcemap: true,
    
  },

  plugins: [
    // nodeResolve(),
    // commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: "node_modules/**",
    }),
    rollupTypescript({
      include: "src/**/*.ts",
      exclude: "node_modules/**",
      typescript: typescript,
      useTsconfigDeclarationDir: true
    }),
    livereload({
      port: 1500
    }),
  ]
};