/// <reference path="../../../libs/help.d.ts" />
/**
 * 树形结构map新数据
 * @param data - 原始树
 * @param childKeyTo - 转换的孩子键
 * @param handle - 迭代方法。这里不用返回子节点
 * @param childKeyFrom - 原始数据的孩子键
 * @returns 转变后的新数据
 */
declare function main<T extends IKvPair, K extends IKvPair, C extends keyof T>(data: K[], childKeyTo: C, handle: (data: K) => Omit<T, C>, childKeyFrom?: keyof K): T[];
export default main;
