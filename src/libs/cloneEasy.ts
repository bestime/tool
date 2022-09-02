import { $ArrayTypeNameBig, $ObjectTypeNameBig, $FunctionTypeNameBig } from "./help/hpConsts";
import getType from "./getType";

type TDataList = []
type TDataMap = Record<any, any>
type TDataFunction = Function

export default function cloneEasy<T extends TDataList | TDataMap | TDataFunction> (data: T): T {
  let ret: any
  
  switch (getType(data)) {
    
    case $ArrayTypeNameBig:
      ret = [];
      for(let a = 0; a<(data as []).length; a++) {
        ret.push(cloneEasy((data as TDataList)[a]))
      }
      break;
    case $ObjectTypeNameBig:
      ret = {}
      for (const key in data) {
        ret[key] = cloneEasy(data[key])
      }
      break;
    case $FunctionTypeNameBig:
      function newFun(this:any) {
        (data as TDataFunction).apply(this, arguments as any);
      }

      for (const key in (data as TDataFunction).prototype) {
        newFun.prototype[key] = (data as TDataFunction).prototype[key];
      }

      ret = newFun
      break;
    default: 
      ret = data
      break;
  }

  return ret
}