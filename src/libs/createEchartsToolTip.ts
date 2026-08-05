import { isEmpty } from "@bestime/utils_base"
import createStyle from "./createStyle"
const oStyle = createStyle('bt-echartstooltip')

oStyle(`
.g-echarts-tool-tip {background: transparent;padding:10px;}
.g-echarts-tool-tip em {width: 10px;height: 10px;margin: 0 5px 0 0;border-radius: 50%;}
.g-echarts-tool-tip h4 {font-weight: normal;font-size: 14px;}
.g-echarts-tool-tip h5 {font-weight: normal;font-size: 14px;}
.g-echarts-tool-tip p {padding: 0 0 0 15px;gap: 4px;}
.g-echarts-tool-tip b {font-size: 14px;}
.g-echarts-tool-tip i {font-size: 12px;font-style:normal;}
.g-echarts-tool-tip ul {gap: 4px;list-style:none;}
.g-echarts-tool-tip li {line-height: normal;list-style:none;}
`)


interface ICustomEchartsTooltip {
  /** 根节点className */
  rootClassName?: 'g-echarts-tool-tip',
  /** 标题 */
  title: string,
  /** 子标题 */
  subTitle?: string,

  /** 列表项 */
  list: Array<{
    color: string
    name: string
    value: string,
    unit?: string
  }>
}




/**
 * 自定义echarts的tooltip。对标题，值、单位的个性化。需要自行实现样式。默认根节点类名为 g-echarts-tool-tip
 * @param res 组装的数据
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

  const subTitleHtml = res.subTitle ? `<h5>${res.subTitle}</h5>` : ''
  return `<div class="${rootClassName}">
    <div class="jy-flex jy-items-center jy-gap-10">
      <h4 class="jy-reset">${res.title}</h4>
      ${subTitleHtml}      
    </div>
    <ul class="jy-mt-10 jy-flex-col">${_html_lis.join('')}</ul>
  </div>`
}

