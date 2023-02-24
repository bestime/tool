import { $headElement } from './hpConsts';

export default function hpCreateFileLoaderElement(
  type: 'css' | 'js',
  url: string,
  callback: () => void,
  attrs?: Record<string, string>
) {
  let oElement: HTMLLinkElement | HTMLScriptElement;
  if (type === 'js') {
    oElement = document.createElement('script');
    oElement.src = url;
  } else {
    oElement = document.createElement('link');
    oElement.setAttribute('rel', 'stylesheet');
    oElement.href = url;
  }

  if (attrs) {
    for (let key in attrs) {
      oElement.setAttribute(key, attrs[key]);
    }
  }

  oElement.onload = oElement.onerror = callback;
  $headElement.appendChild(oElement);
}