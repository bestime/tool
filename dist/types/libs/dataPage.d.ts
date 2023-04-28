/**
   * 前端将数组进行模拟分页处理
   * @param data - 所有数据
   * @param pageSize - 每页多少条
   * @param pageCurrent - 当前页
   * @returns 分页数据
   */
export default function dataPage<T>(data: T[], pageSize: number, pageCurrent: number): {
    current: number;
    total: number;
    size: number;
    pages: number;
    data: T[];
};
