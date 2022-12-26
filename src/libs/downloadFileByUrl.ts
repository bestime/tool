export default function downloadFileByUrl (url: string, fileName: string) {  
  const link = document.createElement('a')
  link.style.display = 'none'
  link.download = fileName
  link.setAttribute('href', url)
  link.setAttribute('target', '_blank')
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()
}