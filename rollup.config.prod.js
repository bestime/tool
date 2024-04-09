import { uglify } from 'rollup-plugin-uglify'
import babel from '@rollup/plugin-babel';
import typescript from "typescript"
import rollupTypescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

import rollupPluginUmdDts from './extends/rollup-plugin-umd-dts.mjs'
const toolName = 'jUtilsBrowser'

function zeroTo2 (data) {
  if(data < 10) {
    return '0' + data
  } else {
    return String(data)
  }
}

function simpleFromatTime (date) {
  var year = zeroTo2(date.getFullYear());
  var month = zeroTo2(date.getMonth() + 1);
  var day = zeroTo2(date.getDate());
  var hour = zeroTo2(date.getHours());
  var minute = zeroTo2(date.getMinutes());
  var second = zeroTo2(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}


function getBanner () {
  return `/**  
 * 浏览器工具库 => jUtilsBrowser
 * @update ${simpleFromatTime(new Date())}
 */`
}



function getDtsName (type) {
  return `dist/${type}/index.d.ts`
}


export default [
  {
    input: './src/main.ts',
    external: ['@bestime/utils_base'],
    output: [
      {
        file:  `dist/jUtilsBrowser.umd.min.cjs`,
        banner: getBanner(),
        format: 'umd',    
        strict: true,
        name: toolName,
        indent: false,
        sourcemap: false,
        globals: {
          '@bestime/utils_base': 'jUtilsBase'
        }
      },
      {
        file: `dist/jUtilsBrowser.esm.min.mjs`,
        banner: getBanner(),
        format: 'esm',
        strict: true,
        indent: false,
        sourcemap: false,      
      }
    ],
    
    plugins: [
      nodeResolve(),
      
      rollupTypescript({
        include: "src/**/*.ts",
        exclude: "node_modules/**",
        typescript: typescript,
        useTsconfigDeclarationDir: true,
        allowNonTsExtensions: false,
      }),

      json(),
      commonjs(),
  
      babel({
        babelHelpers: 'bundled',
        exclude: "node_modules/**",
        extensions: [
          '.ts',
          '.js'
        ]
      }),
  
      uglify({
        ie8: true,
        warnings: false,
        compress: true,
        output: {
          beautify: false,
          comments: function(node, comment) {
              return /浏览器工具库/i.test(comment.value);
          }
        }
      }),    
    ]
  },
  {
    input: './src/main.ts',
    output: [
      { file: 'dist/jUtilsBrowser.esm.d.ts', format: "es" },
      { file: 'dist/jUtilsBrowser.global.d.ts', format: "iife" }
    ],
    plugins: [
      dts(),
      rollupPluginUmdDts({
        name: toolName,
        file: 'dist/jUtilsBrowser.global.d.ts'
      })
    ],
  },
  
  
];