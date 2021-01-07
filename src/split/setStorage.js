import SET_STRING_VALUE from './SET_STRING_VALUE'
import { LOCAL_STROAGE } from './const'

/**
 * 设置本地存储
 * 
 * @param {String} key 
 * @param {*} val 
 */

export default function setStorage (key, val) {
  LOCAL_STROAGE.setItem(key, SET_STRING_VALUE(val))
}