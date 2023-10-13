/**
 * 获取浏览器窗口尺寸
 */
declare function getWindowSize(): {
  width: number;
  height: number;
};

declare function test(data: number): string;

declare global {
  /**
   * 该声明文件用于全局声明（不用npm安装时拷贝到项目中直接使用）
   */
  namespace jUtilsBrowser {
    export { getWindowSize, test };
  }
}

export default undefined;
