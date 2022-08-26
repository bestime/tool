
import setCookie from "./setCookie";


//删除cookie
export default function removeCookie (key: string): void {
  setCookie(key, '', -1)  
}
