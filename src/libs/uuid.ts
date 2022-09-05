import { $letters } from "./help/hpConsts";
import _Number from "./_Number";
import getRandom from "./getRandom";
import padEnd from "./padEnd";

function getRandomWord() {
  return $letters[getRandom(0, $letters.length - 1)][0];
}

/**
 * 生成随机ID
 * @return {String}
 */
export default function uuid(length: number) {
  length = _Number(length);
  let multiplicand = '';
  
  for (let a = 0; a < 13; a++) {
    multiplicand = multiplicand + getRandom(1, 9)
  }

  const t = new Date().getTime() * getRandom(1, 100)

  const res = getRandomWord() + Number(multiplicand).toString(32) + t.toString(32);

  const endStr = getRandomWord() + getRandomWord() + getRandomWord()

  return padEnd(res, 20, endStr)
}
