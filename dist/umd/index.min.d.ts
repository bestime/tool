import {
  Layer,
  VectorLayer,
  Map,
  VectorLayerOptionsType,
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
/**
 * 缩放时，根据配置调整元素的位移、是否显示、大小等操作
 * 轻微绘制在此图层的元素，配置两个属性
 * properties.offsetMemberId {boolean}用于精确定位到此元素（请保证此ID在此图层唯一）
 * properties.offsetMemberGroupId {?string}数据那个分组，自身的显示隐藏低于分组中的设置
 */
declare class OffsetLayer extends VectorLayer {
  _offsetStyle: TOffsetStyleMap | undefined;
  _showIds: string[];
  constructor(
    id: string,
    geometries: VectorLayerOptionsType | Array<Geometry>,
    options?: VectorLayerOptionsType
  );
  _onResize(): void;
  setActiveMememberIds(data: string[]): void;
  /**
   * 键值对数据
   * 键表示元素：properties.offsetMemberId
   */
  setOffsetStyle(data: TOffsetStyleMap): this;
  addGeometry(
    geometries: Geometry | Array<Geometry>,
    fitView?: boolean | addGeometryFitViewOptions
  ): void;
  onAdd(): void;
  addTo(map: Map): this;
  clear(): this;
  remove(): this;
}

declare class HeartbeatLineString extends LineString {
  constructor(coordinates: LineStringCoordinatesType, options?: LineStringOptionsType);
}

declare function export_default(staticBaseUrl: string): void;

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsMaptalks {
    export {
      BorderLayer,
      CityBoundry,
      HeartbeatLineString,
      OffsetLayer,
      export_default as default
    };
  }
}

export default undefined;
