/**
 * 一维数组转树结构
 * @param list - 待转数组
 * @param props - 生成数据的配置项
 * @param props.id - ID字段
 * @param props.pid - 父ID字段
 * @param props.children - 子项字段
 * @returns 结果
 */
export default function flatArrayToTree(list: any[], props?: {
    id?: string;
    pid?: string;
    children?: string;
}): any[];
