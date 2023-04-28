type ITimeLineUnints = Partial<[string, string, string, string, string, string, string]>;
/**
 * 时间轴刻度格式化
 * @param list - 时间列表
 * @param units - 自定义单位。默认 ['年', '月', '日 ', '时', '分', '秒', '毫秒']。可以空字符串
 * @returns 格式化后的数组
 *
 * @example
 *```javascript
 *const data = [
 *  '2022-04-10 12:10:20',
 *  '2022-04-10 12:11:20',
 *  '2022-04-10 12:12:20',
 *  '2022-04-10 13:00:20',
 *  '2022-04-10 13:01:20',
 *  '2022-04-10 13:05:20',
 *  '2022-04-11 00:00:00',
 *  '2022-04-11 01:00:00',
 *  '2022-04-11 02:00:00',
 *  '2022-05-01 00:00:00',
 *  '2022-05-02 00:00:00',
 *];
 *const timeList = timeLine(data, ['年', '月', '日 ', '时', '分', '秒', '毫秒'])
 *```
 */
export default function timeLine(list: string[], units: [string, string, string, string, string, string, string]): {
    /** 时间刻度文本 */
    label: string;
    /** 最小时间拆分项，可以此二次自定义封装不同业务 */
    split: ITimeLineUnints;
    /** 时间戳 */
    timestamp: number;
    /** 为改变的原始值 */
    value: string;
}[];
export {};
