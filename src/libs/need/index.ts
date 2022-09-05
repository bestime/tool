import isEmptyMap from "../isEmptyMap";
import isFunction from "../isFunction";
import urlToGet from "../urlToGet";
import variableHasValue from "../variableHasValue";
import getfile from "./getfile";
import { $browserGlobal, $undefinedValue } from '../help/hpConsts'

type loadCallback = (...data: number[]) => void

function defaultCallback () {}




let _setting: Record<string, bestime.need.INeedConfigAliasItem> = {};
let times = 0;
let oHead = document.getElementsByTagName("head")[0];

type innterItem = bestime.need.INeedConfigAliasItem & {
  /** 是否请求完毕（无论成功失败） */
  _complete?: boolean;

  /** 内部使用：同步依赖是否已经请求 */
  _withIsLoad?: boolean;

  /** 内部使用：异步依赖是否已经请求 */
  _depenIsLoad?: boolean;

  /** 内部使用：分组ID（方便调试）。第一位表示发起的请求分组，大小表示先后顺序。第二位表示此组中的依赖关系，值越大越先请求 */
  _deeps?: string;

  /** 内部使用：被请求次数 */
  _count?: number;
}



function getMuti(
  times: number,
  id: number,
  alias: string[],
  callback: (...args: any[]) => void
) {
  const result: any[] = [];
  let flag = 0;
  for (let a = 0; a < alias.length; a++) {
    getOne(times, id, alias[a], function (res) {
      result[a] = res;
      if (++flag === alias.length) {
        callback.apply($undefinedValue, result);
      }
    });
  }
}

function getOne(
  times: number,
  id: number,
  aliasName: string,
  callback: (data?: any) => void
) {
  const item: undefined | innterItem = _setting && _setting[aliasName];
  
  if (!item) {
    throw `alias \"${aliasName}" is not configured`
  }  

  const isJsFile = /^js/.test(aliasName);

  function onSuccess() {
    if(item) {
      item._complete = true;
      if (!isFunction(callback)) return;
      if (isJsFile) {
        callback(item.moduleName ? $browserGlobal[item.moduleName as any] : undefined);
      } else {
        callback();
      }
    }    
  }

  // 如果已经存在，则等待
  if (item._count && item._count > 0) {
    variableHasValue(function () {
      return item._complete;
    }, onSuccess);
  }
  // 如果存在依赖文件
  else if (
    !item._depenIsLoad &&
    item.dependencies &&
    item.dependencies.length > 0
  ) {
    item._depenIsLoad = true;
    getMuti(times, id + 1, item.dependencies, function () {
      getOne(times, id, aliasName, onSuccess);
    });
  }
  // 可以同步加载的依赖
  else if (!item._withIsLoad && item.with && item.with.length > 0) {
    item._withIsLoad = true;
    getMuti(times, id, item.with.concat(aliasName), onSuccess);
  }
  // 无任何依赖，则创建新请求
  else {
    item._count = item._count ? item._count + 1 : 1;
    item._deeps = `${times}.${id}`;
    const fileType = isJsFile ? "script" : "link";
 
    
    getfile(item._deeps, oHead, fileType, item.url, onSuccess);
  }
}

function loadJsAndCss(alias: string[], callback?: loadCallback) {
  callback = callback || defaultCallback
  times++;
  if (typeof alias === "object") {
    getMuti(times, 1, alias, callback);
  } else {
    getOne(times, 1, alias, callback);
  }
}

loadJsAndCss.config = function (setting: Record<string, bestime.need.INeedConfigAliasItem>) {
  if (!isEmptyMap(_setting)) throw "config is already configured";
  _setting = setting;
};

loadJsAndCss.getConfig = function () {
  return _setting;
};

export default loadJsAndCss;
