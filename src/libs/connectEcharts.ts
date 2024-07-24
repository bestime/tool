import cloneEasy from "./cloneEasy"
import isArray from "./isArray"

type TEcharts = Record<string, any>
interface IConnectConfigItem {
  onXAxisCtegoryClick?: (xAxisData: any[], tickIndex: number, chart: TEcharts) => void
}



function _templateAxxisCategoryClick (iChart: TEcharts, tickIndex: number): Array<any> | undefined {
  const newOption = cloneEasy(iChart.getOption())
  if(!newOption) return;
  if(!isArray(newOption.xAxis)) return void 0;
  const colorList: string[] = []
  const splitAreaList = []
  newOption.xAxis.forEach(function (xAxis: any) {
    xAxis.data.forEach(function (item: any, idx: number) {
      item.defaultTextStyle = item.defaultTextStyle ?? item.textStyle
      if(idx === tickIndex) {
        colorList.push('rgba(255,255,255,0.2)')
        item.textStyle = item.activeTextStyle
        
      } else {
        colorList.push('transparent') 
        item.textStyle = item.defaultTextStyle
      }
    })
    
    xAxis.splitArea = {
      show: true,
      areaStyle: {
        color: colorList
      }
    }
  })
  
  iChart.setOption({
    xAxis: newOption.xAxis
  })

  return newOption.xAxis
  // this.$emit('on:click:xAxis:category', ev.tickIndex, newOption.xAxis)
  
  // this.dispatchAction({
  //   type: 'click.xAxis.category',
  //   dataIndex: 1
  // })
}

interface IListItem {
  config?: IConnectConfigItem
  instence: TEcharts,
  onAxxisCategoryClick?:(ev: {
    tickIndex: number
    needEmit?: boolean,
  }) => void,
  onAxxisSeriesClick?:(ev: any) => void,
  timer_01: any
}

class ConnectEcharts {

  _list: Record<string, IListItem[]> = {}
  
  constructor () {}


  _resetGroupClickXAxisCategory (chartList: IListItem[]) {
    chartList.forEach(item => {
      clearTimeout(item.timer_01)
      item.instence.off('click', item.onAxxisSeriesClick)
      item.instence.off('click', item.onAxxisCategoryClick)
      
      item.onAxxisCategoryClick = (ev) => {
        const tickIndex = ev.tickIndex
        const needEmit = ev.needEmit !== false
        clearTimeout(item.timer_01)
        item.timer_01 = setTimeout(() => {
          chartList.forEach(function (c) {
            const d = _templateAxxisCategoryClick(c.instence, tickIndex)
            needEmit && d && c.config && c.config.onXAxisCtegoryClick && c.config.onXAxisCtegoryClick(d.map(c=>c.data), tickIndex, c.instence)
          })
        }, 30)
      }

      item.onAxxisSeriesClick = (ev: any) => {
        if(ev.componentType !== 'markLine' && item?.onAxxisCategoryClick) {
          item.onAxxisCategoryClick({
            tickIndex: ev.dataIndex
          })
        }
      }

      item.instence.on('click', 'series', item.onAxxisSeriesClick)
      item.instence.on('click', 'xAxis.category', item.onAxxisCategoryClick)
      
    })
  }

  clickXAsisCategory (chart: TEcharts, index: number, notEmit?: boolean) {
    const needEmit = notEmit !== true
    // console.log("needEmit", needEmit)
    for(let key in this._list) {
      for(let i =0;i<this._list[key].length;i++) {
        const item = this._list[key][i]
        if(item.instence === chart) {
          item.onAxxisCategoryClick && item.onAxxisCategoryClick({
            tickIndex: index,
            needEmit
          })
        }
      }
    }
  }

  add (i: TEcharts, config: IConnectConfigItem) {
    const gid = i.group as string
    if(!gid) return this;
    this._list[gid] = this._list[gid] || []
    this._list[gid].push({
      config,
      instence: i,
      timer_01: -1
    })
    this._resetGroupClickXAxisCategory(this._list[gid])
    return this
  }

  remove (chart?: TEcharts) {
    if(!chart) return;
    for(let key in this._list) {
      for(let i =0;i<this._list[key].length;i++) {
        const item = this._list[key][i]
        clearTimeout(item.timer_01)
        if(item.instence === chart) {
          item.instence.off('click', item.onAxxisCategoryClick)
          this._list[key].splice(i--, 1)
        }
      }
    }
  }
}

export default new ConnectEcharts()