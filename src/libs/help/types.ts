/**
 * 将部分属性变为可选
 */
export type TPartialOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;