import * as vite from 'vite';
import { Plugin } from 'vite';

/**
 * vite中的html文件使用模板变量。使用方法 "{% YOUR_NAME %}"
 * @param config - 采用键值对形式配置html中可使用的参数。注：在模板中，此配置会覆盖env环境变量中同名的参数
 */
declare function vitePluginHtmlTemplate(config: Record<string, any>): Plugin<any>;

/**
 * 对node_modules的包进行分包
 * @param data
 * @returns
 */
declare function getManualChunks(data: Array<Array<string>>): Record<string, string[]>;

/**
 * dev 代理配置
 * @param list
 * @returns
 */
declare function getDevProxy(
  list: {
    name: string;
    target: string;
    changeOrigin?: boolean;
    ssl?: any;
    timeout?: number;
    ws?: boolean;
  }[]
): Record<string, string | vite.ProxyOptions>;

export { getDevProxy, getManualChunks, vitePluginHtmlTemplate };

export default undefined;
