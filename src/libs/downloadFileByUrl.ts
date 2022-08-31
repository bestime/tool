export default function downloadFileByUrl (url: string, fileName: string) {
  var link: HTMLAnchorElement | undefined = document.createElement('a')
  link.style.display = 'none'
  link.download = fileName
  link.setAttribute('href', url)
  document.body.appendChild(link)
  link.click()
  link.remove()
  link = undefined;
}