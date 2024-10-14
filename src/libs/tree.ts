import deepFindItem from './deepFindItem';
import _Array from './_Array';
import _KvPair from './_KvPair';

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
 * 一维数组转树结构。（会改变源数组，如有需要，请提前clone）
 * @param list - 待转数组
 * @param props - 生成数据的配置项
 * @param props.id - ID字段
 * @param props.pid - 父ID字段
 * @param props.children - 子项字段
 * @returns 结果
 */
export default function flatArrayToTree(
  list: any[],
  props?: {
    id?: string;
    pid?: string;
    children?: string;
  }
): any[] {
  props = _KvPair(props);
  var id = props.id || 'id';
  var pid = props.pid || 'pid';
  var children = props.children || 'children';

  for (var a = 0, item: any, father; a < list.length; a++) {
    var item = list[a];
    // item[children] = _Array(item[children]);
    father = deepFindItem(
      list,
      function (c) {
        return c[id] != null && c[id] != item[id] && c[id] === item[pid];
      },
      children
    );

    if (father) {
      father[children] = _Array(father[children]);
      father[children].push(item);
      list.splice(a--, 1);
    }
  }

  return list;
}
