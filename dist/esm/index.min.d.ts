import {
  Layer,
  VectorLayer,
  Map,
  VectorLayerOptionsType,
  Geometry,
  LineString,
  LineStringCoordinatesType,
  LineStringOptionsType
} from 'maptalks';

interface IBorderLayerConfig {
  borderColor: string;
  borderWidth: string;
  backgroundColor: string;
}
/**
 * maptalks的border图层，用于给地图绘制边框，可以导出带边框的图片（如果不需要导出，大可使用css）
 */
declare class BorderLayer extends Layer {
  _config: IBorderLayerConfig;
  constructor(id: string, config: IBorderLayerConfig, layerOption: Record<string, any>);
  getConfig(): IBorderLayerConfig;
}

interface IOptions {
  zIndex: number;
}
declare class CityBoundry {
  _layer: VectorLayer;
  constructor(id: string, options?: Partial<IOptions>);
  setAreaCode(code: string): Promise<void>;
  addTo(map: Map): void;
  clear(): void;
  dispose(): void;
}

declare class OffsetLayer extends VectorLayer {
  constructor(
    id: string,
    geometries: VectorLayerOptionsType | Array<Geometry>,
    options?: VectorLayerOptionsType
  );
}

declare class HeartbeatLineString extends LineString {
  constructor(coordinates: LineStringCoordinatesType, options?: LineStringOptionsType);
}

declare function export_default(staticBaseUrl: string): void;

export { BorderLayer, CityBoundry, HeartbeatLineString, OffsetLayer, export_default as default };

export default undefined;
