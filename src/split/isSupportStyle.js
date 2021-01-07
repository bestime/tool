import { DOCUMENT_CREATE_DIV } from './basic/browser'

export default function isSupportStyle (name) {
  var el = DOCUMENT_CREATE_DIV(),
    vendors = ['Webkit', 'Moz', 'O', 'ms'],
    len = vendors.length;  
  var dstyle = el.style;  
  if (name in dstyle) return true;  
  name = name.replace(/^[a-z]/, function(val) {  
    return val.toUpperCase();  
  });  
  while (len--) {  
    if (vendors[len] + name in dstyle) {  
      return true;  
    }  
  }  
  return false;  
}