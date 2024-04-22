import forEachTree from "./forEachTree"
import type { TKvPair } from "./help/type-declare"

interface IListGroupKeys {
  fields: string[],
  child?: IListGroupKeys
}
interface IListGroupOption {
  keys: IListGroupKeys
}

type TInnerGroup<T> = Record<string, {
  name: string,
  data: T[],
  child: TInnerGroup<T>
}>

function getUniqId (fields: string[], item: TKvPair) {
  const id: string[] = []
  fields.forEach(function (k) {
    id.push(item[k])
  })
  return id.join('→')
}

type TInnerGroupListItem<T extends TKvPair> = {
  name: string,
  data: T[],
  columns: Record<string, T[]>,
  isLeaf: boolean
  children: TInnerGroupListItem<T>[]
}

function _rowToColumn <T extends TKvPair>(data: T[], fields: string) {
  const _map: Record<string, T[]> = {}

  data.forEach(function (item) {
    const key = item[fields]
    _map[key] = _map[key] || []
    _map[key].push(item)
  })


  return _map
}
function _groupToList<T extends TKvPair>(data: TInnerGroup<T>, deps: number, currentDeps: number) {
  const result: TInnerGroupListItem<T>[] = []
  
  for(let key in data) {
    const isLeaf = deps === currentDeps
    const children = _groupToList(data[key].child, deps, currentDeps+1)
    
    result.push({
      name: data[key].name,
      data: data[key].data,
      columns: _rowToColumn(data[key].data, 'metaCode'),
      isLeaf,
      children
    })
  }
  return result
}

function deepGroup<T extends TKvPair> (data: T[], options: IListGroupOption) {
  const result: TInnerGroup<T> = {}
  let deps = 0

  function handler (keys: IListGroupKeys, gp: TInnerGroup<T>, children: T[]) {
    for(let index = 0; index<children.length; index++) {
      const item = children[index]
      const uid = getUniqId(keys.fields, item)
      gp[uid] = gp[uid] || {
        name: uid,
        data: [],
        child: {}
      }
      gp[uid].data.push(item) 
      children.splice(index--, 1)
    }
  
    
    if(keys.child) {
      deps++
      for(let key in gp) {
        handler(keys.child, gp[key].child, gp[key].data)
      }
      
    }
  }

  handler(options.keys, result, data)

  return _groupToList(result, deps, 0)
}



export default function listGroup<T extends TKvPair> (data: T[], options: IListGroupOption) {
  const result = deepGroup(data, options);

  return result
}

// listGroup([], {
//   keys: {
//     fields: ['steamCoal'],
//     child: {
//       fields: ['yearBy']
//     }
//   }
// })