import { uglify } from 'rollup-plugin-uglify'
import babel from '@rollup/plugin-babel';
import typescript from "typescript"
import rollupTypescript from "rollup-plugin-typescript2"
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts'

import rollupPluginUmdDts from './extends/rollup-plugin-umd-dts.mjs'
const toolName = 'jcy'

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
 * 个人工具库 (TS版)
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 * @update ${simpleFromatTime(new Date())}
 */`
}



function getDtsName (type) {
  return `dist/${type}/index.d.ts`
}


export default [
  {
    input: './src/main.ts',
    // external: [
    //   'chalk'
    // ],
    output: [
      {
        file:  `dist/umd/index.min.js`,
        banner: getBanner(),
        format: 'umd',    
        strict: true,
        name: 'bestime',
        indent: false,
        sourcemap: false,
        
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
      // commonjs(),
      rollupTypescript({
        include: "src/**/*.ts",
        exclude: "node_modules/**",
        typescript: typescript,
        useTsconfigDeclarationDir: true,
        allowNonTsExtensions: false,
      }),
  
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
              return /@see/i.test(comment.value);
          }
        }
      }),    
    ]
  },
  {
    input: './src/main.ts',
    output: [
      { file: getDtsName('esm'), format: "es" },
      { file: getDtsName('umd'), format: "umd" }
    ],
    plugins: [
      dts(),
      rollupPluginUmdDts({
        name: toolName,
        file: getDtsName('umd')
      })
    ],
  },
  
  
];