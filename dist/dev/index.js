
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':1500/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var bestime = (function (exports) {
'use strict';

function serverConfig(config) {
    let _cache = {};
    let toPath;
    for (let fromPath in config) {
        toPath = config[fromPath];
        _cache[fromPath] = {
            to: toPath,
            reg: new RegExp('^(' + fromPath + ')(/|$)')
        };
    }
    return function (path) {
        let success = false;
        var result = path;
        for (let fromPath in _cache) {
            const item = _cache[fromPath];
            if (item.reg.test(path)) {
                success = true;
                if (typeof item.to === 'string') {
                    result = path.replace(item.reg, item.to + '$2');
                }
                break;
            }
        }
        if (!success) {
            console.error('警告：请求地址 "' + path + '" 不在白名单中！');
            console.table(_cache);
        }
        // console.log('url转换结果', path, '=>', result)
        return result;
    };
}

function isNull(data) {
    return data === null || data === undefined;
}

function _String(data) {
    return isNull(data) ? '' : String(data);
}

const $letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/** 数据类型常量：Array */
const $ArrayTypeNameBig = 'Array';
const $FunctionTypeNameBig = 'Function';
/** 数据类型常量：Object */
const $ObjectTypeNameBig = 'Object';
/** 数据类型常量(大写)：String */
const $stringTypeNameBig = 'String';
/** 数据类型常量：Number */
const $numberTypeNameBig = 'Number';
const $undefinedValue = undefined;
const $zeroString = '0';
/** false字符串 */
const $falseString = 'false';
/** true字符串 */
const $trueString = 'true';
/** 代理浏览器 window */
const $browserGlobal = window;
/** toString简写 */
const $ObjectTypeNameBigPrototypeToString = Object.prototype.toString;
/** 编码 encodeURIComponent */
const $encodeURIComponent = encodeURIComponent;
/** 解码 decodeURIComponent */
const $decodeURIComponent = decodeURIComponent;
/** 空白字符串 (已转意) */
const $regSpaceStr = '\\s\\uFEFF\\xA0';

function getType(data) {
    return $ObjectTypeNameBigPrototypeToString.call(data).slice(8, -1);
}

function isArray(data) {
    return getType(data) === $ArrayTypeNameBig;
}

function isKvPair(data) {
    return getType(data) === $ObjectTypeNameBig;
}

function hpJsonParse(data, defualtData) {
    let res;
    try {
        res = JSON.parse(data);
    }
    catch (e) {
        res = defualtData;
    }
    return res;
}

function KvPair(data) {
    if (!isKvPair(data)) {
        data = hpJsonParse(data);
        if (!isKvPair(data)) {
            data = {};
        }
    }
    return data;
}

function isFunction(variate) {
    return typeof variate === 'function';
}

function param(data) {
    var res = [];
    // 当value不为数组或者JSON时，就可创建一条数据
    function addOne(key, value) {
        if (key != null && key !== '') {
            value = isFunction(value) ? value() : value;
            value = value == null ? '' : value;
            res[res.length] = $encodeURIComponent(key) + '=' + $encodeURIComponent(value);
        }
    }
    buildOnce('', data);
    function buildOnce(prefix, item) {
        var index, objKey;
        if (prefix) {
            switch (getType(item)) {
                case $ArrayTypeNameBig:
                    for (index = 0; index < item.length; index++) {
                        // 如果数组项为object包括数组，需要创建一个索引
                        buildOnce(prefix + '[' + (typeof item[index] === 'object' && item[index] ? index : '') + ']', item[index]);
                    }
                    break;
                case $ObjectTypeNameBig:
                    for (objKey in item) {
                        // 组装JSON的key为prefix
                        buildOnce(prefix + '[' + objKey + ']', item[objKey]);
                    }
                    break;
                default:
                    addOne(prefix, item);
            }
        }
        else {
            switch (getType(item)) {
                case $stringTypeNameBig:
                case $ObjectTypeNameBig:
                    for (objKey in item) {
                        buildOnce(objKey, item[objKey]);
                    }
                    break;
                case $ArrayTypeNameBig:
                    for (index = 0; index < item.length; index++) {
                        addOne(item[index].name, item[index].value);
                    }
                    break;
            }
        }
    }
    // console.log(res)
    return res.join('&');
}

