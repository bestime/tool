import getType from "./getType";
import { $ArrayTypeNameBig, $ObjectTypeNameBig } from "./help/hpConsts";
import hpObjectKeys from "./help/hpObjectKeys";
import isEmpty from "./isEmpty";

/**
 * 是不是空对象，用与判断数组或键值对
 */
export default function isEmptyObject (data: any) {
  let res = isEmpty(data)
  if(!res) {
    switch(getType(data)) {
      case $ArrayTypeNameBig:
        // @ts-ignore
        res = data.length < 1
        break;
      case $ObjectTypeNameBig:
        // @ts-ignore
        res = hpObjectKeys(data).length < 1
        break;
    }
  }
  return res
}