import downloadFileByUrl from './downloadFileByUrl'
import { $browserGlobal } from './help/hpConsts'



/**
   * 下载ArrayBuffer文件
   * @param data - ArrayBuffer格式的数据
   * @param fileName - 文件名
   */
export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
 
  const iUrl = $browserGlobal.URL
  let url: string | undefined = iUrl.createObjectURL(new Blob([data]))
  downloadFileByUrl(url, fileName)
  iUrl.revokeObjectURL(url)
  url = undefined
}
