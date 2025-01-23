import type { DataDrivenPropertyValueSpecification, MapMouseEvent } from "mapbox-gl"
import type { IColor, ILineOption, IPointOption, IPointScale, IPointScaleOneZoom, IPointZoomRule } from "./types"
import type { IMapImage } from "../loadImage"
import { uniq } from "lodash-es"
import { _Number, forEachKvPair } from "@bestime/utils_base"


interface IOneSize {
  icon: string
  iconSize: number,
  fontSize: number,
  fontOffset: [number, number]
}

interface ISize {
  zoom: number,
  sizes: Record<string, IOneSize>,  
}

export function getTypeColor (colorList: IColor[]) {
  const iconSizeList: any = ['match', ['get', 'type']]

  colorList.forEach(function (item) {
    iconSizeList.push(item.id)
    iconSizeList.push(item.color)
  })
  iconSizeList.push('blue')
  console.log("iconSizeList", iconSizeList)
  return iconSizeList;
}


function middleCalculate (scale: IPointScale, cZoom: number) {
  return function (minV: number, maxV: number) {
    return (maxV - minV) * (cZoom - scale.start.zoom) / (scale.end.zoom - scale.start.zoom) + minV
  }
}

export function getLineOpacity (rules: ILineOption['zoomRules']) {
  const res: any[] = ['interpolate', ['linear'], ['zoom']]  
  rules.forEach(function () {
    
  })
  
  return res as any;
}

const linearkey: Array<keyof IPointScale> = ['start', 'end']

type TUseScaleList = Array<IPointZoomRule & {
  scaleLinearList: IPointScaleOneZoom[]
}>

function convertStartEndZoomToList (rules: IPointZoomRule[]) {
  let allZoom: number[] = []
  // 先统计所有层级，再去重，再排序
  rules.forEach(function (item) {
    if(item.scaleLinear) {
      allZoom.push(item.scaleLinear.start.zoom)
      allZoom.push(item.scaleLinear.end.zoom)
    }
  })
  allZoom = uniq(allZoom)
  allZoom.sort(function (a, b) {
    return a - b
  })

  console.log("所有zoom", allZoom)
  

  // 补全没有的层级配置
  const dd: TUseScaleList = rules.map(function (item) {    
    const scaleLinearList: IPointScaleOneZoom[] = []
    if(item.scaleLinear) {
      allZoom.map(function (zoom) {
        const start = item.scaleLinear?.start.zoom
        if(zoom < item.scaleLinear!.start.zoom) {
          scaleLinearList.push({
            zoom,
            iconSize: 0,
            fontSize: 0,
            fontOffset: [0, 0]
          })
        } else if(zoom === item.scaleLinear!.start.zoom) {
          scaleLinearList.push(item.scaleLinear!.start)
        } else {
          const handler = middleCalculate(item.scaleLinear!, zoom)
          scaleLinearList.push({
            zoom: handler(item.scaleLinear!.start.zoom, item.scaleLinear!.end.zoom),
            iconSize: handler(item.scaleLinear!.start.iconSize, item.scaleLinear!.end.iconSize),
            fontSize: handler(item.scaleLinear!.start.fontSize, item.scaleLinear!.end.fontSize),
            fontOffset: [
              handler(item.scaleLinear!.start.fontOffset[0], item.scaleLinear!.end.fontOffset[0]),
              handler(item.scaleLinear!.start.fontOffset[1], item.scaleLinear!.end.fontOffset[1])
            ]
          })

        }
      })
    }
    
    return {
      scaleLinearList,
      ...item
    }
  })

  
  
  return dd
}

function rulesTopZooms (rules: IPointZoomRule[]) {
  const profil = convertStartEndZoomToList(rules)
  const res: ISize[] = []
  profil.forEach(function (parent) {    
    parent.scaleLinearList.forEach(function (item) {      
      const oldSize = res.find(c=>c.zoom === item.zoom)
      const useSize: ISize = oldSize || {
        zoom: item.zoom,
        sizes: {}
      }

      useSize.sizes[parent.id] = {
        icon: parent.icon ?? '',
        fontSize: item.fontSize,
        iconSize: item.iconSize,
        fontOffset: item.fontOffset
      }

      if(!oldSize) {
        res.push(useSize)
      }      
    })
  })


  res.sort(function (a, b) {
    return a.zoom - b.zoom
  })

  console.log("灌灌灌灌", res)
  return res
}

export function getIconAndTextSizeWithZoom (icons: IMapImage[], config: IPointOption) {
  const sizes = rulesTopZooms(config.zoomRules)
  const iconSizeList: DataDrivenPropertyValueSpecification<number> = ['interpolate', ['linear'], ['zoom']]  
  const textSizeList: DataDrivenPropertyValueSpecification<number> = ['interpolate', ['linear'], ['zoom']]  
  const textOffsetList: DataDrivenPropertyValueSpecification<number> = ['interpolate', ['linear'], ['zoom']]  
  sizes.forEach(function (item) {
    if(!item.sizes) return;
    const iconName:DataDrivenPropertyValueSpecification<number> = ['match', ['get', 'id']]
    const fontZoom:DataDrivenPropertyValueSpecification<number> = ['match', ['get', 'id']]
    const fontOffset:DataDrivenPropertyValueSpecification<number[]> = ['match', ['get', 'id']]
    iconSizeList.push(_Number(item.zoom))
    textSizeList.push(_Number(item.zoom))
    textOffsetList.push(_Number(item.zoom))
    iconSizeList.push(iconName)
    textSizeList.push(fontZoom)
    textOffsetList.push(fontOffset)

    forEachKvPair(item.sizes, function (size, id) {
      const imgInfo = icons.find(function (c) {
        return c.name === size.icon
      })
      if(imgInfo) {
        iconName.push(id)
        fontZoom.push(id)
        fontOffset.push(id)
        const scale = getIconSize(imgInfo, size.iconSize)
        iconName.push(scale)
        fontZoom.push(size.fontSize)
        const ofX = (size.fontOffset[0])/size.fontSize
        const ofY = ((size.iconSize + size.fontSize)/ 2+size.fontOffset[1] ) / size.fontSize
        fontOffset.push([size.fontOffset[0], size.fontOffset[1]])
      }      
    })
    
    iconName.push(0.3)
    fontZoom.push(12)
    fontOffset.push([0, 0])
  })

  // 没有配置时使用默认值
  if(sizes.length === 0) {
    return {
      iconSize: 1,
      textSize: 12,
      textOffset: [0, 0]
    }
  }

  return {
    iconSize: iconSizeList,
    textSize: textSizeList,
    textOffset: textOffsetList
  }
  
}

/**
 * 转换图片尺寸为mapbox图片比例
 * @param mapImg - 已加载在地图上的图标
 * @param size - 图片尺寸（自动选择最大的边）
 * @return 尺寸比例
 */
export function getIconSize (mapImg: IMapImage, size: number) {
  return size / Math.max(mapImg.width, mapImg.height)
}



// function replaceUrl (str: string, from: string, to: string) {
// 	const reg = new RegExp('^' +from + '(:\d+)?')
//   return str.replace(reg, to)

// }

// const a = replaceUrl('http://172.19.30.242/kk-api/demo/20250116034014A054_20250116034014.mp3', 'http://172.19.30.242', '百度')
// console.log("结果", a)
