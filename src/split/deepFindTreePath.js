import assign from "./assign";

const DEFAULT_CONFIG = {
  id: "id",
  children: "children",
  pid: "pid",
};

export default function deepFindTreePath (tree, func, config) {
  config = assign(DEFAULT_CONFIG, config);
  const path = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;

  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children] && list.unshift(...node[children]);
      path.push(node);
      if (func(node)) return path;
    }
  }
  return null;
}
