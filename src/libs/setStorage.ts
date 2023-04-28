import SET_STRING_VALUE from './help/hpSetStringValue'


/**
   * 设置localstorage
   * @param key - 保存的键
   * @param value - 保存的值
   */

export default function setStorage (key: string, value: any) {
  localStorage.setItem(key, SET_STRING_VALUE(value))
}