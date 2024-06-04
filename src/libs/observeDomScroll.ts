import { _KvPair, _Number } from "@bestime/utils_base"

type TCallbackHandler = (next: () => void) => void

interface IOptions {
  onBottom?: TCallbackHandler,
  onTop?: TCallbackHandler,
  /** Y轴触底、触顶的差值 */
  offetY?: number
}

/**
 * 监听dom滚动到顶部或头部
 * @param el 
 * @param config 
 */
export default function (el: HTMLElement, config?: IOptions) {
  const options: IOptions = _KvPair(config)
  const offetY = _Number(options.offetY)
  let doing = false
  let prev_y = 0

  function onScroll () {    
    if(doing) return;   
    const currentTop = el.scrollTop
    const isScrollY = currentTop !== prev_y
    const isScrollX = false
    prev_y = currentTop

    if(isScrollY) {
      if(options.onTop && currentTop<=(0+offetY)) {
        doing = true
        options.onTop(function () {
          doing = false;
        })
      } else if(options.onBottom && currentTop >= el.scrollHeight - el.offsetHeight - offetY) {
        doing = true;
        options.onBottom(function () {
          doing = false
        })
      } else {
        doing = false
      }
    } else if(isScrollX){
      doing = false
      // todo：横向滚动
    }
    
  }
  el.addEventListener('scroll', onScroll)

  function dispose () {
    el.removeEventListener('scroll', onScroll)
  }

  return {
    /**
     * 销毁
     */
    dispose
  }
}