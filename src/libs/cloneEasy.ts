import { $ArrayTypeNameBig, $ObjectTypeNameBig, $FunctionTypeNameBig } from './help/hpConsts';
import getType from './getType';

export default function cloneEasy<T extends [] | Record<any, any> | Function>(data: T): T {
  let ret: any;

  switch (getType(data)) {
    case $ArrayTypeNameBig:
      ret = [];
      for (let a = 0; a < (data as any[]).length; a++) {
        ret.push(cloneEasy((data as any[])[a]));
      }
      break;
    case $ObjectTypeNameBig:
      ret = {};
      for (const key in data) {
        ret[key] = cloneEasy(data[key] as T);
      }
      break;
    case $FunctionTypeNameBig:
      function newFun(this: any) {
        (data as Function).apply(this, arguments as any);
      }

      for (const key in (data as Function).prototype) {
        newFun.prototype[key] = (data as Function).prototype[key];
      }

      ret = newFun;
      break;
    default:
      ret = data;
      break;
  }

  return ret;
}