function urlToGet(url, searchString) {
    url = _String(url).replace(/&*$/g, '').replace(/\?*$/, '');
    var str = '';
    if (isKvPair(searchString) || isArray(searchString)) {
        str = param(searchString);
    }
    else {
        str = _String(searchString).replace(/^&*/, '');
    }
    str && (url += (/\?/.test(url) ? '&' : '?') + str);
    return url;
}
/*
urlToGet('1111111111', 'a=0&b=2')
urlToGet('2222222222', 'a=0&b=2')
urlToGet('333333333?c=5&', 'a=0&b=2')
urlToGet('333333333?c=5&', {
  name: '张三',
  skill: [1, 2, 3, 4, 5]
})
*/

const baseReg = `[${$regSpaceStr}]+`;
function trim(data, pos) {
    var tp = getType(data);
    if (tp === $numberTypeNameBig) {
        data = String(data);
        tp = $stringTypeNameBig;
    }
    let regStr = '';
    if (tp === $stringTypeNameBig) {
        switch (pos) {
            case 1: // 左侧
                regStr = '^' + baseReg;
                break;
            case -1: // 右侧
                regStr = baseReg + '$';
                break;
            case '*': // 所有空格
                regStr = baseReg;
                break;
            default: // 两侧
                regStr = `^${baseReg}|${baseReg}$`;
                break;
        }
        return data.replace(new RegExp(regStr, 'g'), '');
    }
    else {
        return '';
    }
}

function isString(data) {
    return getType(data) === $stringTypeNameBig;
}

function hpIsEmptyMap(data) {
    var result = true;
    for (var key in data) {
        if (key !== undefined) {
            result = false;
        }
    }
    return result;
}

function clean(data, removeEmptyStr, removeEmptyObject) {
    var res;
    removeEmptyObject = removeEmptyObject === false ? false : true;
    if (isKvPair(data)) {
        res = {};
        var mpItem, key, temp;
        for (key in data) {
            mpItem = data[key];
            if (isArray(mpItem) || isKvPair(mpItem)) {
                temp = clean(mpItem, removeEmptyStr);
            }
            else {
                temp = mpItem;
            }
            // console.log("谷歌", key, temp)
            _filterData(temp, removeEmptyStr, removeEmptyObject, function (useValue) {
                res[key] = useValue;
            });
        }
    }
    else if (isArray(data)) {
        res = [];
        for (var index = 0, len = data.length; index < len; index++) {
            _filterData(clean(data[index], removeEmptyStr), removeEmptyStr, removeEmptyObject, function (useValue) {
                res.push(useValue);
            });
        }
    }
    else {
        res = data;
    }
    return res;
}
/**
 * @param {*} data
 * @param {Boolean} removeEmptyStr
 * @param {Function} callback
 */
function _filterData(data, removeEmptyStr, removeEmptyObject, callback) {
    if (isString(data)) {
        if (removeEmptyStr) {
            if (trim(data, '*') != '') {
                callback(data);
            }
        }
        else {
            callback(data);
        }
    }
    else if (data != null) {
        if (removeEmptyObject && isKvPair(data) && hpIsEmptyMap(data)) {
            callback(data);
        }
        else {
            callback(data);
        }
    }
}

function _Array(data) {
    if (!isArray(data)) {
        data = hpJsonParse(data);
        if (!isArray(data)) {
            data = [];
        }
    }
    return data;
}

/**
 * 检测一个数据是否存在
 *
 * @param handler - 每一次检测的回调， 返回值为Boolean,表示是否检测到数据
 * @param callback - 成功回调
 * @param sleepTime - 间隔时间
 */
function variableHasValue(handler, callback, sleepTime) {
    sleepTime = sleepTime == null ? 60 : sleepTime;
    var timer;
    if (handler()) {
        callback();
    }
    else {
        clearTimeout(timer);
        timer = setTimeout(function () {
            variableHasValue(handler, callback, sleepTime);
        }, sleepTime);
    }
}
variableHasValue.async = function (handler, sleepTime) {
    return new Promise(function (resolve) {
        variableHasValue(handler, resolve, sleepTime);
    });
};

const _tmp = {};
/**
 * 缓存相同请求地址的数据
 * 参数参考Jquery.axax
 * @param {String} options.url
 * @param {Object} [options.data=null]
 */
