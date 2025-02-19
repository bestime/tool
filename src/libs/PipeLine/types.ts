export interface IPipeLineOption {
  container: HTMLDivElement,
  onZoom?: (value: number) => void
  onLineSelect?: (properties: Record<string, any>) => void
  onPointSelect?: (properties: Record<string, any>, rule?: IPointZoomRule) => void  
  style: {
    backgroundColor?: string
    boundaryBorderColor?: string
    boundaryBorderWidth?: number
    boundaryBackgroundColor?: string
    boundaryBackgroundOpacity?: number
  },
  staticSource: {
    glyphs: string,
    boundaryGeojson: string,
  },
  referImage?: {
    url: string,
    coordinates: IExtentCoordinates,
    opacity: number
  }
}

export interface IEllipseItem {
  title: string
  subTitle: string
  center: [number, number]
  xSemiAxis: number,
  ySemiAxis: number,
  angle: number,
  steps: number,
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
  textColor: string
}


export interface IColor {
  id: string,
  label: string,
  color: string
}

export type IExtentCoordinates = [
  [number, number],
  [number, number],
  [number, number],
  [number, number],
]
export interface IPointType {
  id: string,
  label: string,
  icon: string
}

export interface ILineZoomRule {
  id: string,
  type: string,
  zoom: number,
}

export interface IPointScaleOneZoom {
  zoom: number,
  fontSize: number,
  iconSize: number,
  fontOffset: [number, number]
}

export interface IPointScale {
  start: IPointScaleOneZoom,
  end: IPointScaleOneZoom
}

export interface IPointZoomRule {
  id: string,
  type: string,
  lineId: string,
  zoom: number,
  
  scaleLinear?: IPointScale
  /** 这个图标由状态决定，所以无法固定，需要代码逻辑去修改它 */
  icon?: string
}

export interface ILineOption {
  data: IGeoJson,
  legends: IColor[],
  zoomRules: ILineZoomRule[]
}

export interface IPointOption {
  data: IGeoJson,
  zoomRules: IPointZoomRule[]
}

export interface IGeoJson {
  type: 'FeatureCollection',
  features: {
    type: 'Feature',
    properties: Record<string, any>
    geometry: {
      type: 'Point' | 'LineString',
      coordinates: any[]
    }
  }[]
}
