import cloneEasy from "./cloneEasy";

const main: typeof bestime.mapTree = function (data, childKeyTo, handle, childKeyFrom) {
  childKeyFrom = childKeyFrom || 'children'
  const result: any[] = []
  ;(function handleOneList (list, newList) {
    for(let index = 0; index<list.length;index++) {
      newList[index] = cloneEasy(handle(list[index]))
      
      if(list[index][childKeyFrom]) {
        newList[index][childKeyTo] = []
        handleOneList(list[index][childKeyFrom], newList[index][childKeyTo])
      }
    }
  })(data, result);
  
  return result
}

export default main