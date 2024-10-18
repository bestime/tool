import {
  Layer,
  VectorLayer,
  VectorLayerOptionsType,
  Map,
  Marker,
  Geometry,
  addGeometryFitViewOptions,
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

interface ILayerBasicStyle {
  backgroundColor: string;
  lineColor: string;
  lineWidth: number;
  fontColor: string;
  fontSize: number;
  fontHaloFill: string;
  fontHaloRadius: number;
}
declare class CityBoundry {
  _layer_01: VectorLayer;
  _layer_02: VectorLayer;
  _config: {
    backgroundLayerStyle: ILayerBasicStyle;
    frontLayerStyle: ILayerBasicStyle;
  };
  constructor(
    id: string,
    options: VectorLayerOptionsType,
    style: {
      backgroundLayerStyle: Partial<ILayerBasicStyle>;
      frontLayerStyle: Partial<ILayerBasicStyle>;
    }
  );
  setAreaCode(code: string): Promise<void>;
  setBackgroundAreaCode(code: string): Promise<void>;
  addTo(map: Map): void;
  clear(): void;
  dispose(): void;
}

interface TOffsetStyleMemberItem {
  zoom: number;
  textOpacity?: number;
  textOffset?: [number, number];
  textSize?: number;
  iconSize?: number;
  iconOpacity?: number;
}
type TOffsetStyleMap = {
  /** 分组配置，（此配置的显示隐藏优先级大于member） */
  group: Record<string, TOffsetStyleMemberItem[]>;
  /** 成员精细配置 */
  memember: Record<string, TOffsetStyleMemberItem[]>;
};
interface IOffsetLayerExtConfig {
  onGroupVisibleChange: (ids: string[]) => void;
}
/**
 * 缩放时，根据配置调整元素的位移、是否显示、大小等操作
 * 轻微绘制在此图层的元素，配置两个属性
 * 请使用这个图层的开发者，不要直接操作其中元素的show()、hide()
 * properties.offsetMemberId {boolean}用于精确定位到此元素（请保证此ID在此图层唯一）
 * properties.offsetMemberGroupId {?string}数据那个分组，自身的显示隐藏低于分组中的设置
 */
declare class OffsetLayer extends VectorLayer {
  _offsetStyle: TOffsetStyleMap | undefined;
  _showIds: string[];
  _config: IOffsetLayerExtConfig;
  _timer01: any;
  _editMarker: Marker | undefined;
  _editorContainer: HTMLDivElement | undefined;
  constructor(
    id: string,
    geometries: VectorLayerOptionsType | Array<Geometry>,
    options: VectorLayerOptionsType,
    config: IOffsetLayerExtConfig
  );
  _debHandlerResize(): void;
  _onZoomed(): void;
  _getConfig(
    Ogeometry: Geometry,
    currentZoom: number,
    showGroupIds: string[]
  ):
    | {
        parent: {
          id: string;
          hasRule: boolean;
          style: TOffsetStyleMemberItem | undefined;
        };
        self: {
          id: string;
          hasRule: boolean;
          style: TOffsetStyleMemberItem | undefined;
        };
        current: {
          id: string;
          hasRule: boolean;
          style: TOffsetStyleMemberItem | undefined;
        };
      }
    | undefined;
  _onReszie(): void;
  setActiveMememberIds(data: string[]): void;
  /**
   * 键值对数据
   * 键表示元素：properties.offsetMemberId
   */
  setOffsetStyle(data?: TOffsetStyleMap): this;
  editOffset(marker: Marker): void;
  addGeometry(
    geometries: Geometry | Array<Geometry>,
    fitView?: boolean | addGeometryFitViewOptions
  ): void;
  onAdd(): void;
  addTo(map: Map): this;
  clear(): this;
  remove(): this;
}

/**
 * 心跳线条（循环放大缩小效果）
 */
declare class HeartbeatLineString extends LineString {
  _testCount: number;
  _heartbeatConfig: {
    duration: number;
    isRestore: boolean;
    isMouseIn: boolean;
    originZindx: number;
    targetZindex: number;
    looping: boolean;
    originStyle: Record<string, any>;
    targetStyle: Record<string, any>;
  };
  _player: ReturnType<typeof this$1.animate> | undefined;
  constructor(
    coordinates: LineStringCoordinatesType,
    options: LineStringOptionsType & {
      targetWidth: number;
      duration: number;
    }
  );
  updateSymbol(symbol: any): this;
  _onMouseenter(): void;
  _onMouseout(): void;
  play(): this;
  playLoop(): void;
  playActive(): Promise<unknown>;
  playRestore(isMouse?: boolean): Promise<unknown>;
  remove(): this;
  /** maptalks的bug，需要清空this._animPlayer，不然有缓存 */
  _clearPlayer(): void;
  stopLoop(): this;
}

declare function export_default(staticBaseUrl: string): void;

export { BorderLayer, CityBoundry, HeartbeatLineString, OffsetLayer, export_default as default };

export default undefined;
