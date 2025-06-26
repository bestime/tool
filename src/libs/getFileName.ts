import trim from "./trim";

/**
 * 获取一个路径的文件名（最后一级的名称）
 * @param path 原始路径
 * @returns 文件名
 */
export default function getFileName (path?: string) {
  let res = trim(path).replace(/\\+/g, '/')
  res = res.replace(/^.*\/(.*?\.*)$/, '$1')

  return res
}