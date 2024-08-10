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
export type TKvPair = Record<string | number | symbol, any>;

export type TValueOf<T> = T[keyof T]

/** 将部分字段设为可选 */
export type FieldsPartial<T, Union extends keyof T> = Omit<T, Union> & Partial<Pick<T, Union>>;

