
import getRandom from './getRandom'
import floorFixed from './floorFixed'
import roundFixed from './roundFixed'

/**
 * 随机将数字分配为几等份
 * 注：decimals和decimals为0可表示评分，如果有多或少的，将会找最大或最小的值微调，最终结果可能为[2,1,1,1,1,1,1,1]
 * @param {Number} total 总数
 * @param {Number} copies 份数
 * @param {Number} [decimals=0] 保留小数点位数
 * @param {Number} [rate=0] 误差比例，范围：0~1，比例越大，每份可能的差就越大,若大于等于1，则可能出现负值，或者0
 * @return {Array<String>} list 字符串数组
 * 
 */
export default function allocateNumber (total, copies, decimals, rate) {
  decimals = decimals || 0
  rate = rate || 0

  const multiple = Math.pow(10, decimals)
  const average = total / copies
  const offsetABS = rate * average * multiple
  
  // decimals
  
  let adjust = 0;
  let list = []
  let item;
  for(let index = 0; index < copies; index++) {
    if(adjust < 0) {
      adjust = getRandom(0, offsetABS, false) / multiple
    } else {
      adjust = getRandom(-offsetABS, 0, false) / multiple
    }
    item = adjust + average
    // console.log(average, '=>offsetABS', offsetABS, '=>', adjust)
    list.push(item)
  }
  
  var min = 0, minIndex = 0;
  var max = 0, maxIndex = 0;
  for(var a = 0; a<list.length; a++) {
    list[a] = floorFixed(list[a], decimals)
    if(min>list[a]) {
      min = list[a]
      minIndex = a
    }

    if(list[a] > max) {
      max = list[a]
      maxIndex = a
    }
  }

  let amount = roundFixed(list.reduce((p, c) => p*1 + c*1, 0), decimals)

  if(amount < total) {
    list[minIndex] = roundFixed(list[minIndex] * 1 + total - amount, decimals)
  } else if(amount > total) {
    list[maxIndex] = roundFixed(list[maxIndex] * 1 - (amount - total), decimals)
  }
  amount = list.reduce((p, c) => p * 1 + c * 1, 0)
  // console.log('综合', amount, '=>', total, list)
  return list;
}