import { isArray } from "@bestime/utils_base"
import { MultiPolygon } from 'maptalks'

export function getPolygonLilst (geojson: any) {
  const res: MultiPolygon[] = []
  geojson?.features?.forEach(function (item: any) {
    if(item.geometry.type === 'MultiPolygon') {
      const oPl = new MultiPolygon(item.geometry.coordinates,  {
        properties: item.properties,
        symbol: {
          polygonFill: 'transparent',
          lineWidth: 1,
          lineColor: '#ddd'
        }
      })
      res.push(oPl)
    }
  })

  return res
}