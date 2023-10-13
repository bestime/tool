/**
 * 强制转化数据为字符串
 * @param data - 处理的值
 * @returns 实际值2
 */
declare function _String(data: any): string;

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsBase {
    export { _String };
  }
}

export default undefined;
