function isRunYear(year) {
  var flag = false;
  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
    flag = true;
  }
  return flag;
}


/**
 * 计算一年多少天
 * @param {number} [year] 年份，默认今年
 * @return {number}
*/
export default function countYearDays (year) {
  year = new Date().getFullYear()
  return isRunYear(year) ? 366 : 365
}