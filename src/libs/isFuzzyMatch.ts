import _String from "./_String";
import isNull from "./isNull";
import split from "./split";
import trim from "./trim";

function getReg (data: string) {
  return split(data, '').map(function (c) {
    return c.replace(/\(/g, '\\(')
    .replace(/\)/, '\\)')
    .replace(/\+/, '\\+')
    .replace(/\[/, '\\[')
    .replace(/\]/, '\\]')
  }).join('.*?')
}


/**
 * 模糊搜索，例如 a4 可匹配 a3645
 * @param search - 输入的值，如果为空，则表示无筛选条件，直接返回true
 * @param data - 源数据的值
 * @param regFlags - 与 RegExp 第二个参数相同，指定是否全局、区分大小写等
 * @return 
 */
export default function isFuzzyMatch (search: string, data: string, regFlags?: string) {
  if(isNull(search) || isNull(data)) return false
  search = trim(search, '*')
  let res = true;
  if(search) {
    let regStr = getReg(search)
    let reg = new RegExp(regStr, _String(regFlags))
    res = reg.test(data)
  }
  return res;
}

export function fuzzyReplace (search: string, data: string, regFlags?: string) {
  if(isNull(search) || isNull(data)) return data
  search = trim(search, '*')
  if(search) {
    let regStr = getReg(search)
    let reg = new RegExp(regStr, _String(regFlags))
    data = data.replace(reg, function (_) {
      return `<em class="g_search_highlight">${_}</em>`
    })
  }
  return data;
}