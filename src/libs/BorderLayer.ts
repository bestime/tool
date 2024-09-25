import { Layer, renderer } from 'maptalks'

interface IBorderLayerConfig {
  borderColor: string,
  borderWidth: string,
  backgroundColor: string,
}

/**
 * maptalks的border图层，用于给地图绘制边框，可以导出带边框的图片（如果不需要导出，大可使用css）
 */
class BorderLayer extends Layer {
  _config: IBorderLayerConfig;
  // 构造函数
  constructor(id: string, config:IBorderLayerConfig, layerOption: Record<string, any>) {
    super(id, layerOption);
    this._config = config
  }

  getConfig() {
    return this._config;
  }
}

class BorderLayerRenderer extends renderer.CanvasRenderer {
  checkResources() {
    return [];
  }

  draw() {          
    this._drawData();
    this.completeRender();
  }

  drawOnInteracting() {
    this.draw();
  }

  /**
  * 绘制数据
  */
  _drawData() {          
    const config = this.layer.getConfig()
    const map = this.getMap();
    const size = map.getSize()
    this.prepareCanvas();
    const ctx = this.context;

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0,0,size.width,size.height);
    ctx.lineWidth=config.borderWidth;
    ctx.strokeStyle=config.borderColor;
    ctx.strokeRect(0,0,size.width,size.height);
  }
}

BorderLayer.registerRenderer('canvas', BorderLayerRenderer);

export default BorderLayer