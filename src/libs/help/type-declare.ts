/**
   * 递归将所有属性改为可选
   */
export type BTDeepPartial<T = any> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends object
    ? BTDeepPartial<T[P]>
    : T[P];
};

/**
   * 键值对格式的数据
   * */
export type IKvPair = Record<string, any>;



