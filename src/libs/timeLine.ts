import simpleClone from './help/simpleClone';
import trim from './trim';
import zeroTo2 from './help/zeroTo2';

function formatFunc(units: string[], unitIndex: number, data: number) {
  const item = units[unitIndex];
  let res = item === '' ? '' : zeroTo2(data) + item;
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
 * 格式化时间轴
 * @param {Array} list时间列表
 * @return {Array}
 */
export default function timeLine(
  list: string[],
  units: [string, string, string, string, string, string, string]
): any[] {
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
      split: [fmt, simpleClone(fmt)]
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
