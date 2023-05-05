import { format } from 'prettier'
import config from '../.prettierrc.cjs'

/**
 * 生成一个UMD方式的d.ts文件
 */
export default function rollupPluginUmdDts (props) {
  props = Object.assign({
    name: '__Test'
  }, props)
  return {
		name: 'rollup-plugin-umd-dts',
		renderChunk(code, chunk, options, meta) {
      if(options.file === props.file) {
        const regexExport = /(?<=^|[^/])export\s*{[^{}]*}(?=[^*]*(\*(?!\/)[^*]*)*$);?/g;
        // 匹配非注释中的 declare
        const regexDeclare = /(^|[^/])\bdeclare\b/g

        code = code.replace(regexExport, '')
        code = code.replace(regexDeclare, '$1export')
        code = `declare namespace ${props.name} {
          ${code}
        }`
      }

      // 格式化
      code = format(code, {
        ...config,
        parser: "typescript"
      })
      
			return {
				code: code,
				map: null
			};
		}
	};
}