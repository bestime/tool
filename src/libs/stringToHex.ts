import padStart from "./padStart";

/**
 * 字符串转16禁止
 * @param data - 普通文本
 * @returns 
 */
export default function stringToHex (daga: string) {
  let hex = '';
  for (let i = 0; i < daga.length; i++) {
    hex += padStart(daga.charCodeAt(i).toString(16), 2, '0');
  }
  return hex;
}