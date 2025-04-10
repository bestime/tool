import { $letters } from "./help/hpConsts";
import _Number from "./_Number";
import getRandom from "./getRandom";

function getRandomWord() {
  return $letters[getRandom(0, $letters.length - 1)][0];
}

function deeps (pref:string, length: number): string {
  let multiplicand = '';
  
  for (let a = 0; a < 20; a++) {
    multiplicand = getRandomWord() + multiplicand + getRandom(1, 9)
  }

  const t = new Date().getTime() * getRandom(1, 100)

  let res = pref + getRandomWord() + Number(multiplicand).toString(32).substring(0, 12) + t.toString(32).substring(0, 12);

  
  if(res.length<length) {
    return deeps(res, length)    
  }
  

  // console.log("# ", getRandomWord())
  // console.log("# ", Number(multiplicand).toString(32).substring(0, 12))
  // console.log("# ", t.toString(32).substring(0, 12))
  // console.log("# ", res)
  return res.substring(0, length);
}

/**
 * 生成唯一ID
 * @param length - id长度
 * @returns 生成的ID字符串
 */
export default function uuid(length?: number) {
  length = _Number(length) || 20
  return deeps('', length)
}
