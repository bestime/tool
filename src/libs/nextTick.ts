import { getType, isNull } from "@bestime/utils_base"
import isPromise from "./isPromise"

type TFunLibHander = (callback: () => void) => void
type TFunLibHanderPromise = () => Promise<void>


function coreNextTick (resolve: any) {  
  requestAnimationFrame(function () {
    requestAnimationFrame(resolve)
  })
}

/**
 * 用于dom动画入场动画失效的hack。确保dom已经加载并渲染
 * @returns 
 */
export default function nextTick (libNextTickHander?: TFunLibHander | TFunLibHanderPromise): Promise<void> {
  
  return new Promise(async function (resolve: () => void) {
    if(isNull(libNextTickHander)) {
      coreNextTick(resolve)
    } else if(isPromise(libNextTickHander)) {
      // @ts-ignore
      libNextTickHander().then(function () {
        coreNextTick(resolve)
      })      
    } else {
      libNextTickHander(function () {
        coreNextTick(resolve)
      })
    }    
  })
}