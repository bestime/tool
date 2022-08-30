export default function getfile (gid: string, oHead: HTMLHeadElement, type: 'script'|'link', url: string, callback: () => void) {
  let oElement: HTMLLinkElement | HTMLScriptElement;
  if(type === 'script') {
    oElement = document.createElement('script')
    oElement.src = url
  } else {
    oElement = document.createElement('link')
    oElement.href = url
    oElement.setAttribute('rel', 'stylesheet')
  }

  oElement.setAttribute('level-id', gid)
  oElement.setAttribute('author', 'bestime')
  oElement.onload = oElement.onerror = callback
  oHead.appendChild(oElement)
}