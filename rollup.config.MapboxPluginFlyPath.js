import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'
import babel from '@rollup/plugin-babel';

const TOOL_NAME = `MapboxPluginFlyPath@1.0.0.min.js`;
import formatTime from './src/split/formatTime'

export default {
  input: './src/split/MapboxPluginFlyPath.js',
  output: {
    file: 'dist/' + TOOL_NAME,
    format: 'iife',    
    strict: false,
    name: 'MapboxPluginFlyPath',
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
      `mapbox路径运动 ${TOOL_NAME}`,
      '',
      '@QQ 1174295440',
      '@author Jiang Yang (Bestime)',
      '@see https://github.com/bestime/mapbox-plugin',
      `@update ${formatTime(null, new Date())}`,
    ].join('\n'))
  ]
};