import cloneEasy from './cloneEasy';




export default function  dataPage<T> (data: T[], pageSize: number, pageCurrent: number) {
  if (pageCurrent < 1) throw '页码必须大于0';
  const startIndex = (pageCurrent - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const result = {
    current: pageCurrent,
    total: data.length,
    size: pageSize,
    pages: Math.ceil(data.length / pageSize),
    data: cloneEasy(data.slice(startIndex, endIndex))
  };

  return result;
};
