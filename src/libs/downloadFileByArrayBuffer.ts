import downloadFileByUrl from './downloadFileByUrl'
import { browserGlobal } from './constant'

const iUrl = browserGlobal.URL

export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
  const url = iUrl.createObjectURL(new Blob([data]))
  downloadFileByUrl(url, fileName)
  iUrl.revokeObjectURL(url)
}
