import * as vite from 'vite';

/**
 * vite中的html文件使用模板变量。使用方法 "{% YOUR_NAME %}"
 * @param config - 采用键值对形式配置html中可使用的参数。注：env环境变量中的参数也可使用，如果参数同名，优先使用传入配置
 */
declare function vitePluginHtmlTemplate(config: Record<string, any>): any;

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
    ssl?: any;
    timeout?: number;
  }[]
): Record<string, string | vite.ProxyOptions>;

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsBuildTool {
    export { getDevProxy, getManualChunks, vitePluginHtmlTemplate };
  }
}

export default undefined;
