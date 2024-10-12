import type { CommonServerOptions } from 'vite'

/**
 * dev 代理配置
 * @param list 
 * @returns 
 */
export default function getDevProxy (list: {
  name: string,
  target: string,
  ssl?: any
  timeout?: number
}[]) {
  const proxy: CommonServerOptions['proxy'] = {}

  list.forEach(function (item) {
    if(!item.target) return;
    proxy[item.name] = {
      target: item.target,
      changeOrigin: true,
      ws: true,
      ssl: item.ssl,
      timeout: item.timeout,
      rewrite: function (path) {
        const reg = new RegExp(`^${item.name}`)
        return path.replace(reg, '')
      },
    }
  })

  return proxy;
}