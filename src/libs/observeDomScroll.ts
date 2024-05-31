import { _KvPair, _Number, isNull } from "@bestime/utils_base"

type TCallbackHandler = (next: () => void) => void

interface IOptions {
  onBottom?: TCallbackHandler,
  onTop?: TCallbackHandler,
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

  function onScroll () {
    if(doing) return;
    if(options.onTop && el.scrollTop<=0) {
      doing = true
      options.onTop(function () {
        doing = false;
      })
    }else if(options.onBottom && el.scrollTop >= el.scrollHeight - el.offsetHeight - offetY) {
      doing = true;
      options.onBottom(function () {
        doing = false
      })
    } else {
      doing = false
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