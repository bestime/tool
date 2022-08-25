import isEmptyMap from "../isEmptyMap";
import isFunction from "../isFunction";
import variableHasValue from "../variableHasValue";
import getfile from "./getfile";

let _setting: Setting = {};
let times = 0;
let oHead = document.getElementsByTagName("head")[0];

interface Setting {
  [key: string]: bestime.INeedItem;
}

function getMuti(
  times: number,
  id: number,
  alias: string[],
  callback?: (...args: any[]) => void
) {
  const result: any[] = [];
  let flag = 0;
  for (let a = 0; a < alias.length; a++) {
    getOne(times, id, alias[a], function (res) {
      result[a] = res;
      if (++flag === alias.length) {
        callback(...result);
      }
    });
  }
}

function getOne(
  times: number,
  id: number,
  alias: string,
  callback?: (data?: any) => void
) {
  const item = _setting[alias];
  if (!item) throw "未配置该资源：" + alias;
  const isJsFile = /^js/.test(alias);

  function onSuccess() {
    item._complete = true;
    if (!isFunction(callback)) return;
    if (isJsFile) {
      callback(window[item.global]);
    } else {
      callback();
    }
  }

  // 如果已经存在，则等待
  if (item._count > 0) {
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
      getOne(times, id, alias, onSuccess);
    });
  }
  // 可以同步加载的依赖
  else if (!item._syncsIsLoad && item.syncs && item.syncs.length > 0) {
    item._syncsIsLoad = true;
    getMuti(times, id, item.syncs.concat(alias), onSuccess);
  }
  // 无任何依赖，则创建新请求
  else {
    item._count = item._count ? item._count + 1 : 1;
    item._deeps = `${times}.${id}`;
    const fileType = isJsFile ? "script" : "link";
    getfile(item._deeps, oHead, fileType, item.url, onSuccess);
  }
}

function loadJsAndCss(alias: string[], callback?: (...data: any) => void) {
  times++;
  if (typeof alias === "object") {
    getMuti(times, 1, alias, callback);
  } else {
    getOne(times, 1, alias, callback);
  }
}

loadJsAndCss.config = function (setting: Setting) {
  if (!isEmptyMap(_setting)) throw "config is already configured";
  _setting = setting;
};

loadJsAndCss.getConfig = function () {
  return _setting;
};

export default loadJsAndCss;
