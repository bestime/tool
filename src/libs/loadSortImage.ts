import { _Array, arrayRemove, forEach } from "@bestime/utils_base"

interface IImgItem {
  id: string
  el: HTMLImageElement,
  src: string
  status: 0 | 1 | 2
}



const groupMap: Record<string, ReturnType<typeof refactor>> = {}

function refactor(groupName: string) {
  const record:Array<undefined | Array<IImgItem>> = []

  /**
   * 
   * @param el 图片dom
   * @param src 图片地址
   * @param sort 必须大于等于0 
   */
  function add (id: string, el: HTMLImageElement, src: string, sort: number) {
    remove(id, sort)
    record[sort] = _Array(record[sort])
    record[sort]!.push({
      id,
      el,
      src,
      status: 0
    })
    tryNext()

  }

  function remove (id: string, sort: number) {
    const currentSortImgs = record[sort]
    if(!currentSortImgs) return;
    arrayRemove(currentSortImgs, function (c) {
      return c.id === id
    })
    // console.log("一处结果", record)
    tryNext()
  }

  // 清除成功的数据
  function clearStatus2 () {
    forEach(record, function (sortList) {
      if(sortList) {
        arrayRemove(sortList, function(c) {
          return c.status === 2
        })
      }      
    })
  }



  function tryNext() {
    clearStatus2()
    const currentSortImgs = record.find(c=>c && c.length)
    if(!currentSortImgs) return;
    for(let index =0;index<currentSortImgs.length; index++){
      const item = currentSortImgs[index]
      if(!item) continue;
      if(!item.el) {
        item.status = 2
      }
      
      item.status = 1
      item.el.onload = function () {
        item.status = 2
        // console.log("加载成功", record)
        tryNext()
      }
      item.el.src = item.src
    }
  }

  return {
    add,
    remove
  }
}

export default function loadSortImage (groupName: string, imgId: string, el:HTMLImageElement, src: string, sort: number) {
  // console.log("新增图片", arguments)
  
  if(!groupMap[groupName]) {
    groupMap[groupName] = refactor(groupName)
  }

  const handler = groupMap[groupName]

  handler.add(imgId, el, src, sort)

  return handler
}