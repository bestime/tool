// 这个解析有误，待处理
// http://127.0.0.1:49144/connect?pid=f7dbc77233c56de466d29482642bc5&name=UoUr5RoE&url=http%3A%2F%2F192.168.0.224%3A1181%2F%23%2Fclient-menu%3Ftk%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC96cWlqdW4udHVuLmd1YW5saXl1YW5nb25nLmNvbVwvYXBpXC92MVwvbG9naW5cL3N0YXRlIiwiaWF0IjoxNjA4MjgzOTczLCJuYmYiOjE2MDgyODM5NzMsImp0aSI6IjM5QnNITTNyOTJlb3NsN2MiLCJzdWIiOjI2LCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.P8i9iuaunxJOWd6t6AwV786V9pwAuk-0xCxvwaZmxUY%26uid%3D26





import _Array from './_Array'
import _Object from './_Object'
import _Number from './_Number'
import FN_FORMAT_STRING_VALUE from './FN_FORMAT_STRING_VALUE'
import { WINDOW } from './basic/browser'
import isString from './isString'





/**
 * 解析url复杂参数
 * @param {String} [str = window.location.href] 序列化后的字符串
 * @return {Object}
 */

export default function parseQuery (str) {
  var res = {}, href, hasChlid, queryKey;
	try { href = WINDOW.location.href } catch (e) {href = ''};
  str = isString(str) ? str : href
  // str = decodeURIComponent(str)
	
  str.replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_, key, val) {
		val = FN_FORMAT_STRING_VALUE(decodeURIComponent(val))
		queryKey = decodeURIComponent(key)
		hasChlid = false
		queryKey.replace(/(.*?)(\[.*)/, function (_, k, m) {
			var sb = splitSymbol(m)
			hasChlid = true
			if(isPreLikeArray(sb[0])) {
				res[k] = _Array(res[k])
			} else {
				res[k] = _Object(res[k])
			}
			handleDeepKey(res[k], m, val);
		});

		if(!hasChlid) {
			res[queryKey] = val
		}
  });

  return res
}

/**
 * 处理可能是深层级的数据
 * 
 * @param {String} res 
 * @param {String} more 
 * @param {*} originValue 
 */
function handleDeepKey (res, more, originValue) {
	var sb = splitSymbol(more)
	var nowKey = sb[0]

	if(isPreLikeArray(nowKey)) {
		nowKey = _Number(nowKey)
		if(sb[1] == null) {
			res.push(originValue)
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _Object(res[nowKey])
			} else {
				res[nowKey] = _Array(res[nowKey])
			}			
			handleDeepKey(res[nowKey], sb[1], originValue)
		}
	} else {
		if(sb[1] == null) {
			res[nowKey] = originValue
		} else {
			if(/^\[[\D]+\]/.test(sb[1])) {
				res[nowKey] = _Object(res[nowKey])
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
function splitSymbol (str) {
	if(str==null) {
		return [null, null]
	}

	var pre = str, next;
	
	str.replace(/^\[(.*?)\](.*)?/, function (_, a, b) {
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
function isPreLikeArray (data) {
	return data === '' || /^\d+$/.test(data)
}