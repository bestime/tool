/// <reference path="../../../libs/help.d.ts" />
type TargetData = Record<string, any> | any[];
interface Options {
    string?: Boolean;
    array?: Boolean;
    kvPair?: Boolean;
}
/**
   * 移除无效数据，包括：空字符串，空对象，空数组。
   * 注：数组中的值不做处理，会影响数组长度
   *
   * @param data - 将数据进行树摇
   * @param options - 配置参数
   * @returns 树摇后的数据
   */
export default function shake<T extends TargetData>(data: T, options?: Options): BTDeepPartial<T>;
export {};
