export default function clean<T extends any[] | {
    [key: string]: any;
    [key: number]: any;
}>(data: T, removeEmptyStr?: boolean, removeEmptyObject?: boolean): T;
