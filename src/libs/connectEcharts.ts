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
  onAxxisCategoryClick?:(ev: any) => void
}

class ConnectEcharts {

  _list: Record<string, IListItem[]> = {}
  
  constructor () {}


  _resetGroupClickXAxisCategory (chartList: IListItem[]) {
    chartList.forEach(item => {
      item.instence.off('click', item.onAxxisCategoryClick)
      item.onAxxisCategoryClick = (ev: any) => {
        const tickIndex = ev.tickIndex as number
        chartList.forEach(function (c) {
          const d = _templateAxxisCategoryClick(c.instence, tickIndex)
          d && c.config && c.config.onXAxisCtegoryClick && c.config.onXAxisCtegoryClick(d.map(c=>c.data), tickIndex, c.instence)
        })
      }
      item.instence.on('click', 'xAxis.category', item.onAxxisCategoryClick)
      
    })
  }

  clickXAsisCategory (chart: TEcharts, index: number) {
    for(let key in this._list) {
      for(let i =0;i<this._list[key].length;i++) {
        const item = this._list[key][i]
        if(item.instence === chart) {
          item.onAxxisCategoryClick && item.onAxxisCategoryClick({
            tickIndex: index
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
      instence: i
    })
    this._resetGroupClickXAxisCategory(this._list[gid])
    return this
  }

  remove (chart?: TEcharts) {
    if(!chart) return;
    for(let key in this._list) {
      for(let i =0;i<this._list[key].length;i++) {
        const item = this._list[key][i]
        if(item.instence === chart) {
          item.instence.off('click', item.onAxxisCategoryClick)
          this._list[key].splice(i--, 1)
        }
      }
    }
  }
}

export default new ConnectEcharts()