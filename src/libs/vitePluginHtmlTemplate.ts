import { loadEnv } from 'vite';
import type { PluginOption } from 'vite';

/**
 * vite中的html文件使用模板变量。使用方法 "{% YOUR_NAME %}"
 * @param config - 采用键值对形式配置html中可使用的参数。注：env环境变量中的参数也可使用，如果参数同名，优先使用传入配置
 */
export default function vitePluginHtmlTemplate(config: Record<string, any>): any  {
  config = config || {}
  let env: any;
  const result: PluginOption = {
    name: 'rollup-plugin-html-template',
    enforce: 'pre',
    configResolved: function (viteConfig: any) {
      env = loadEnv(viteConfig.mode, viteConfig.envDir);
    },
    transformIndexHtml: {
      async handler(html: string, ctx: any) {
        const url = ctx.filename;
        if (!/.html.*$/.test(url)) return html;
        html = html.replace(/({%\s*)(.*?)(\s*%})/g, function (_, prefix, name, suffix) {
          return config[name] || env[name];
        });

        return html;
      }
    }
  };
  return result
}