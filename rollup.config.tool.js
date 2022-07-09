const isDebug = false; // 调试模式不改变版本号
import { uglify } from 'rollup-plugin-uglify'
import babel from '@rollup/plugin-babel';
const pkg = require('./package.json')
import typescript from "typescript"
import rollupTypescript from "rollup-plugin-typescript2"



var nextVersion = isDebug ? 'beta' : pkg.version;


function getName (type) {
  return `bestime.${type}.min.js`;
}

function getBanner (type) {
  return `/**  
 * ${getName(type)}
 * @version ${nextVersion}
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 * @update ${new Date()}
 */`
}

function getDistPath () {
  return 'dist/'
}

export default {
  input: './src/main.ts',
  
  output: [
    {
      file:  getDistPath()+getName('iife'),
      banner: getBanner('iife'),
      format: 'iife',    
      strict: true,
      name: 'jy',
      indent: false,
      interop: false,
      
      
    },
    {
      file: getDistPath() + getName('esm'),
      banner: getBanner('esm'),
      format: 'esm',
      strict: true,
      indent: false,
      interop: false,
      
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: "node_modules/**",
    }),
    uglify({
      ie8: true,
      warnings: false,
      compress: true,
      output: {
        beautify: false,
        comments: false,
        // preamble: banner,
        comments: function(node, comment) {
            return /@see/i.test(comment.value);
        }
      }
    }),
    rollupTypescript({
      include: "src/**/*.ts",
      exclude: "node_modules/**",
      typescript: typescript,
      useTsconfigDeclarationDir: true
    })
  ]
};