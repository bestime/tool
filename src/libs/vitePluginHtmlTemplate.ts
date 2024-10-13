import { loadEnv } from 'vite';
import type { PluginOption, Plugin } from 'vite';

/**
 * vite中的html文件使用模板变量。使用方法 "{% YOUR_NAME %}"
 * @param config - 采用键值对形式配置html中可使用的参数。注：在模板中，此配置会覆盖env环境变量中同名的参数
 */
export default function vitePluginHtmlTemplate(config: Record<string, any>)  {
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
          const val = config[name] ?? env[name];
          return val
        });

        return html;
      }
    }
  };
  return result
}