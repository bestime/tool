import isArray from './isArray';

const main: typeof bestime.forEachTree = function (data, handle, childKey) {
  childKey = childKey || 'children';
  (function handleOneList(list) {
    for (let index = 0; index < list.length; index++) {
      handle(list[index]);
      if (isArray(list[index][childKey])) {
        handleOneList(list[index][childKey]);
      }
    }
  })(data);
};

export default main;
