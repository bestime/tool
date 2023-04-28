/**
 * 将树形结构转为一维数组
 * @param data - 树
 * @param childKey - 子项字段。默认 children
 * @returns 浅克隆的数组
 */
export default function flatTree(data: any[], childKey?: string): any[];
