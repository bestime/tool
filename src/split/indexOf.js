export default function indexOf (arr, data) {
  var index = 0, findIndex = -1;
  while (index < arr.length) {
    if(arr[index]===data) {
      findIndex = index
      break;
    }
    index++
  }
  return findIndex
}