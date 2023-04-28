/**
 * 简易版深度克隆。（仅处理数组、键值对、方法的可克隆）
 *
 * @param data - 克隆对象
 * @returns
 */
export default function cloneEasy<T extends [] | Record<any, any> | Function>(data: T): T;
