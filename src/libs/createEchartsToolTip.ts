import { isEmpty } from "@bestime/utils_base"

interface ICustomEchartsTooltip {
  /** 根节点className */
  rootClassName?: 'g-echarts-tool-tip',
  /** 标题 */
  title: string,

  /** 列表项 */
  list: Array<{
    color: string
    name: string
    value: string,
    unit?: string
  }>
}



/*默认样式


.g-echarts-tool-tip {
  em {
    width: 10px;
    height: 10px;
    margin: 0 5px 0 0;
    border-radius: 50%;
  }
  h4 {
    font-weight: normal;
  }
  p {   
    padding: 0 0 0 15px;
    gap: 4px;
  }
  b {
    font-size: 14px;
  }
  i {
    font-size: 12px;
  }
  ul {
    gap: 4px;
  }
  li {
    line-height: normal;
  }
}

*/

/**
 * 自定义echarts的tooltip。对标题，值、单位的个性化。需要自行实现样式。默认根节点类名为 g-echarts-tool-tip
 * @param res 
 * @returns 
 */
export default function createEchartsToolTip (res: ICustomEchartsTooltip) {
  const rootClassName = res.rootClassName || 'g-echarts-tool-tip'
  const _html_lis = res.list.map(function (item) {
    const fmtVal = isEmpty(item.value) ? '-' : item.value
    const fmtUnit = isEmpty(item.value) ? '' : item.unit
    return `<li class="jy-flex jy-items-center">
      <em style="background:${item.color};"></em>
      ${item.name}
      <p class="jy-ml-auto jy-flex jy-items-center">
        <b>${fmtVal}</b>
        <i class="jy-reset">${fmtUnit}</i>
      </p>
    </li>`
  })
  return `<div class="${rootClassName}">
    <div class="jy-flex jy-items-center jy-gap-10">
      <h4 class="jy-reset">${res.title}</h4>

    </div>
    <ul class="jy-mt-10 jy-flex-col">${_html_lis.join('')}</ul>
  </div>`
}

