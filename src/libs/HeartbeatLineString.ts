import { LineString, Coordinate } from "maptalks";
import type { LineStringCoordinatesType, LineStringOptionsType } from "maptalks";
import { cloneDeep } from "lodash";



class HeartbeatLineString extends LineString {  
  constructor(coordinates: LineStringCoordinatesType, options?: LineStringOptionsType) {
    super(coordinates, options);
  }
}

HeartbeatLineString.registerJSONType("HeartbeatLineString");

export default HeartbeatLineString;
