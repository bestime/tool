export default function getfile(
  gid: string,
  oHead: HTMLHeadElement,
  type: 'script' | 'link',
  url: string,
  callback: () => void,
  attrs?: Record<string, string>
) {
  let oElement: HTMLLinkElement | HTMLScriptElement;
  if (type === 'script') {
    oElement = document.createElement('script');
    oElement.src = url;
  } else {
    oElement = document.createElement('link');
    oElement.href = url;
    oElement.setAttribute('rel', 'stylesheet');
  }

  oElement.setAttribute('level-id', gid);
  oElement.setAttribute('author', 'bestime');

  if (attrs) {
    for (let key in attrs) {
      oElement.setAttribute(key, attrs[key]);
    }
  }
  oElement.onload = oElement.onerror = callback;
  oHead.appendChild(oElement);
}
