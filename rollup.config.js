const isDebug = false; // 调试模式不改变版本号

import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'
import babel from '@rollup/plugin-babel';
const pkg = require('./package.json')

var nextVersion = isDebug ? 'beta' : pkg.version;
const TOOL_NAME = `bestime@${nextVersion}.min.js`;
import formatTime from './src/split/formatTime'

export default {
  input: './src/library.js',
  output: {
    file: 'dist/' + TOOL_NAME,
    format: 'iife',    
    strict: false,
    name: 'ns',
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
      `javascript 常用工具库 ${TOOL_NAME}`,
      '',
      '@QQ 1174295440',
      '@author Jiang Yang (Bestime)',
      '@see https://github.com/bestime/tool',
      `@update ${formatTime(null, new Date())}`,
    ].join('\n'))
  ]
};