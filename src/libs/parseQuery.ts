import _Array from './_Array'
import _Number from './_Number'
import _Map from './_Map'
import isString from './isString'
import {  } from './constant'
import { WINDOW, DECODE_URI_COMPONENT, _NULL } from './constant'
import FN_FORMAT_STRING_VALUE from './help/FN_FORMAT_STRING_VALUE'


const defaultSplitArr = [_NULL, _NULL]

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
		if(sb[1] == _NULL) {
			res.push(originValue)
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _Map(res[nowKey])
			} else {
				res[nowKey] = _Array(res[nowKey])
			}			
			handleDeepKey(res[nowKey], sb[1], originValue)
		}
	} else {
		if(sb[1] == _NULL) {
			res[nowKey] = originValue
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _Map(res[nowKey])
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
	if(str == _NULL) {
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
function isPreLikeArray (data: any) {
	return data === '' || /^\d+$/.test(data)
}










/**
 * 解析url复杂参数
 * @param {String} [str = window.location.href] 序列化后的字符串
 * @return {Object}
 */

export default function parseQuery (str: string) {
  var res: any = {}, href, hasChlid, queryKey;
	try { href = WINDOW.location.href } catch (e) {href = ''};
  str = isString(str) ? str : href
	
  str.replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_: any, key: any, val: any): any {
		val = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(val))
		queryKey = DECODE_URI_COMPONENT(key)
		hasChlid = false
		if(queryKey!=='') {
			queryKey.replace(/(.*?)(\[.*)/, function (_: any, k: any, m: any): any {
				var sb = splitSymbol(m)
				hasChlid = true
				if(isPreLikeArray(sb[0])) {
					res[k] = _Array(res[k])
				} else {
					res[k] = _Map(res[k])
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