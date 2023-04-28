/** 数据缓存工具提供的方法 */
interface IdataCacheCAllback {
    /** 检查对应url是否已经有缓存标记 */
    isExist: () => boolean;
    /**
     * 为对应url设置缓存树
     * @param data - 缓存的数据
     */
    set: (data: any) => void;
    /**
     * 获取缓存数据
     * @param success - 回调函数
     */
    get: (success: (data: any) => void) => void;
    logs: Record<string, any>;
}
/**
   * 对相同地址的数据进行缓存
   * @param url - 请求地址
   * @returns 处理工具
   */
export default function dataCacheUtil(url: string): IdataCacheCAllback;
export {};
