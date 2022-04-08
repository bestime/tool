import roundFixed from './roundFixed'

function strNumSize(tempNum) {
  if(!tempNum) return 0;
  var stringNum = tempNum.toString()
  var index = stringNum.indexOf(".")
  var newNum = stringNum;
  if (index != -1) {
    newNum = stringNum.substring(0, index)
  }
  return newNum.length
}

export default function getNumberNuit(value, unit) {
  var moneyUnits = ['', "万", "亿", "万亿", "兆"]
  var dividend = 10000;
  var curentNum = value;
  //转换数字
  var curentUnit = moneyUnits[0] + unit;
  //转换单位
  for (var i = 0; i < moneyUnits.length; i++) {
    curentUnit = moneyUnits[i] + unit
    if (strNumSize(curentNum) < 4) {
      if(i == 0) {
        curentNum = curentNum
      }
      break;
    }
    curentNum = curentNum / dividend
  }
  var m = {value: "0", unit: ""}
  m.value = roundFixed(curentNum, 2, true);
  m.unit = curentUnit;
  return m;
}

