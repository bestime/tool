import * as mapbox_gl from 'mapbox-gl';
import { Map, MapMouseEvent } from 'mapbox-gl';

interface IPipeLineOption {
  container: HTMLDivElement;
  onZoom?: (value: number) => void;
  onLineSelect?: (properties: Record<string, any>) => void;
  onPointSelect?: (properties: Record<string, any>, rule?: IPointZoomRule) => void;
  style: {
    backgroundColor?: string;
    boundaryBorderColor?: string;
    boundaryBorderWidth?: number;
    boundaryBackgroundColor?: string;
    boundaryBackgroundOpacity?: number;
  };
  staticSource: {
    glyphs: string;
    boundaryGeojson: string;
  };
  referImage?: {
    url: string;
    coordinates: IExtentCoordinates;
    opacity: number;
  };
}
interface IEllipseItem {
  title: string;
  subTitle: string;
  center: [number, number];
  xSemiAxis: number;
  ySemiAxis: number;
  angle: number;
  steps: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
}
interface IColor {
  id: string;
  label: string;
  color: string;
}
type IExtentCoordinates = [[number, number], [number, number], [number, number], [number, number]];
interface ILineZoomRule {
  id: string;
  type: string;
  zoom: number;
}
interface IPointScaleOneZoom {
  zoom: number;
  fontSize: number;
  iconSize: number;
  fontOffset: [number, number];
}
interface IPointScale {
  start: IPointScaleOneZoom;
  end: IPointScaleOneZoom;
}
interface IPointZoomRule {
  id: string;
  type: string;
  lineId: string;
  zoom: number;
  scaleLinear?: IPointScale;
  /** 这个图标由状态决定，所以无法固定，需要代码逻辑去修改它 */
  icon?: string;
}
interface ILineOption {
  data: IGeoJson;
  legends: IColor[];
  zoomRules: ILineZoomRule[];
}
interface IPointOption {
  data: IGeoJson;
  zoomRules: IPointZoomRule[];
}
interface IGeoJson {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    properties: Record<string, any>;
    geometry: {
      type: 'Point' | 'LineString';
      coordinates: any[];
    };
  }[];
}

declare class PipeLine {
  _map: Map;
  _ready: boolean;
  _state: {
    timer_01: number;
    timer_02: number;
    imgCacheGp: Record<string, any>;
  };
  _markerData: IPointOption | undefined;
  _lineData: ILineOption | undefined;
  _config: IPipeLineOption;
  constructor(config: IPipeLineOption);
  _waitLayerLoaded(layerId: string): Promise<any>;
  _onZoomed(): void;
  _updateLineAndMarkerCurrentZoom(): void;
  _onMapLoad(): Promise<void>;
  _addRefreImg(): Promise<void>;
  clearLines(): this;
  clearPoints(): this;
  setLines(config: ILineOption): Promise<void>;
  _flickerLine(id: string, active: boolean): void;
  _topLayerClick(ev: MapMouseEvent, layerId: string): mapbox_gl.GeoJSONFeature[];
  _onMarkerClick(e: MapMouseEvent): void;
  setMarkers(config: IPointOption): Promise<void>;
  /**
   * 绘制椭圆合集
   * @param data
   */
  setEllipse(data: IEllipseItem[]): Promise<void>;
  setReferExtent(value: IExtentCoordinates): void;
  dispose(): void;
}

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsMapbox {
    export { IColor, ILineOption, IPointOption, IPointZoomRule, PipeLine };
  }
}

export default undefined;
