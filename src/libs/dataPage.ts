import cloneEasy from './cloneEasy';




/**
   * 前端将数组进行模拟分页处理
   * @param data - 所有数据
   * @param pageSize - 每页多少条
   * @param pageCurrent - 当前页
   * @returns 分页数据
   */
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
