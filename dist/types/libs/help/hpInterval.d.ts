declare function add(handler: Function, interval: number): string;
declare function remove(id: string): void;
/** 自定义timer，用于工具内部方法使用，避免创建多个定时器 */
declare const _default: {
    add: typeof add;
    remove: typeof remove;
};
export default _default;
