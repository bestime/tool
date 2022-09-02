import isEmptyMap from "../isEmptyMap";
import isFunction from "../isFunction";
import urlToGet from "../urlToGet";
import variableHasValue from "../variableHasValue";
import getfile from "./getfile";
import { $browserGlobal, $undefinedValue } from '../help/hpConsts'

type loadCallback = (...data: number[]) => void

function defaultCallback () {}

let _setting: bestime.INeedConfig = {};
let times = 0;
let oHead = document.getElementsByTagName("head")[0];



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
  const item = _setting.alias && _setting.alias[aliasName];

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
  else if (!item._syncsIsLoad && item.syncs && item.syncs.length > 0) {
    item._syncsIsLoad = true;
    getMuti(times, id, item.syncs.concat(aliasName), onSuccess);
  }
  // 无任何依赖，则创建新请求
  else {
    item._count = item._count ? item._count + 1 : 1;
    item._deeps = `${times}.${id}`;
    const fileType = isJsFile ? "script" : "link";
    const filePath = urlToGet(_setting.baseUrl + item.url, {
      hash: _setting.hash
    })
    getfile(item._deeps, oHead, fileType, filePath, onSuccess);
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

loadJsAndCss.config = function (setting: bestime.INeedConfig) {
  if (!isEmptyMap(_setting)) throw "config is already configured";
  _setting = setting;
};

loadJsAndCss.getConfig = function () {
  return _setting;
};

export default loadJsAndCss;
