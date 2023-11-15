import { $browserGlobal} from './help/hpConsts';

/**
 * 移除Dom节点
 * @param ev - 事件
 * @param bubble - 阻止冒泡. 默认 true
 * @param stop - 阻止穿透. 默认 true
 */
export default function prevent(ev: Event, bubble: boolean, stop: boolean) {

  ev = ev || $browserGlobal.event;
  bubble = bubble === false ? false : true;
  stop = stop === false ? false : true;
  bubble && $browserGlobal.event
    ? ($browserGlobal.event.cancelBubble = true)
    : ev.stopPropagation();
  stop && $browserGlobal.event ? ($browserGlobal.event.returnValue = false) : ev.preventDefault();
}
