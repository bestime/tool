import FN_FORMAT_STRING_VALUE from './help/FN_FORMAT_STRING_VALUE'


export default function getStorage (key: string) {
  const res = localStorage.getItem(key)
  return res ? FN_FORMAT_STRING_VALUE(res) : ''
}