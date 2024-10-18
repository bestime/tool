import { isArray } from "@bestime/utils_base"
import { Marker, MultiPolygon } from 'maptalks'

export function getPolygonLilst (geojson: any, cfg: {
  backgroundColor: string,
  lineWidth: number,
  lineColor: string,
  fontSize: number,
  fontColor: string
  fontHaloFill?: string
  fontHaloRadius?: number
}) {
  const res: MultiPolygon[] = []
  const markrs: Marker[] = []
  geojson?.features?.forEach(function (item: any) {
    if(item.geometry.type === 'MultiPolygon') {
      const oPl = new MultiPolygon(item.geometry.coordinates,  {
        properties: item.properties,
        symbol: {
          polygonFill: cfg.backgroundColor,
          lineWidth: cfg.lineWidth,
          lineColor: cfg.lineColor
        }
      })
      if(isArray(item.properties.center)) {
        const oMarker = new Marker(item.properties.center, {
          symbol: {
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
        })
        markrs.push(oMarker)
      }
      
      res.push(oPl)
    }
  })

  return {
    polygons: res,
    markers: markrs
  }
}