import trim from './trim';
import zeroTo2 from './help/hpZeroTo2';
import cloneEasy from './cloneEasy';
type ITimeLineUnints = Partial<[string, string, string, string, string, string, string]>;
function formatFunc(units: string[], unitIndex: number, data: number) {
  const item = units[unitIndex];
  let res = '';
  if (units[unitIndex] === undefined || units[unitIndex] === null) {
    res = '';
  } else {
    res = zeroTo2(data) + item;
  }
  return res;
}

function handleOne(startTime: any, endTime: any) {
  var refer = startTime.split[0];
  var modify = endTime.split[1];

  for (var a = 0; a < refer.length; a++) {
    if (refer[a] === modify[a]) {
      modify[a] = '';
    } else {
      break;
    }
  }
}

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
export default function timeLine(
  list: string[],
  units: [string, string, string, string, string, string, string]
): {
  /** 时间刻度文本 */
  label: string;
  /** 最小时间拆分项，可以此二次自定义封装不同业务 */
  split: ITimeLineUnints;
  /** 时间戳 */
  timestamp: number;
  /** 为改变的原始值 */
  value: string;
}[] {
  units = units || ['年', '月', '日 ', '时', '分', '秒', '毫秒'];
  var result: any[] = [],
    item: any,
    date: any;
  for (var a = 0; a < list.length; a++) {
    date = new Date(list[a]);
    var fmt = [
      formatFunc(units, 0, date.getFullYear()),
      formatFunc(units, 1, date.getMonth() + 1),
      formatFunc(units, 2, date.getDate()),
      formatFunc(units, 3, date.getHours()),
      formatFunc(units, 4, date.getMinutes()),
      formatFunc(units, 5, date.getSeconds()),
      formatFunc(units, 6, date.getMilliseconds())
    ];

    result.push({
      value: list[a],
      timestamp: +date,
      split: [fmt, cloneEasy(fmt)]
    });
  }

  result.sort(function (a, b) {
    return a.millisecond - b.millisecond;
  });

  for (var a = 1; a < result.length; a++) {
    handleOne(result[a - 1], result[a]);
  }

  for (var a = 0; a < result.length; a++) {
    item = result[a];
    item.split = item.split[1];
    item.label = trim(item.split.join(''));
  }

  return result;
}
