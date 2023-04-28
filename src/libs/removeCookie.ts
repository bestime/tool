
import setCookie from './setCookie';

/**
   * 删除cookie
   *
   * @param key - 键名
   */
export default function removeCookie(key: string): void {
  setCookie(key, '', -1)
}
