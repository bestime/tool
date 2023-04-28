

export const $letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

/** 数据类型常量：Array */
export const $ArrayTypeNameBig = 'Array';

export const $FunctionTypeNameBig = 'Function';

/** 数据类型常量：Object */
export const $ObjectTypeNameBig = 'Object';

/** 数据类型常量(大写)：String */
export const $stringTypeNameBig = 'String';

/** 数据类型常量：Number */
export const $numberTypeNameBig = 'Number';

export const $undefinedValue = undefined;

export const $zeroString = '0';

/** false字符串 */
export const $falseString = 'false';

/** true字符串 */
export const $trueString = 'true';

/** toString简写 */
export const $ObjectTypeNameBigPrototypeToString = Object.prototype.toString;

/** 编码 encodeURIComponent */
export const $encodeURIComponent = encodeURIComponent;

/** 解码 decodeURIComponent */
export const $decodeURIComponent = decodeURIComponent;

/** 空白字符串 (已转意) */
export const $regSpaceStr = '\\s\\uFEFF\\xA0';

/** 判断是否是浏览器环境 */
export const $isBroswer = typeof document !== 'undefined' && document.getElementById !== undefined;

/** 代理浏览器 window */
export const $browserGlobal = window;

export const $headElement = $isBroswer ? document.getElementsByTagName('head')[0] : undefined;

