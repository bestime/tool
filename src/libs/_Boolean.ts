

/**
   * 强制转换数据为boolean
   *
   * @param data - 转换的数据
   * @returns 真假
   *
   * @example
   * ```javascript
   * // => true
   * const data1 = _Boolean('true')
   *
   * // => true
   * const data2 = _Boolean(true)
   *
   * // => true
   * const data4 = _Boolean(1)
   *
   * // => true
   * const data3 = _Boolean('1')
   * ```
   */
export default function _Boolean (data: any) {
  if(data === true || data === 'true' || data === '1' || data === 1) {
    return true
  } else {
    return false
  }
}