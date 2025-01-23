import { dataCache } from "@bestime/utils_base";
import { Map, type DataDrivenPropertyValueSpecification } from "mapbox-gl";

export interface IMapImage {
  name: string,
  width: number
  height: number
}



export default async function loadImage (map: Map, data: {
  url: string,
  name: string
}[], imgGroup: Record<string, any>) {
  const fns = data.map(function (item) {
    const old = dataCache(item.name, imgGroup)
    
    return new Promise(function (resolve: (data: IMapImage) => void) {
      if(old.isExist()) {
        
        old.get(function (v:IMapImage) {
          resolve(v)
        })
        return;
      }
      
      map.loadImage(item.url, function (error, image: any) {
        if(error) return;
        
        const img:IMapImage = {
          name: item.name,
          width: image.width,
          height: image.height
        }
        map.addImage(item.name, image);
        old.set(img)
        resolve(img)
      })
    })
  })

  return await Promise.all(fns)  
}