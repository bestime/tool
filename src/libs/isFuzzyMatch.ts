import _String from "./_String";
import split from "./split";
import trim from "./trim";


/**
 * 模糊搜索，例如 a4 可匹配 a3645
 * @param search - 输入的值，如果为空，则表示无筛选条件，直接返回true
 * @param data - 源数据的值
 * @param regFlags - 与 RegExp 第二个参数相同，指定是否全局、区分大小写等
 * @return 
 */
export default function isFuzzyMatch (search: string, data: string, regFlags?: string) {
  search = trim(search, '*')
  let res = true;
  if(search) {
    let regStr = split(search, '').join('.*')
    let reg = new RegExp(regStr, _String(regFlags))
    res = reg.test(data)
  }
  return res;
}