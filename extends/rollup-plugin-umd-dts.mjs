import { format } from 'prettier';
import config from '../.prettierrc.cjs';

/**
 * 生成一个UMD方式的d.ts文件
 */
export default function rollupPluginUmdDts(props) {
  props = Object.assign(
    {
      name: '__Test'
    },
    props
  );
  return {
    name: 'rollup-plugin-umd-dts',
    renderChunk(code, chunk, options, meta) {
      if (options.file === props.file) {
        code = code.replace(
          /(export\s?\{.*?\};\s*)$/,
          `
          declare global {
            /**
             * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用） 
             */
            namespace ${props.name} {
              $1
            }
          }`
        );
      }

      // 该文件应为全局文件，防止编辑器自动import此文件
      code += `\r\n\r\n export default undefined;`;

      // 格式化
      code = format(code, {
        ...config,
        parser: 'typescript'
      });

      return {
        code: code,
        map: null
      };
    }
  };
}
