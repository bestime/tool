import deepFindItem from "./deepFindItem"
import _Array from "./_Array"
import _Object from "./_Object"



/*


var nodes = [
  // {"dataId":'0',"parentId":'null',"name":"总父级"},
  {"dataId":'23.2',"parentId":'23',"name":"2-3-2"},
  {"dataId":'13.1',"parentId":'13',"name":"1-3-1"},
  {"dataId":'1',"parentId":'0',"name":"1","open":true},
  {"dataId":'11',"parentId":'1',"name":"1-1"},
  {"dataId":'12',"parentId":'1',"name":"1-2"},
  {"dataId":'13',"parentId":'1',"name":"1-3"},
  




  {"dataId":'2',"parentId":'0',"name":"2"},
  {"dataId":'21',"parentId":'2',"name":"2-1","open":true},
  {"dataId":'22',"parentId":'2',"name":"2-2"},
  {"dataId":'23',"parentId":'2',"name":"2-3"},
  {"dataId":'23.1',"parentId":'23',"name":"2-3-1"},
  {"dataId":'22.1',"parentId":'22',"name":"2-2-1"},
  {"dataId":'22.1.1',"parentId":'22.1',"name":"2-2-1-1"},

  {"dataId":'3',"parentId":'0',"name":"3"},
  {"dataId":'23.3',"parentId":'23',"name":"2-3-3"},

  
];

// nodes.reverse()


const treeList = flatArrayToTree(nodes, {
  id: 'dataId',
  pid: 'parentId',
  children: 'childList'
})
console.log(treeList)


*/








/**
 * 一维数组转树形解构 （不限层级）
 * 注：需要输出字段转化的，请提前自行处理，此方法只负责转tree结构
 * 
 * @param {Array} list 需要转化的一维数组
 * @param {Object} [props=defaultProps] 配置项。可配置[id, pid, children]
 * @return {Array} treeList
*/
export default function flatArrayToTree (list, props) {
  props = _Object(props)
  var id = props.id || 'id'
  var pid = props.pid || 'pid'
  var children = props.children || 'children'

  for (var a = 0, item, father; a < list.length; a++) {
    var item = list[a]
    item[children] = _Array(item[children])
    father = deepFindItem(list, function (c) {
      return c[id] != null && c[id] != item[id] && c[id] === item[pid]
    }, children)
    
    if (father) {
      father[children] = _Array(father[children])
      father[children].push(item)
      list.splice(a--, 1)
    }
  }

  return list
}