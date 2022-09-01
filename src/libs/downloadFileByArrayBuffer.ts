import downloadFileByUrl from './downloadFileByUrl'
import { browserGlobal } from './constant'

const iUrl = browserGlobal.URL

export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
  let url: string | undefined = iUrl.createObjectURL(new Blob([data]))
  downloadFileByUrl(url, fileName)
  iUrl.revokeObjectURL(url)
  url = undefined
}
