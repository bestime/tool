import _String from "./_String"
import split from "./split"

/**
 * 获取文件后缀名
 * @param url 
 * @returns 
 */
export default function getFileTypeFromUrl (url: string) {
  let fileType = ''
  const lastPath = split(url, '/')
  const fileName = _String(lastPath[lastPath.length-1])
  fileName.replace(/.*?\.([^?]+).*/, function (_, $1) {
    fileType = $1
    return $1
  })
  return fileType
}