function dataCacheUtil(url) {
    _tmp[url] = _tmp[url] || {
        count: 0,
        complete: false,
        data: null, // 数据
    };
    const item = _tmp[url];
    item.count++;
    /** 这个链接的请求是否已经开始 */
    function isStart() {
        return item.count > 1;
    }
    /** 对相同请求设置数据 */
    function setData(data) {
        item.complete = true;
        item.data = JSON.stringify(data);
    }
    /** 获取数据 */
    function getData(callback) {
        variableHasValue(function () {
            return item.complete;
        }, function () {
            callback(hpJsonParse(item.data));
        }, 100);
    }
    return {
        isExist: isStart,
        set: setData,
        get: getData,
        logs: _tmp
    };
}

function cloneEasy(data) {
    let ret;
    switch (getType(data)) {
        case $ArrayTypeNameBig:
            ret = [];
            for (let a = 0; a < data.length; a++) {
                ret.push(cloneEasy(data[a]));
            }
            break;
        case $ObjectTypeNameBig:
            ret = {};
            for (const key in data) {
                ret[key] = cloneEasy(data[key]);
            }
            break;
        case $FunctionTypeNameBig:
            function newFun() {
                data.apply(this, arguments);
            }
            for (const key in data.prototype) {
                newFun.prototype[key] = data.prototype[key];
            }
            ret = newFun;
            break;
        default:
            ret = data;
            break;
    }
    return ret;
}

const DEFAULT_CONFIG = {
    id: "id",
    children: "children"
};
function deepFindTreePath(tree, handler, config) {
    config = Object.assign(DEFAULT_CONFIG, config);
    const path = [];
    const list = cloneEasy(tree);
    const visitedSet = new Set();
    const { children } = config;
    while (list.length) {
        const node = list[0];
        if (visitedSet.has(node)) {
            path.pop();
            list.shift();
        }
        else {
            visitedSet.add(node);
            node[children] && list.unshift.apply(list, node[children]);
            path.push(node);
            if (handler(node))
                return path;
        }
    }
    return null;
}

function setObjectToString (val) {
    if (!isString(val)) {
        val = JSON.stringify(val);
    }
    return val;
}

/**
 * 设置cookie。默认path="/"
 * @param {String} key 设置的键名
 * @parrm {*} value 设置的值
 * @param {Number} expiredTime 单位（毫秒）
 */
function setCookie(key, value, expiredTime) {
    value = setObjectToString(value);
    let cook = key + '=' + encodeURI(value) + ';path=\/;';
    if (typeof expiredTime === 'number') {
        var oDate = new Date();
        oDate.setTime(oDate.getTime() + expiredTime);
        cook += 'expires=' + oDate.toUTCString();
    }
    document.cookie = cook;
}

/**
 * 解析字符串
 * 1、布尔值转换
 * 2、数字转换为字符串
 * 3、尝试解析json数据
 *
 * @param {String} data
 *
 * @return {*}
 */
function hpTryToParseStringToBasicType(data) {
    let res = data;
    if (data == null) {
        res = undefined;
    }
    else if ($falseString === data) {
        res = false;
    }
    else if ($trueString === data) {
        res = true;
    }
    else {
        res = hpJsonParse(data, data);
    }
    return res;
}

function getCookie(key, target) {
    target = target || document.cookie;
    let res = '';
    target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g, prefix, value) {
        res = hpTryToParseStringToBasicType($decodeURIComponent(value));
    });
    return res;
}

//删除cookie
function removeCookie(key) {
    setCookie(key, '', -1);
}

function _Number(data) {
    data = Number(data);
    return data === Math.abs(Infinity) || isNaN(data) ? 0 : data;
}

const defaultSplitArr = [$undefinedValue, $undefinedValue];
/**
 * 处理可能是深层级的数据
 *
 * @param {String} res
 * @param {String} more
 * @param {*} originValue
 */
function handleDeepKey(res, more, originValue) {
    var sb = splitSymbol(more);
    var nowKey = sb[0];
    if (isPreLikeArray(nowKey)) {
        nowKey = _Number(nowKey);
        if (sb[1] == $undefinedValue) {
            res.push(originValue);
        }
        else {
            if (/^\[[\D]+\]/.test(sb[1])) {
                res[nowKey] = KvPair(res[nowKey]);
            }
            else {
                res[nowKey] = _Array(res[nowKey]);
            }
            handleDeepKey(res[nowKey], sb[1], originValue);
        }
    }
    else {
        if (sb[1] == $undefinedValue) {
            res[nowKey] = originValue;
        }
        else {
            if (/^\[[\D]+\]/.test(sb[1])) {
                res[nowKey] = KvPair(res[nowKey]);
            }
            else {
                res[nowKey] = _Array(res[nowKey]);
            }
            handleDeepKey(res[nowKey], sb[1], originValue);
        }
    }
}
/**
 * 拆分前面的括号，和剩余括号
 * @param {String} str
 * @return {Array}
 */
