import { trim } from "@bestime/utils_base";
import getCookie from "./getCookie";

/**
 * 从下载接口的请求头中获取文件名
 * @param responseHeader 
 * @param fieldName 
 * @returns 
 */
export default function getFileNameFromContentDisposition (responseHeader: Record<string, any>, fieldName?: string) {
  fieldName = fieldName || 'filename'
  const contentDisposition = trim(responseHeader['content-disposition'])
  let res = getCookie(fieldName, contentDisposition)
  
  if(!res) {
    fieldName = fieldName + '\\*'
    res = getCookie(fieldName, contentDisposition)
  }

  return trim(res).replace(/^[^']+\'\'(.*)$/, '$1')
}