import cloneEasy from "./cloneEasy";

const main: typeof bestime.mapTree = function (data, childKeyTo, handle, childKeyFrom) {
  childKeyFrom = childKeyFrom || 'children'
  const result: any[] = []
  ;(function handleOneList (list, newList) {
    for(let index = 0; index<list.length;index++) {
      newList[index] = cloneEasy(handle(list[index]))
      newList[index][childKeyTo] = []
      if(list[index][childKeyFrom]) {
        handleOneList(list[index][childKeyFrom], newList[index][childKeyTo])
      }
    }
  })(data, result);
  
  return result
}

export default main