
import downloadFileByUrl from './downloadFileByUrl'
import { $browserGlobal } from './help/hpConsts'

const iUrl = $browserGlobal.URL

/**
   * 下载Blob文件
   * @param data - 数据
   * @param fileName - 文件名
   */
export default function downloadFileByBolb (data: Blob, fileName: string) {
  let url = iUrl.createObjectURL(data)
  downloadFileByUrl(url, fileName)
  iUrl.revokeObjectURL(url)
  // @ts-ignore
  url = undefined
}
