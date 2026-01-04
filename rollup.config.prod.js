import terser from '@rollup/plugin-terser'
import babel from '@rollup/plugin-babel';
import typescript from "typescript"
import rollupTypescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'

import rollupPluginUmdDts from './extends/rollup-plugin-umd-dts.mjs'
const toolName = 'jUtilsScroll'

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
 * 滚动相关工具 => ${toolName}
 * @update ${simpleFromatTime(new Date())}
 */`
}




export default [
  {
    input: './src/index.ts',
    external: [
      '@bestime/utils_base',
      '@bestime/utils_browser',
      '@better-scroll/core',
      '@better-scroll/mouse-wheel',
      '@better-scroll/scroll-bar',
    ],
    output: [
      {
        file:  `dist/umd/index.min.cjs`,
        banner: getBanner(),
        format: 'umd',    
        strict: true,
        name: toolName,
        indent: false,
        sourcemap: false,
        globals: {
          '@bestime/utils_base': 'jUtilsBase',
          '@bestime/utils_browser': 'jUtilsBrowser',
          '@better-scroll/core': 'BScroll',
          '@better-scroll/mouse-wheel': 'MouseWheel',
          '@better-scroll/scroll-bar': 'ScrollBar',
        }
      },
      {
        file: `dist/esm/index.min.mjs`,
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
  
      terser({
        ie8: true,
        compress: true,
        output: {
          beautify: false,
          comments: function(node, comment) {
              return /滚动相关工具/i.test(comment.value);
          }
        }
      }),    
    ]
  },
  {
    input: './src/index.ts',
    output: [
      { file: `dist/esm/index.d.ts`, format: "es" },
      { file: `dist/umd/index.d.ts`, format: "iife" }
    ],
    plugins: [
      dts(),
      rollupPluginUmdDts({
        name: toolName,
        file: `dist/umd/index.d.ts`
      })
    ],
  },
  
  
];