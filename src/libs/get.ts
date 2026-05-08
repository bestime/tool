import { $undefinedValue } from "./help/hpConsts";
import isNull from "./isNull";
import split from "./split";



/**
 * 简易获取值，支持默认值和格式化
 * @param data 原始数据
 * @param defaultValue 默认数据。默认将 undefined、null、'', '-' 视为无值
 * @param formatter 自定义格式化
 * @param path 链式路径
 * @param whiteList 空数据白名单。默认：[‘-’]
 * @returns 
 */
export default function get<T, R> (
  data: T,
  defaultValue: R,
  formatter?:(value: NonNullable<T>) => R,
  path?: string,
  whiteList?: string[]
):R {
  // 根据path递归查询数据
  if(!isNull(data, whiteList) && !isNull(path)) {
    const pathList: string[] = split(path, '.')  
    let finish = false
    while(pathList.length && !finish) {
      const key = pathList.shift()!      
      try {
        // @ts-ignore
        data = data[key]
        // console.log("各个", data, key)
      } catch(e) {
        // @ts-ignore
        data = $undefinedValue
        finish = true
      }
    }
  }
  

  if(isNull(data, whiteList)) {
    // @ts-ignore
    data = defaultValue
  } else if(formatter) {
    // @ts-ignore
    data = formatter(data)
  }
  // @ts-ignore
  return data as R
}