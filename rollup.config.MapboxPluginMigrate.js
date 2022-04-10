import { uglify } from 'rollup-plugin-uglify'
import banner from 'rollup-plugin-banner'
import babel from '@rollup/plugin-babel';

const TOOL_NAME = `MapboxPluginMigrate@1.0.0.min.js`;
import formatTime from './src/split/formatTime'

export default {
  input: './src/MapboxPluginMigrate.js',
  output: {
    file: 'dist/' + TOOL_NAME,
    format: 'iife',    
    strict: false,
    name: 'MapboxPluginMigrate',
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
      `mapbox插件，类似迁徙图 ${TOOL_NAME}`,
      '',
      '@QQ 1174295440',
      '@author Jiang Yang (Bestime)',
      '@see https://github.com/bestime/mapbox-plugin',
      `@update ${formatTime(null, new Date())}`,
    ].join('\n'))
  ]
};