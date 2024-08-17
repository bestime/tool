import { defualtFormatter } from "@bestime/utils_base";
import getWindowSize from "./getWindowSize";

/**
 * 动态计算弹出框位置，使之保持在可是范围内。多用于跟随鼠标移动的菜单或信息框
 * @param options - 配置项
 * @returns - 计算后的位置
 */
export default function infoContainerPosition (options: {
  /** 需要将容器设置到：坐标X */
  x: number,
  /** 需要将容器设置到：坐标Y */
  y: number,
  /** 容器宽度 */
  width: number,
  /** 容器高度 */
  height: number,
  /** 与目标位置X偏移量。默认 10 */
  offsetX?: number
  /** 与目标位置Y偏移量。默认 10 */
  offsetY?: number
  /** 距离视口多少时表示超出可视范围。默认 10*/
  padding?: number
  mode?: 'top-right'
}) {

  const realMode = options.mode || 'top-right'
  const width = options.width
  const height = options.height
  const offsetY = defualtFormatter(10 as number, options.offsetY)
  const offsetX = defualtFormatter(10  as number, options.offsetX)
  const padding = defualtFormatter(10  as number, options.padding)
  let x = options.x

  let y = options.y
  const winSize = getWindowSize()
  const limitX = [padding, winSize.width - width - padding]
  const limieY = [padding, winSize.height - height - padding]


  if(realMode === 'top-right') {
    x = x + offsetX
    y = y - height - offsetY
    if(x<limitX[0]) {
      x = limitX[0]
      
    } else if(x > limitX[1]) {
      const tryX = x - width - offsetX *2
      if(tryX>limitX[0]) {
        x = tryX
      } else {
        x = limitX[1]
      }    
    }
  
    if(y<limieY[0]) {
      const tryY =y + height + offsetY*2 
      if(tryY<limieY[1]) {
        y = tryY
      } else {
        y = limieY[0]
      }
    } else  if(y>limieY[1]) {
      y = y - height - offsetY * 2
    }

  } else if(realMode === 'bottom-right') {
    x = x + offsetX
    y = y + offsetY
  } else if(realMode === 'top-left') {
    x = x - width - offsetX
    y = y - height - offsetY
  }

  

  
  

  return {
    x,
    y
  }
  
}