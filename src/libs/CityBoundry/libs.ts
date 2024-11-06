import { isArray } from "@bestime/utils_base"
import { Marker, MultiPolygon } from 'maptalks'

export interface ILayerBasicStyle {
  backgroundColor: string,
  hoverBackgroundColor?: string
  clickBackgroundColor?: string
  lineColor: string,
  lineWidth: number,
  fontColor: string,
  fontSize: number,
  fontHaloFill: string,
  fontHaloRadius:number,
  icon?: {
    url: string,
    width: number
    height: number
    offsetY: number
  }
}

export function getPolygonLilst (groupName: string, geojson: any, cfg: ILayerBasicStyle, isHidden?: boolean) {
  const res: MultiPolygon[] = []
  const markrs: Marker[] = []
  const isFront = groupName === 'front'
  geojson?.features?.forEach(function (item: any) {
    if(item.geometry.type === 'MultiPolygon') {
      const oPl = new MultiPolygon(item.geometry.coordinates,  {
        interactive: isFront,
        properties: {
          groupName,
          isActive: false,
          acroutes: item.properties.acroutes,
          adcode: item.properties.adcode,
          name: item.properties.name,
        },
        symbol: {
          polygonFill: cfg.backgroundColor,
          lineWidth: cfg.lineWidth,
          lineColor: cfg.lineColor
        }
      })

      if(isArray(item.properties.center)) {
        const symbol = [
          {
            'textFaceName' : 'Microsoft YaHei',
            'textName' : item.properties.name,
            'textWeight'        : 'normal',
            'textStyle'         : 'normal',
            'textSize'          : cfg.fontSize,
            'textFont'          : null,
            'textFill'          : cfg.fontColor,
            'textHaloFill'      : cfg.fontHaloFill,
            'textHaloRadius'    : cfg.fontHaloRadius,
            'textDx'            : 0,
            'textDy'            : 0,
            'textHorizontalAlignment' : 'middle',
            'textVerticalAlignment'   : 'middle',
            'textAlign'               : 'center'
          } as any
        ]

        if(cfg.icon) {
          symbol.push({
            markerFile: cfg.icon.url,
            markerWidth: cfg.icon.width,
            markerHeight: cfg.icon.height,
            markerOpacity: 1,
            markerHorizontalAlignment: 'middle',
            markerVerticalAlignment: 'middle',
            markerDx: 0,
            markerDy: cfg.icon.offsetY,
          } as any)
        }

        const oMarker = new Marker(item.properties.center, {
          interactive: false,
          draggable: false,
          editable: false,
          cursor: 'default',
          properties: {
            groupName
          },
          symbol
        })
        if(isHidden) {
          oMarker.hide()
        }
        markrs.push(oMarker)
      }

      if(isHidden) {
        oPl.hide()
      }
      
      res.push(oPl)
    }
  })

  return {
    polygons: res,
    markers: markrs
  }
}