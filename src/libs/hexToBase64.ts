
/**
 * 16进制转base64
 * @param hexStr 16进制字符串
 * @returns 
 */
export default function hexToBase64 (hexStr: string) {
  let binaryString = '';
  for (let i = 0; i < hexStr.length; i += 2) {
    binaryString += String.fromCharCode(parseInt(hexStr.substring(i, i+2), 16));
  }
  return btoa(binaryString); // Node.js环境请用 Buffer.from(...)
}