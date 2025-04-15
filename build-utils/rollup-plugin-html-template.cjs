import { loadEnv } from 'vite';
import path from 'path';

/**
 * html使用模板变量。使用方法 "{% YOUR_NAME %}"
 * @param config - 采用键值对形式配置html中可使用的参数。注：env环境变量中的参数也可使用，如果参数同名，优先使用传入配置
 */
export default function rollupPluginHtmlTemplate(config) {
  config = config || {}
  let env;
  return {
    name: 'rollup-plugin-html-template',
    enforce: 'pre',
    configResolved: function (viteConfig) {
      env = loadEnv(viteConfig.mode, path.resolve(__dirname, '../' + viteConfig.envDir));
    },
    transformIndexHtml: {
      async transform(html, ctx) {
        const url = ctx.filename;
        if (!/.html.*$/.test(url)) return html;
        html = html.replace(/({%\s*)(.*?)(\s*%})/g, function (_, prefix, name, suffix) {
          return config[name] || env[name];
        });

        return html;
      }
    }
  };
}
