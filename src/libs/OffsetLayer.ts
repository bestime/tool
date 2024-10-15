import { VectorLayer } from "maptalks";
import type { VectorLayerOptionsType, Geometry } from "maptalks";

export default class OffsetLayer extends VectorLayer {
  constructor (id: string, geometries: VectorLayerOptionsType | Array<Geometry>, options?: VectorLayerOptionsType) {
    super(id, geometries, options)
    
   console.log("新的") 
  }

  
}