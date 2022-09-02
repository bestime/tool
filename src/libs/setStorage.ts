import SET_STRING_VALUE from './help/hpSetStringValue'


/**
 * 设置本地存储
 * 
 * @param {String} key 
 * @param {*} val 
 */

export default function setStorage (key: string, val: any) {
  localStorage.setItem(key, SET_STRING_VALUE(val))
}