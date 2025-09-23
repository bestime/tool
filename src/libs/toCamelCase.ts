import _String from "./_String";

/**
 * 变量名转小驼峰
 * @param data 
 * @returns 
 */
export default function toCamelCase (data: string) {
  return _String(data).replace(/(-\w)/g, function (_, b) {
    return b.toUpperCase()
  }).replace(/-/g, '')
}