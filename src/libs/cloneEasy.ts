import { $ArrayTypeNameBig, $ObjectTypeNameBig, $FunctionTypeNameBig, $ClassTypeNameBig } from './help/hpConsts';
import getType from './getType';
import forEach from './forEach';


/**
 * 简易版深度克隆。（仅处理数组、键值对、方法的可克隆）
 *
 * @param data - 克隆对象
 * @returns
 */
export default function cloneEasy<T extends [] | Record<any, any> | Function>(data: T): T {
  let ret: any;
  const ty = getType(data)
  

  switch (ty) {
    case $ClassTypeNameBig:
      ret = Object.assign(Object.create(Object.getPrototypeOf(data)), data);
      break;
    case $ArrayTypeNameBig:
      ret = [];
      for (let a = 0; a < (data as any[]).length; a++) {
        ret.push(cloneEasy((data as any[])[a]));
      }
      break;
    case $ObjectTypeNameBig:
      ret = {};
      forEach(Object.keys(data), function (key) {
        // @ts-ignore
        ret[key] = cloneEasy(data[key] as T);
      })
      
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
