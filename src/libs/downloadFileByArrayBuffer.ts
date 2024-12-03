
import downloadFileByBolb from './downloadFileByBolb'
import downloadFileByUrl from './downloadFileByUrl'
import { $browserGlobal } from './help/hpConsts'

const iUrl = $browserGlobal.URL

/**
   * 下载ArrayBuffer文件
   * @param data - ArrayBuffer格式的数据
   * @param fileName - 文件名
   */
export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
  downloadFileByBolb(new Blob([data]), fileName)
}
