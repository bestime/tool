
function cloneSimple<T> (data: T): T {
  let res = JSON.stringify(data)
  return JSON.parse(res)
}


const DEFAULT_CONFIG = {
  id: "id",
  children: "children"
};

export default function deepFindTreePath (
  tree: any[],
  handler: (item: any) => boolean,
  config: {
    id: string,
    children: string
  }
) {
  config = Object.assign(DEFAULT_CONFIG, config);
  const path = [];
  const list = cloneSimple(tree);
  const visitedSet = new Set();
  const { children } = config;

  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && list.unshift.apply(list, node[children]);
      path.push(node);
      if (handler(node)) return path;
    }
  }
  return null;
}
