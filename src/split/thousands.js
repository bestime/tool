import _String from './_String'

/**
 * 正则千分位转换，支持小数（任意字符串按位数相隔）
 * 
 * @param {Num} str 需要转换的字符
 * @param {Sting} [symbol=','] 千分位替换符号，默认逗号
 * @param {Number} [len=3] 按多少位分隔一次，默认3
 */
export default function thousands (str, symbol, len) {
  len = len || 3
  symbol = symbol || ','
  return _String(str).replace(/([^.]*)?(\.)?(.*)?/, function(_, pre, dot, next) {
    return _String(pre).replace(new RegExp('(.(?=(.{'+ len +'})+$))', 'g'), '$1' + symbol) + _String(dot) + _String(next)
  }) 
  // return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol || ',');
}



/**
零【一二三四五六七八九十】 -> false -> 結果：零一二三四五六七八九十

零一【二三四五六七八九十】 -> true -> 結果：零一，二三四五六七八九十
零一二【三四五六七八九十】 -> false -> 結果：零一，二三四五六七八九十
零一二三【四五六七八九十】 -> false -> 結果：零一，二三四五六七八九十

零一二三四【五六七八九十】 -> true -> 結果：零一，二三四，五六七八九十
零一二三四五【六七八九十】 -> false -> 結果：零一，二三四，五六七八九十
零一二三四五六【七八九十】 -> false -> 結果：零一，二三四，五六七八九十

零一二三四五六七【八九十】 -> true -> 結果：零一，二三四，五六七，八九十
零一二三四五六七八【九十】 -> false -> 結果：零一，二三四，五六七，八九十
零一二三四五六七八九【十】 -> false -> 結果：零一，二三四，五六七，八九十
零一二三四五六七八九十 -> false -> 結果：零一，二三四，五六七，八九十
*/