import { _Array } from "@bestime/utils_base";
import { LineString, MultiLineString, type LineStringCoordinatesType, type LineStringOptionsType } from "maptalks";



export default class MaptalksPluginFlyPath extends MultiLineString {
  constructor(coordinates: LineStringCoordinatesType[], options: LineStringOptionsType & {
    targetWidth: number
    duration: number
  }) {
    super(coordinates, options);

    console.log("测试", _Array)
  }
}