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
  private _isDispose = false
  private _options: EChartsOption | undefined
  private _iChart: {
    id: string,
    instance: ECharts
  }[] = []
  private count = {
    option: Number.MIN_SAFE_INTEGER
  }
  constructor () {
    this.setOption = debounce(this.setOption.bind(this), 100)
  }

  _setChart (id: string, instance: ECharts) {
    if(!this._iChart.some(c=>c.id === id)) {
      this._iChart.push({
        id,
        instance
      })
    }

    if(this._options) {
      this.setOption(this._options)
    }    
  }

  setOption (options: EChartsOption) {
    
    this._options = options
    const sortId = ++this.count.option    
    if(sortId !== this.count.option || !this._iChart || this._isDispose) return;    
    this._iChart.forEach(function (vm) {
      vm.instance.setOption(options, false)
    })
    return this;
  }

  clear () {
    this._iChart.forEach(function (vm) {
      vm.instance.clear()
    })
  }

  _dispose (id: string) {
    this._isDispose = true
    // @ts-ignore
    this.setOption?.cancel?.()
    for(let index = 0; index<this._iChart.length; index++) {
      const vm = this._iChart[index]
      if(vm.id === id) {
        vm.instance.clear()
        vm.instance.dispose()
        this._iChart.splice(index--, 1)
      }      
    }
  }
}
