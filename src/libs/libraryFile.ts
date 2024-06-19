import { $browserGlobal, $undefinedValue } from './help/hpConsts';
import hpCreateFileLoaderElement from './help/hpCreateFileLoaderElement';
import { variableHasValue } from '@bestime/utils_base';

interface LibraryFileConfig {
  type: 'js' | 'css';
  url: string;
  module: string;
  dependencies?: LibraryFileConfig[];
  with?: LibraryFileConfig[];
  attribute?: Record<string, string>;
  interceptor?: (libInstence: any) => void
}

type SuccessCallback = (...args: any[]) => void;

const cache: Record<
  string,
  {
    count: number;
    complete: boolean;
    with: boolean;
    create: boolean;
    dependencies: boolean;
    url: string;
  }
> = {};

// 批量加载
function loadMultiple(files: LibraryFileConfig[], callback: SuccessCallback) {
  const result: any[] = [];
  let count = 0;
  for (let a = 0; a < files.length; a++) {
    loadSingle(files[a], function (res) {
      result[a] = res;
      if (++count === files.length) {
        callback.apply($undefinedValue, result);
      }
    });
  }
}

// 单个加载
function loadSingle(file: LibraryFileConfig, callback: SuccessCallback) {
  const hasDepends = file.dependencies && file.dependencies.length;
  const hasWith = file.with && file.with.length;
  if (!cache[file.url]) {
    cache[file.url] = {
      count: 0,
      dependencies: !hasDepends,
      with: !hasWith,
      complete: false,
      create: false,
      url: file.url
    };
  }

  const cacheItem = cache[file.url];
  cacheItem.count++;

  function getInstence () {
    return $browserGlobal[file.module as any]
  }

  function onSuccess() {
    if (cacheItem.complete && cacheItem.dependencies && cacheItem.with) {
      if (file.module) {
        callback(getInstence());
      } else {
        callback();
      }
    }
  }

  // 有依赖，先加载依赖
  if (!cacheItem.dependencies && hasDepends) {
    cacheItem.dependencies = true;
    loadMultiple(file.dependencies!, function () {
      loadSingle(file, callback);
    });
  }

  // 有需要同步加载的模块
  else if (!cacheItem.with && hasWith) {
    cacheItem.with = true;
    loadMultiple(file.with!.concat(file), onSuccess);
  }

  // 已经创建，等待完成
  else if (cacheItem.create) {
    variableHasValue(
      function () {
        return cacheItem.complete;
      },
      onSuccess,
      300
    );
  }

  // 没有创建当前模块加载器，则创建
  else {
    cacheItem.create = true;
    hpCreateFileLoaderElement(
      file.type,
      file.url,
      function () {
        cacheItem.complete = true;
        if(file.interceptor) {
          file.interceptor(getInstence())
        }
        onSuccess();
      },
      file.attribute
    );
  }
}


/**
   * js和css文件加载器
   * @param files - 文件配置
   * @param callback - 加载成功回调
   */
export default function libraryFile(
  files: LibraryFileConfig | LibraryFileConfig[],
  callback: SuccessCallback
): void {
  if (files instanceof Array) {
    loadMultiple(files, callback);
  } else {
    loadSingle(files, callback);
  }
}
