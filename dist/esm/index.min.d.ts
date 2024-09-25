import { Layer } from 'maptalks';

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

export { BorderLayer };

export default undefined;
