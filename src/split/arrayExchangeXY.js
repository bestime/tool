/**
 * 倒换 X轴和Y轴数据
 * 默认一个x刻度对应一列数据，如果原始数据为一个Y刻度对应一行数据，就先转换一次
 * @param {array} list 原始数据(二维数组)
 * @return {array} 转换后的数据
 */
export default function arrayExchangeXY (list) {
  var res = []
  for(var rowIndex = 0; rowIndex < list.length; rowIndex++) {
    for(var columnIndex = 0; columnIndex < list[rowIndex].length; columnIndex++) {
      res[columnIndex] = res[columnIndex] || []
      res[columnIndex][rowIndex] = list[rowIndex][columnIndex]
    }
  }
  return res;
}