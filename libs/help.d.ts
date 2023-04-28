/**
   * 递归将所有属性改为可选
   */
declare type BTDeepPartial<T = any> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends object
    ? BTDeepPartial<T[P]>
    : T[P];
};

/**
   * 键值对格式的数据
   * */
declare type IKvPair = Record<string, any>;

