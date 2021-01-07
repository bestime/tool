
import { LOCAL_STROAGE } from './const'
export default function removeStorage (key) {
  LOCAL_STROAGE.removeItem(key)
}