/**
 * 查找某个元素所在树的所有父链
 * @param tree - 数据
 * @param handler - 验证回调
 * @param config - 字段映射配置。
 * @returns 查找的结果
 */
export default function deepFindTreePath(tree: any[], handler: (item: any) => boolean, config: {
    id: string;
    children: string;
}): undefined | any[];
