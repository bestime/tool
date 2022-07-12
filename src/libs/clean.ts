import trim from './trim'
import isString from './isString'
import isEmptyMap from './isEmptyMap'
import isMap from './isMap'
import isArray from './isArray'



export default function clean<T extends any[]| {
  [key: string]: any
  [key: number]: any
}> (
  data: T,
  removeEmptyStr?: boolean,
  removeEmptyObject?: boolean
):T {
  var res: any;
  removeEmptyObject = removeEmptyObject === false ? false : true;
  if(isMap(data)) {
    res = {}
    var mpItem, key: any, temp;
    for(key in data) {
      mpItem = data[key]
      if(isArray(mpItem) || isMap(mpItem)) {
        temp = clean(mpItem, removeEmptyStr)
      } else {
        temp = mpItem
      }

      // console.log("谷歌", key, temp)
      _filterData(temp, removeEmptyStr, removeEmptyObject, function (useValue: any) {
        
        res[key] = useValue;
      });
    }
  } else if(isArray(data)) {
    res = []
    for(var index = 0, len = data.length; index < len; index++) {
      _filterData(clean(data[index], removeEmptyStr), removeEmptyStr, removeEmptyObject, function (useValue: any) {
        res.push(useValue);
      });
    }
  } else {
    res = data
  }
  return res
}

/**
 * @param {*} data
 * @param {Boolean} removeEmptyStr  
 * @param {Function} callback  
 */
function _filterData (data: any, removeEmptyStr: any, removeEmptyObject: any, callback: any) {
  if(isString(data)) {
    if(removeEmptyStr) {
      if(trim(data, '*') != '') {
        callback(data)
      }
    } else {
      callback(data)
    }
  } else if(data != null){
    if(removeEmptyObject && isMap(data) && isEmptyMap(data)) {
      callback(data)
    } else {
      callback(data)
    }
  }
}