function splitSymbol(str) {
    if (str == $undefinedValue) {
        return defaultSplitArr;
    }
    var pre = str, next;
    str.replace(/^\[(.*?)\](.*)?/, function (_, a, b) {
        pre = a;
        next = b;
        return '';
    });
    return [pre, next];
}
/**
 * 前面的括号时候像一个数组
 * @param {String} data
 * @return {Boolean}
 */
function isPreLikeArray(data) {
    return data === '' || /^\d+$/.test(data);
}
function parseQuery(str) {
    var res = {}, hasChlid, queryKey;
    if (!str) {
        str = $browserGlobal.location.href;
    }
    str.replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_, key, val) {
        val = hpTryToParseStringToBasicType($decodeURIComponent(val));
        queryKey = $decodeURIComponent(key);
        hasChlid = false;
        if (queryKey !== '') {
            queryKey.replace(/(.*?)(\[.*)/, function (_, k, m) {
                var sb = splitSymbol(m);
                hasChlid = true;
                if (isPreLikeArray(sb[0])) {
                    res[k] = _Array(res[k]);
                }
                else {
                    res[k] = KvPair(res[k]);
                }
                handleDeepKey(res[k], m, val);
            });
            if (!hasChlid) {
                res[queryKey] = val;
            }
        }
    });
    return res;
}

function defaultValue(data, value) {
    return isNull(data) ? value : data;
}

