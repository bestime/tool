import isFunction from './isFunction'

export default function getMax (list, handle) {
  var max = null, item;
  for(var a = 0; a<list.length; a++) {
    item = list[a]
    if(isFunction(handle)) {
      item = handle(item)
    }

    if(max === null) {
      max = item
    } else if(max < item){
      max = item
    }
  }

  return max
}