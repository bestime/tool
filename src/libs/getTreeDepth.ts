import isNull from "./isNull"
interface ITreeItem {
  [key: string]: any
  children?: ITreeItem[]
}

export default function getTreeDepth (data: ITreeItem[], count?: number) {  
  count = isNull(count) ? 1 : count
  const next = count + 1
  for(let a=0;a<data.length;a++) {
    const item = data[a]
    if(!isNull(item.children)) {
      const c = getTreeDepth(item.children, next)
      count = Math.max(count, c)
    }
  }
  return count
}