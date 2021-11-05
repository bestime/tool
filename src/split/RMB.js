import split from './split'
import _Number from './_Number'



const RMB_UNIT_BASIC = ['','十', '百', '千'];

// 万、亿、兆、京、垓、秭、穣、沟、涧、正、载、极......
const RMB_UNIT_BIG = ['', '万', '亿', '兆', '京'];

const RMB_LIST = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const BASIC_LENGTH = RMB_UNIT_BASIC.length;

const MAX_DIGIT = 999999999999999.9999; //最大处理的数字


/**
 * 人名币转中文大写
 * @param {Number} digit 需要转换的数字
 * @param {Boolean} [isRmb=true] 是否是人名币，否则当数字处理
 * @return {String} 转换结果
 */
export default function RMB (digit, isRmb) {
  isRmb = isRmb === false ? false : true
  var RMB_DECIMAL, RMB_LAST, ZHENG;
  if(isRmb) {
    RMB_DECIMAL = ['角', '分', '毫', '厘'];
    RMB_LAST = '元';
    ZHENG = '整'
  } else {
    RMB_DECIMAL = ['', '', '', ''];
    RMB_LAST = '点';
    ZHENG = '';
    
  }
  var DECIMAL_LENGTH = RMB_DECIMAL.length;
  var prefix = digit < 0 ? '负' : '';
  digit = Math.abs(digit);
  if(digit >= MAX_DIGIT) {
    return '超出最大处理数字';
  }
  
  var res = '';
  var list = split(digit, '.');
  var price = list[0], decimals = list[1] || '';
  var unitItem, unitIndex;
  var zeroCount = 0, bigIndex;

  
  
  // 处理整数部分
  for(var index = 0, len = price.length; index < len; index++) {
    unitIndex = len - 1 - index;
    unitItem = RMB_UNIT_BASIC[unitIndex % BASIC_LENGTH];
    if(price[index]==='0'){
      zeroCount++;
    } else {
      if(zeroCount) {
        res += getChinese(0);
      } 
      zeroCount = 0;
      res += getChinese(price[index]) + unitItem;
    }

    if(unitItem == '' && zeroCount < BASIC_LENGTH) {
      bigIndex = unitIndex / BASIC_LENGTH;
      res += RMB_UNIT_BIG[bigIndex];
    }
  }

  // 添加基本单位：元和±标识
  res = prefix + res

  // 处理小数部分
  if(!decimals) {
    if(isRmb) {
      res = res + RMB_LAST + ZHENG;
    } else {
      res = res + ZHENG;
    }
    
  } else {
    res += RMB_LAST
    for(var b = 0; b < decimals.length; b++) {
      if(b < DECIMAL_LENGTH) {
        res += getChinese(decimals[b]) + RMB_DECIMAL[b];
      }
    }
  }

  // 处理完毕
  return res;
}

function getChinese (num) {
  return RMB_LIST[_Number(num)];
}