import cloneEasy from "./cloneEasy"
import forEachTree from "./forEachTree"
import formatTime from "./formatTime"
import tree from './tree'
import trim from "./trim"

interface LogItem {
  id: string
  time: string,
  pid?: string
  title: string
  data?: string
}

let _rid = 0
const recordMap: LogItem[] = []


function wirteOneRecord (title: string, data?: string, pid?: string) {
  const id = createId()
  const time = formatTime(new Date().getTime())
  recordMap.push({
    time: time,
    id,
    pid,
    title,
    data
  })

  console.log("%c 写入日志", 'background:#dd4215;color:white;font-size:12px;border-radius:4px;padding: 2px 4px 2px 0', `${time} →`, title)
  return id
}

function createId () {
  return `L${++_rid}`
}

export default function logRecord (title: string, data?: string) {
  const pid = wirteOneRecord(title, data, '')

  function add (title: string, data?: string) {
    wirteOneRecord(title, data, pid)
  }

  return add
}

export function logExport () {  
  const logTree = tree(cloneEasy(recordMap), {
    id: 'id',
    pid: 'pid',
    children: 'children'
  })

  forEachTree<LogItem[]>(logTree, function (item) {
    // @ts-ignore
    item.children?.sort(function (a, b) {
      return new Date(a.time).getTime() - new Date(b.time).getTime()
    })
  })
  
  return {
    flatList: cloneEasy(recordMap),
    treeList: logTree
  }  
}