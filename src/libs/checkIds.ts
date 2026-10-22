import arrayRemove from "./arrayRemove";

/**
 * 通用选择ID处理
 * @param data 
 * @param id 
 */
export default function checkIds<T> (data: T[], id: T) {
  if(data.includes(id)) {
    arrayRemove(data, function (_) {
      return _ === id
    })
  } else {
    data.push(id)
  }
}