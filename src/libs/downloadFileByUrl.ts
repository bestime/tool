export default function downloadFileByUrl (url: string, fileName: string) {
  var link: HTMLAnchorElement | undefined = document.createElement('a')
  // link.style.display = 'none'
  link.download = fileName
  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  // link.click()
  // link.remove()
  // link = undefined;
}