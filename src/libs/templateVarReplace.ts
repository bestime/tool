
/**
 * 模板字符串插值，解析 {% abc %}的模板语法
 * @param tpl 
 * @param params 
 * @returns 
 */
export default function templateVarReplace (tpl: string, params: Record<string, string>) {
  tpl = tpl.replace(/({%\s*)([^%{}]*?)(\s*%})/g, function (_, prefix, name, suffix) {
    
    const val = params[name];
    // console.log("name", name, val)
    return val
  });

  return tpl
}