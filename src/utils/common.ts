/**
 * 移除路径最后的所有 ”/“
 */
export function urlRmoveLastSlash(path: string) {
  return path.replace(/\/+$/, '');
}

/**
 * 组装项目环境配置，以供整个项目使用
 */
export const envConfig = {
  baseURL: urlRmoveLastSlash(import.meta.env.BASE_URL),
  routeMode: import.meta.env.VITE_ROUTER_MODE,
  server01: {
    devProxy: import.meta.env['VITE_SERVER_01.devProxy'] === 'true',
    origin: import.meta.env['VITE_SERVER_01.origin'],
    apiPrefix: import.meta.env['VITE_SERVER_01.apiPrefix'],
  },
};

console.log('环境配置', envConfig);
