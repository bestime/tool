import _Number from "./_Number"
import split from "./split"
import trim from "./trim"

export default function rgbaToObject (rgbaColor: string){
  const rgba = trim(rgbaColor, '*').replace(/^rgba?\((.*)\)$/g, '$1')
    
  const list = split(rgba, ',').map(function (c) {
    return _Number(c)
  })

  return {
    r: list[0],
    g: list[1],
    b: list[2],
    a: list[3],
  }
}