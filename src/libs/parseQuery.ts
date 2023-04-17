import _Array from './_Array'
import _Number from './_Number'
import _KvPair from './_KvPair'
import { $browserGlobal, $decodeURIComponent, $undefinedValue, $isBroswer } from './help/hpConsts'
import FN_FORMAT_STRING_VALUE from './help/hpTryToParseStringToBasicType'


const defaultSplitArr = [$undefinedValue, $undefinedValue]

/**
 * 处理可能是深层级的数据
 * 
 * @param {String} res 
 * @param {String} more 
 * @param {*} originValue 
 */
function handleDeepKey (res: any, more: any, originValue: any) {
	var sb = splitSymbol(more)
	var nowKey = sb[0]

	if(isPreLikeArray(nowKey)) {
		nowKey = _Number(nowKey)
		if(sb[1] == $undefinedValue) {
			res.push(originValue)
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _KvPair(res[nowKey])
			} else {
				res[nowKey] = _Array(res[nowKey])
			}			
			handleDeepKey(res[nowKey], sb[1], originValue)
		}
	} else {
		if(sb[1] == $undefinedValue) {
			res[nowKey] = originValue
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _KvPair(res[nowKey])
			} else {
				res[nowKey] = _Array(res[nowKey])
			}
			handleDeepKey(res[nowKey], sb[1], originValue)
		}
	}
}

/**
 * 拆分前面的括号，和剩余括号
 * @param {String} str
 * @return {Array}
 */
function splitSymbol (str: any) {
	if(str == $undefinedValue) {
		return defaultSplitArr
	}

	var pre = str, next;
	
	str.replace(/^\[(.*?)\](.*)?/, function (_: any, a: any, b: any) {
		pre = a
		next = b
		return '';
	})
	return [pre, next]
}

/**
 * 前面的括号时候像一个数组
 * @param {String} data
 * @return {Boolean}
 */
function isPreLikeArray (data: any): boolean {
	return data === '' || /^\d+$/.test(data)
}




export default function parseQuery (str?: string) {
  var res: any = {}, hasChlid, queryKey;
  if(!str) {
    if($isBroswer) {
      str = $browserGlobal.location.href || ''
    } else {
      str = ''
    }    
  }
	
  str.replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_: any, key: any, val: any): any {
		val = FN_FORMAT_STRING_VALUE($decodeURIComponent(val))
		queryKey = $decodeURIComponent(key)
		hasChlid = false
		if(queryKey!=='') {
			queryKey.replace(/(.*?)(\[.*)/, function (_: any, k: any, m: any): any {
				var sb = splitSymbol(m)
				hasChlid = true
				if(isPreLikeArray(sb[0])) {
					res[k] = _Array(res[k])
				} else {
					res[k] = _KvPair(res[k])
				}
				handleDeepKey(res[k], m, val);
        
			});
	
			if(!hasChlid) {
				res[queryKey] = val
			}
		}
    
  });

  return res
}