import downloadFileByUrl from './downloadFileByUrl'
import { $browserGlobal, $isBroswer } from './help/hpConsts'



export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
  if(!$isBroswer) return;
  const iUrl = $browserGlobal.URL
  let url: string | undefined = iUrl.createObjectURL(new Blob([data]))
  downloadFileByUrl(url, fileName)
  iUrl.revokeObjectURL(url)
  url = undefined
}
