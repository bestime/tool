import { variableHasValue } from "@bestime/utils_base";
import * as echarts from 'echarts';
import { debounce, throttle } from "lodash-es";

type EChartsOption = echarts.EChartsOption;
type ECharts = echarts.ECharts

/**
 * echart控制器
 * - 注意：一个控制器只能控制一个实例。如果绑定多个实例，只会控制最新绑定的那一个
 */
export class EasyEchartsController {  
  _isDispose = false
  private _options: EChartsOption | undefined
  private _iChart: ECharts | undefined

  constructor () {
    
  }

  _setChart (instance: ECharts) {
    this._iChart = instance

    if(this._options) {
      this.setOption(this._options)
    }    
  }

  setOption (options: EChartsOption) {    
    this._options = options
    
    if(!this._iChart || this._isDispose) return;
    this._iChart.setOption(options, false)
    return this;
  }

  clear () {
    this._options = undefined
    if(this._iChart) {
      this._iChart.clear()
    }
  }

  _dispose () {
    this._options = undefined
    this._isDispose = true
    if(this._iChart) {
      this._iChart.clear()
      this._iChart.dispose()
    }
    
  }
}