function downloadFileByUrl(url, fileName) {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.download = fileName;
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

const iUrl = $browserGlobal.URL;
function downloadFileByArrayBuffer(data, fileName) {
    let url = iUrl.createObjectURL(new Blob([data]));
    downloadFileByUrl(url, fileName);
    iUrl.revokeObjectURL(url);
    url = undefined;
}

function repeatString(target, count) {
    var res = '';
    target = _String(target);
    if (target.length * count < 1 << 28) {
        for (;;) {
            if ((count & 1) == 1) {
                res += target;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            target += target;
        }
    }
    return res;
}

function hpPadString(padTarget, targetLength, padString, direction) {
    padTarget = _String(padTarget);
    targetLength = targetLength >> 0;
    if (padTarget.length > targetLength) {
        return padTarget;
    }
    else {
        targetLength = targetLength - padTarget.length;
        if (padString.length < targetLength) {
            padString += repeatString(padString, targetLength / padString.length);
        }
        if (direction === -1) {
            return padString.slice(0, targetLength) + padTarget;
        }
        else {
            return padTarget + padString.slice(0, targetLength);
        }
    }
}

function padStart(data, len, target) {
    return hpPadString(data, len, target, -1);
}

function padEnd(data, len, target) {
    return hpPadString(data, len, target, 1);
}

function split(data, symbol) {
    return data !== '' ? data.split(symbol) : [];
}

function floorFixed(data, fractionDigits, rejection) {
    data = trim(_Number(data));
    var res = '';
    var arr = split(data, '.');
    var decp = arr[1] || '';
    if (decp.length < fractionDigits) {
        decp = padEnd(decp, fractionDigits, $zeroString);
        if (rejection) {
            decp = decp.replace(/0+$/, '');
        }
    }
    if (fractionDigits < 1 || !decp) {
        res = arr[0];
    }
    else {
        res = arr[0] + '.' + decp.substring(0, fractionDigits);
    }
    return res;
}

function roundFixed(data, fractionDigits, rejection) {
    data = _Number(data);
    // 保留机位就乘几次10
    var multiple = Math.pow(10, fractionDigits);
    //保留机位小数并四舍五入
    var res = _String(Math.round(data * multiple) / multiple);
    if (fractionDigits > 0) {
        const chai = split(res, '.');
        const intp = chai[0]; // 整数部分
        var decp = chai[1] || ''; // 小数部分
        if (decp.length < fractionDigits) {
            decp = padEnd(decp, fractionDigits, $zeroString);
            if (rejection) {
                decp = decp.replace(/0+$/, '');
            }
            if (decp) {
                res = intp + '.' + decp;
            }
            else {
                res = intp;
            }
        }
    }
    return res;
}

/**
 * 深度查找数组中的匹配项（找到一项就不再继续查找）
 * @param {array} list 需要查找的数组
 * @param {function} handle 回调函数
 * @param {string} [childrenKey=children] 子集的键
*/
function deepFindItem(list, handle, childrenKey) {
    childrenKey = isNull(childrenKey) ? 'children' : childrenKey;
    var res, isFind;
    (function doOnce(children) {
        if (!children)
            return;
        for (var a = 0; a < children.length; a++) {
            isFind = handle(children[a]);
            if (isFind) {
                res = children[a];
                break;
            }
            else {
                doOnce(children[a][childrenKey]);
            }
            if (isFind) {
                break;
            }
        }
    })(list);
    return res;
}

/*


var nodes = [
  // {"dataId":'0',"parentId":'null',"name":"总父级"},
  {"dataId":'23.2',"parentId":'23',"name":"2-3-2"},
  {"dataId":'13.1',"parentId":'13',"name":"1-3-1"},
  {"dataId":'1',"parentId":'0',"name":"1","open":true},
  {"dataId":'11',"parentId":'1',"name":"1-1"},
  {"dataId":'12',"parentId":'1',"name":"1-2"},
  {"dataId":'13',"parentId":'1',"name":"1-3"},
  




  {"dataId":'2',"parentId":'0',"name":"2"},
  {"dataId":'21',"parentId":'2',"name":"2-1","open":true},
  {"dataId":'22',"parentId":'2',"name":"2-2"},
  {"dataId":'23',"parentId":'2',"name":"2-3"},
  {"dataId":'23.1',"parentId":'23',"name":"2-3-1"},
  {"dataId":'22.1',"parentId":'22',"name":"2-2-1"},
  {"dataId":'22.1.1',"parentId":'22.1',"name":"2-2-1-1"},

  {"dataId":'3',"parentId":'0',"name":"3"},
  {"dataId":'23.3',"parentId":'23',"name":"2-3-3"},

  
];

// nodes.reverse()


const treeList = flatArrayToTree(nodes, {
  id: 'dataId',
  pid: 'parentId',
  children: 'childList'
})
console.log(treeList)


*/
/**
 * 一维数组转树形解构 （不限层级）
 * 注：需要输出字段转化的，请提前自行处理，此方法只负责转tree结构
 *
 * @param {Array} list 需要转化的一维数组
 * @param {Object} [props=defaultProps] 配置项。可配置[id, pid, children]
 * @return {Array} treeList
 */
function flatArrayToTree(list, props) {
    props = KvPair(props);
    var id = props.id || "id";
    var pid = props.pid || "pid";
    var children = props.children || "children";
    for (var a = 0, item, father; a < list.length; a++) {
        var item = list[a];
        item[children] = _Array(item[children]);
        father = deepFindItem(list, function (c) {
            return c[id] != null && c[id] != item[id] && c[id] === item[pid];
        }, children);
        if (father) {
            father[children] = _Array(father[children]);
            father[children].push(item);
            list.splice(a--, 1);
        }
    }
    return list;
}

/**
 * 在给定索引范围内，增减当前索引，如果超出范围，则按当前方向重新循环取值。
 * @param maxIndex - 最大索引
 * @param currentIndex - 当前索引
 * @param increase - 调整多少索引，可为负数
 * @returns 改变后的索引
 */
function changeIndex(maxIndex, currentIndex, increase) {
    if (maxIndex < 0)
        return currentIndex;
    const length = maxIndex + 1;
    currentIndex = (currentIndex + increase) % length;
    // 如果是负数，就加回来
    if (currentIndex < 0) {
        currentIndex = currentIndex + length;
    }
    return currentIndex === -0 ? 0 : currentIndex;
}

function zeroTo2 (data) {
    return padStart(data, 2, '0');
}

function formatFunc(units, unitIndex, data) {
    const item = units[unitIndex];
    let res = '';
    if (units[unitIndex] === undefined || units[unitIndex] === null) {
        res = '';
    }
    else {
        res = zeroTo2(data) + item;
    }
    return res;
}
function handleOne(startTime, endTime) {
    var refer = startTime.split[0];
    var modify = endTime.split[1];
    for (var a = 0; a < refer.length; a++) {
        if (refer[a] === modify[a]) {
            modify[a] = '';
        }
        else {
            break;
        }
    }
}
/**
 * 格式化时间轴
 * @param {Array} list时间列表
 * @return {Array}
 */
function timeLine(list, units) {
    units = units || ['年', '月', '日 ', '时', '分', '秒', '毫秒'];
    var result = [], item, date;
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

const Bytes = 8;
const KB = Bytes * 1024;
const MB = KB * 1024;
const GB = MB * 1024;
const TB = GB * 1024;
const minUnit = 0.1;
/**
 * 转换文件大小
 * @param {Number} value 文件大小
 * @param {Number} [unit="Bytes"] 传入大小的单位。可选：["KB", "Bytes"]
 * @return {Object} 计算后的详细信息
 */
function fileSize(value, unit) {
    var bit = value;
    unit = unit || 'Bytes';
    switch (unit) {
        case 'MB':
            bit = value * MB;
            break;
        case 'KB':
            bit = value * KB;
            break;
        case 'Bytes':
            bit = value * Bytes;
            break;
    }
    var _tb = bit / TB;
    var _gb = bit / GB;
    var _mb = bit / MB;
    var _kb = bit / KB;
    console.log("_kb", _kb);
    var _bytes = bit / Bytes;
    _tb = floorFixed(_tb.toFixed(8), 2);
    _gb = floorFixed(_gb.toFixed(8), 2);
    _mb = floorFixed(_mb.toFixed(8), 2);
    _kb = floorFixed(_kb.toFixed(8), 2);
    _bytes = floorFixed(_bytes.toFixed(8), 2);
    var format = '';
    if (+_tb > minUnit) {
        format = _tb + ' TB';
    }
    else if (+_gb > minUnit) {
        format = _gb + ' GB';
    }
    else if (+_mb > minUnit) {
        format = _mb + ' MB';
    }
    else {
        format = _kb + ' KB';
    }
    return {
        Bit: bit,
        Bytes: _bytes,
        KB: _kb,
        MB: _mb,
        GB: _gb,
        TB: _tb,
        format: format
    };
}
/*

// => {"Bit":9011.2,"Bytes":"1126.40","KB":"1.10","MB":"0.00","GB":"0.00","TB":"0.00","format":"1.10KB"}
JSON.stringify(fileSize(1.1, 'KB'))

*/

function removeElement(el) {
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

//阻止冒泡及默认行为
function prevent(ev, bubble, stop) {
    ev = ev || $browserGlobal.event;
    bubble = bubble === false ? false : true;
    stop = stop === false ? false : true;
    bubble && $browserGlobal.event ? $browserGlobal.event.cancelBubble = true : ev.stopPropagation();
    stop && $browserGlobal.event ? $browserGlobal.event.returnValue = false : ev.preventDefault();
}

/**
 * 生成随机数
 * @param  {Number} min 最小数
 * @param  {Number} max 最大数
 * @param  {Number} [isInt=true] 是否整数
 * @returns
 */
function getRandom(min, max, isInt) {
    const num = isInt === false ? 0 : 1;
    min = Math.random() * (max - min + num) + min; // 节省一个变量
    return num ? Math.floor(min) : min;
}
/*
getRandom(0.1, 9.9, false)

*/

function getRandomWord() {
    return $letters[getRandom(0, $letters.length - 1)][0];
}
/**
 * 生成随机ID
 * @return {String}
 */
function uuid(length) {
    length = _Number(length);
    let multiplicand = '';
    for (let a = 0; a < 13; a++) {
        multiplicand = multiplicand + getRandom(1, 9);
    }
    const t = new Date().getTime() * getRandom(1, 100);
    const res = getRandomWord() + Number(multiplicand).toString(32) + t.toString(32);
    const endStr = getRandomWord() + getRandomWord() + getRandomWord();
    return padEnd(res, 20, endStr);
}

function _Boolean(data) {
    if (data === true || data === 'true' || data === '1' || data === 1) {
        return true;
    }
    else {
        return false;
    }
}

function getStorage(key) {
    const res = localStorage.getItem(key);
    return res ? hpTryToParseStringToBasicType(res) : '';
}

function removeStorage(key) {
    localStorage.removeItem(key);
}

/**
 * 将非字符串的对象转为字符串
 * 用于存储cookie、localStorage等
 *
 * @param {*} val 需要转换的数据
 * @return {String}
 */
function hpSetStringValue(val) {
    if (!isString(val)) {
        val = JSON.stringify(val);
    }
    return val;
}

/**
 * 设置本地存储
 *
 * @param {String} key
 * @param {*} val
 */
function setStorage(key, val) {
    localStorage.setItem(key, hpSetStringValue(val));
}

//获取元素相对窗口的距离
function getRelativePos(el) {
    // var scrollPos = getScrollPosition();
    const bound = el.getBoundingClientRect();
    return {
        x: bound.left,
        y: bound.top,
        height: el.offsetHeight,
        width: el.offsetWidth,
        clientWidth: el.clientWidth,
        clientHeight: el.clientHeight
    };
}

/*

var treeData = [
  {
    "id": 1,
    "parentId": -1,
    "name": "menu-1",
    "children": [
      {
        "id": 2,
        "parentId": 1,
        "name": "menu-1-1",
        "children": [
          {
            "id": 3,
            "parentId": 2,
            "name": "menu-1 item-1"
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "parentId": -1,
    "name": "menu-2",
    "children": [
      {
        "id": 5,
        "parentId": 4,
        "name": "menu-2 item-1"
      }
    ]
  }
]
*/
function flatTree(data, childKey) {
    const result = [];
    childKey = defaultValue(childKey, 'children');
    (function once(list) {
        if (isArray(list)) {
            let item;
            for (let index = 0; index < list.length; index++) {
                item = list[index];
                result.push(item);
                once(item[childKey]);
            }
        }
    })(data);
    return result;
}

function getJsFileBaseUrl(tir) {
    tir = tir || 0;
    var reg = '\/[^/]*', arr = document.scripts;
    for (var a = 0; a < tir; a++) {
        reg += reg;
    }
    return arr[arr.length - 1].src.replace(new RegExp(reg + '$'), '');
}

function getfile(gid, oHead, type, url, callback, attrs) {
    let oElement;
    if (type === 'script') {
        oElement = document.createElement('script');
        oElement.src = url;
    }
    else {
        oElement = document.createElement('link');
        oElement.href = url;
        oElement.setAttribute('rel', 'stylesheet');
    }
    oElement.setAttribute('level-id', gid);
    oElement.setAttribute('author', 'bestime');
    if (attrs) {
        for (let key in attrs) {
            oElement.setAttribute(key, attrs[key]);
        }
    }
    oElement.onload = oElement.onerror = callback;
    oHead.appendChild(oElement);
}

function defaultCallback() { }
let _setting = {};
let times = 0;
let oHead = document.getElementsByTagName('head')[0];
function getMuti(times, id, alias, callback) {
    const result = [];
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
function getOne(times, id, aliasName, callback) {
    const item = _setting && _setting[aliasName];
    if (!item) {
        throw `alias \"${aliasName}" is not configured`;
    }
    const isJsFile = /^js/.test(aliasName);
    function onSuccess() {
        if (item) {
            item._complete = true;
            if (!isFunction(callback))
                return;
            if (isJsFile) {
                callback(item.moduleName ? $browserGlobal[item.moduleName] : undefined);
            }
            else {
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
    else if (!item._depenIsLoad && item.dependencies && item.dependencies.length > 0) {
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
        const fileType = isJsFile ? 'script' : 'link';
        getfile(item._deeps, oHead, fileType, item.url, onSuccess, item.attribute);
    }
}
function loadJsAndCss(alias, callback) {
    callback = callback || defaultCallback;
    times++;
    if (typeof alias === 'object') {
        getMuti(times, 1, alias, callback);
    }
    else {
        getOne(times, 1, alias, callback);
    }
}
loadJsAndCss.config = function (setting) {
    const coverNames = [];
    for (let key in setting) {
        if (_setting[key]) {
            coverNames.push(key);
        }
        _setting[key] = setting[key];
    }
    if (coverNames.length) {
        console.warn(`提示：已存在配置 (${coverNames.join(', ')})，此配置将会覆盖之前配置，请检查配置是否正确`);
    }
};
loadJsAndCss.getConfig = function () {
    return _setting;
};
loadJsAndCss.async = function (alias) {
    return new Promise(function (resolve) {
        loadJsAndCss(alias, function () {
            if (isArray(alias)) {
                resolve(arguments);
            }
            else {
                resolve(arguments[0]);
            }
        });
    });
};

const main$2 = function (element, handler, type, interval) {
    interval = interval || 500;
    let width = [0, 0, false];
    let height = [0, 0, false];
    let timer = setInterval(function () {
        if (!element.isConnected) {
            dispose();
            return;
        }
        width[0] = element.offsetWidth;
        height[0] = element.offsetHeight;
        width[2] = width[0] !== width[1]; // 宽度变化
        height[2] = height[0] !== height[1]; // 高度变化
        if (width[2]) {
            width[1] = width[0];
            if (type === 'width') {
                handler(element);
            }
        }
        if (height[2]) {
            height[1] = height[0];
            if (type === 'height') {
                handler(element);
            }
        }
        if (!type) {
            if (width[2] || height[2]) {
                handler(element);
            }
        }
    }, interval);
    function dispose() {
        clearInterval(timer);
    }
    return dispose;
};

const main$1 = function (data, childKeyTo, handle, childKeyFrom) {
    childKeyFrom = childKeyFrom || 'children';
    const result = [];
    (function handleOneList(list, newList) {
        for (let index = 0; index < list.length; index++) {
            newList[index] = cloneEasy(handle(list[index]));
            newList[index][childKeyTo] = [];
            if (list[index][childKeyFrom]) {
                handleOneList(list[index][childKeyFrom], newList[index][childKeyTo]);
            }
        }
    })(data, result);
    return result;
};

const events = {};
function defineEventBus(eventName) {
    if (events[eventName])
        throw `"${eventName}" Has already been registered!`;
    events[eventName] = events[eventName] || [];
    function on(hander) {
        events[eventName].push(hander);
    }
    function emit(...args) {
        for (let a = 0; a < events[eventName].length; a++) {
            events[eventName][a].apply($undefinedValue, args);
        }
    }
    function off(hander) {
        if (!hander)
            throw `the hander of off is required!`;
        for (let a = 0; a < events[eventName].length; a++) {
            if (events[eventName][a] === hander) {
                events[eventName].splice(a--, 1);
                // break; // 这里不能break，防止多次监听同一函数导致的bug
            }
        }
    }
    function dispose() {
        for (let a = 0; a < events[eventName].length; a++) {
            events[eventName].splice(a--, 1);
        }
        delete events[eventName];
    }
    return {
        on,
        emit,
        off,
        dispose
    };
}

const main = function (data, handle, childKey) {
    childKey = childKey || 'children';
    (function handleOneList(list) {
        for (let index = 0; index < list.length; index++) {
            handle(list[index]);
            if (isArray(list[index][childKey])) {
                handleOneList(list[index][childKey]);
            }
        }
    })(data);
};

function getWindowSize() {
    return {
        width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 0,
        height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 0
    };
}

function randomColor() {
    const r = getRandom(0, 255, true);
    const g = getRandom(0, 255, true);
    const b = getRandom(0, 255, true);
    return `rgba(${r},${g},${b},1)`;
}

exports._Array = _Array;
exports._Boolean = _Boolean;
exports._KvPair = KvPair;
exports._Number = _Number;
exports._String = _String;
exports.changeIndex = changeIndex;
exports.clean = clean;
exports.cloneEasy = cloneEasy;
exports.dataCacheUtil = dataCacheUtil;
exports.deepFindItem = deepFindItem;
exports.deepFindTreePath = deepFindTreePath;
exports.defaultValue = defaultValue;
exports.defineEventBus = defineEventBus;
exports.downloadFileByArrayBuffer = downloadFileByArrayBuffer;
exports.downloadFileByUrl = downloadFileByUrl;
exports.fileSize = fileSize;
exports.flatTree = flatTree;
exports.floorFixed = floorFixed;
exports.forEachTree = main;
exports.getCookie = getCookie;
exports.getJsFileBaseUrl = getJsFileBaseUrl;
exports.getRandom = getRandom;
exports.getRelativePos = getRelativePos;
exports.getStorage = getStorage;
exports.getType = getType;
exports.getWindowSize = getWindowSize;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isKvPair = isKvPair;
exports.isNull = isNull;
exports.mapTree = main$1;
exports.need = loadJsAndCss;
exports.observeDomResize = main$2;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.param = param;
exports.parseQuery = parseQuery;
exports.prevent = prevent;
exports.randomColor = randomColor;
exports.removeCookie = removeCookie;
exports.removeElement = removeElement;
exports.removeStorage = removeStorage;
exports.repeatString = repeatString;
exports.roundFixed = roundFixed;
exports.serverConfig = serverConfig;
exports.setCookie = setCookie;
exports.setStorage = setStorage;
exports.split = split;
exports.timeLine = timeLine;
exports.tree = flatArrayToTree;
exports.trim = trim;
exports.urlToGet = urlToGet;
exports.uuid = uuid;
exports.variableHasValue = variableHasValue;

return exports;

})({});
//# sourceMappingURL=index.js.map
