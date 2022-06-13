/**
 * blob转文件并下载
*/
export default function downloadFileByBlob(blob, fileName) {
  var blobUrl = window.URL.createObjectURL(blob)
  var link = document.createElement('a')
  link.download = fileName
  link.style.display = 'none'
  link.setAttribute('href', blobUrl)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}