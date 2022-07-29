import downloadFileByUrl from './downloadFileByUrl'

export default function downloadFileByArrayBuffer (data: ArrayBuffer, fileName: string) {
  const url = window.URL.createObjectURL(new Blob([data]))
  downloadFileByUrl(url, fileName)
}
