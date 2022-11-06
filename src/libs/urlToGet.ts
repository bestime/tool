import _String from './_String'
import isArray from './isArray'
import isKvPair from './isKvPair'
import param from './param'


export default function urlToGet (url: string, searchString: string | {[key: string]: any}) {
  url = _String(url).replace(/&*$/g, '').replace(/\?*$/, '');
  var str = ''
  if(isKvPair(searchString) || isArray(searchString)) {
    str = param(searchString as any)
  } else {
    str = _String(searchString).replace(/^&*/, '');
  }
  
  str && (url += (/\?/.test(url) ? '&' : '?') + str);
  return url;
}


/*
urlToGet('1111111111', 'a=0&b=2')
urlToGet('2222222222', 'a=0&b=2')
urlToGet('333333333?c=5&', 'a=0&b=2')
urlToGet('333333333?c=5&', {
  name: '张三',
  skill: [1, 2, 3, 4, 5]
})
*/