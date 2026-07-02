
/**
 * base64转16进制
 * @param base64Str 
 * @returns 
 */
export default function base64ToHex (base64Str: string) {
  const binaryString = atob(base64Str); // 浏览器环境使用 atob，Node.js 请用 Buffer
  let hex = '';
  for (let i = 0; i < binaryString.length; i++) {
    hex += binaryString.charCodeAt(i).toString(16).padStart(2, '0');
  }
  return hex;
}