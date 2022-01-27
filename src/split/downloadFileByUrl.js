export default function downloadFileByUrl (url, fileName) {
  var link = document.createElement('a')
  link.style.display = 'none'
  link.download = fileName
  link.setAttribute('href', url)
  document.body.appendChild(link)
  link.click()
  link.remove()
}