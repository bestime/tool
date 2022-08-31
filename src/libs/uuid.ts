import { LETTER_LIST } from "./constant";
import _Number from "./_Number";
import getRandom from "./getRandom";
import padEnd from "./padEnd";

const letterLength = LETTER_LIST.length - 1;


function getRandomWord() {
  return LETTER_LIST[getRandom(0, letterLength)][0];
}

/**
 * 生成随机ID
 * @return {String}
 */
export default function uuid(length: number) {
  length = _Number(length);
  let multiplicand = "";
  
  for (let a = 0; a < 13; a++) {
    multiplicand = multiplicand + getRandom(1, 9)
  }

  const t = new Date().getTime() * getRandom(1, 100)

  const res = getRandomWord() + Number(multiplicand).toString(32) + t.toString(32);

  const endStr = getRandomWord() + getRandomWord() + getRandomWord()

  return padEnd(res, 20, endStr)
}
