const _String  = require('./_String')

/**
 * 正则千分位转换
 * @param {Num} str 需要转换的字符 
 * @param {Sting} symbol 千分位替换符号，默认逗号 
 */
function thousands (str, symbol) {
    symbol = symbol || ','
    // 任意字符版
    return _String(str).replace(/([^.]*)?(\.)?(.*)?/, function(item, pre, dot, next) {
        pre = pre || ''
        dot = dot || ''
        next = next || ''
        return pre.replace(/(.(?=(.{3})+$))/g, '$1' + symbol) + dot + next
    }) 
    // return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol || ',');
}

module.exports = thousands



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