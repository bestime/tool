import forEach from "./forEach"

interface IRuleItem {
  min: number,
  max: number,
  color: string
}

interface IResItem {
  gte: number,
  lt: number,
  color: string
}

/**
 * 对数据进行分段处理
 * @param list 
 * @param rules 
 * @returns 
 */
export default function getPiecesWithIndex (list: number[], rules: IRuleItem[]) {
  const result:IResItem [] = []
  
  forEach(list, function (num, index) {
    const rule = rules.find(function (c) {
      return num >= c.min && num < c.max
    })
    if(rule) {
      result.push({
        gte: index,
        lt: index + 1,
        color: rule.color
      })
    }
  })

  return result
}
