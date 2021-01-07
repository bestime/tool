import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'
import babel from '@rollup/plugin-babel';

const isDebug = true; // 调试模式不改变版本号
var nextVersion = isDebug ? 'beta' : '3.0.1';
const TOOL_NAME = `bestime@${nextVersion}.min.js`;

export default {
  input: './src/library.js',
  output: {
    file: 'dist/' + TOOL_NAME,
    format: 'iife',    
    strict: false,
    indent: false,
    interop: false
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    uglify({
      ie8: true,
      warnings: false,
      compress: true,
      output: {
        beautify: false,
        comments: false
      }
    }),
    banner([
      `javascript 常用工具库（rollup版）`,
      '',
      '@QQ 1174295440',
      '@author Jiang Yang (Bestime)',
      `@update ${new Date()}`,
    ].join('\n'))
  ]
};