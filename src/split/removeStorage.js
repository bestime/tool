
import { LOCAL_STROAGE } from './basic/browser'
export default function removeStorage (key) {
  LOCAL_STROAGE.removeItem(key)
}