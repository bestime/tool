import _KvPair from "./_KvPair";
import assign from "./assign";
import forEach from "./forEach"
import forEachTree from "./forEachTree"
import getUniqSessionId from "./getUniqSessionId";
import isNull from "./isNull"
import last from "./last"

interface IConfig {
  id: string;
  pid: string;
  children: string;
}

/**
 * 将树扁平化为一维结构。将会自动添加一下字段 $id, $pid, $isLeaf, $index, $level
 * @param tree 
 * @param config 
 * @returns 
 */
export default function flatTree (tree: any[], config?: Partial<IConfig>) {
  const _ = _KvPair(config)
  var id = _.id || 'id';
  var pid = _.pid || 'pid';
  var children = _.children || 'children';
  
  const result: any[] = []
  forEachTree(tree, function (item, parents, index) {
    item.$index = index
    if(isNull(item[pid])) {
      const paretItem = last(parents)
      item['$pid'] = isNull(paretItem) ? getUniqSessionId():paretItem[id]
    } else {
      item['$pid'] = item[pid]
    }
    item['$id'] = isNull(item[id]) ? getUniqSessionId() : item[id]
    item.$level = parents.length + 1
    result.push(item)
  }, children)

  forEach(result, function (item) {
    delete item[children]
  })

  return result
}