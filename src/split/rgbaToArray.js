export default function rgbaToArray (str) {
  str = str.replace(/.*\((.*)\)/, '$1')
  str = str.split(',')
  for(let a = 0; a<str.length; a++) {
    str[a] *= 1
  }
  return str
}