
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

const Bytes = 8;
const KB = Bytes * 1024;
const MB = KB * 1024;
const GB = MB * 1024;
const TB = GB * 1024;
const LETTER_LIST = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
/** 数据类型常量：Array */
const TYPE_ARRAY = 'Array';
/** 常量：null */
const _NULL = null;
const ZERO_STRING = '0';
/** false字符串 */
const STRING_FALSE = 'false';
/** true字符串 */
const STRING_TRUE = 'true';
const WINDOW = window;
/** toString简写 */
const _TOSTRING = Object.prototype.toString;
/** 数据类型常量：Object */
const TYPE_OBJECT = 'Object';
/** 编码 encodeURIComponent */
const ENCODE_URI_COMPONENT = encodeURIComponent;
/** 常量小写：function */
const _FUNCTION_NAME = 'function';
/** 数据类型常量(大写)：String */
const TYPE_STRING = 'String';
/** 数据类型常量：Number */
const TYPE_NUMBER = 'Number';
/** 解码 decodeURIComponent */
const DECODE_URI_COMPONENT = decodeURIComponent;

function getType(data) {
    return _TOSTRING.call(data).slice(8, -1);
}

function isArray(data) {
    return getType(data) === TYPE_ARRAY;
}

function isMap(data) {
    return getType(data) === TYPE_OBJECT;
}

function jsonParse(data) {
    try {
        data = JSON.parse(data);
    }
    catch (e) {
        data = undefined;
    }
    return data;
}

function _Map(data) {
    if (!isMap(data)) {
        data = jsonParse(data);
        if (!isMap(data)) {
            data = {};
        }
    }
    return data;
}

function isFunction(variate) {
    return typeof variate === _FUNCTION_NAME;
}

function param(data) {
    var res = [];
    // 当value不为数组或者JSON时，就可创建一条数据
    function addOne(key, value) {
        if (key != null && key !== '') {
            value = isFunction(value) ? value() : value;
            value = value == null ? '' : value;
            res[res.length] = ENCODE_URI_COMPONENT(key) + '=' + ENCODE_URI_COMPONENT(value);
        }
    }
    buildOnce('', data);
    function buildOnce(prefix, item) {
        var index, objKey;
        if (prefix) {
            switch (getType(item)) {
                case TYPE_ARRAY:
                    for (index = 0; index < item.length; index++) {
                        // 如果数组项为object包括数组，需要创建一个索引
                        buildOnce(prefix + '[' + (typeof item[index] === 'object' && item[index] ? index : '') + ']', item[index]);
                    }
                    break;
                case TYPE_OBJECT:
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
                case TYPE_STRING:
                case TYPE_OBJECT:
                    for (objKey in item) {
                        buildOnce(objKey, item[objKey]);
                    }
                    break;
                case TYPE_ARRAY:
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
    if (isMap(searchString) || isArray(searchString)) {
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

function trim(str, pos) {
    var TYPE = getType(str);
    if (TYPE === TYPE_NUMBER) {
        str = String(str);
        TYPE = TYPE_STRING;
    }
    if (TYPE === TYPE_STRING) {
        switch (pos) {
            case 1: return str.replace(/^[\s\uFEFF\xA0]+/, ''); // 左侧
            case -1: return str.replace(/[\s\uFEFF\xA0]+$/, ''); // 右侧
            case 0:
            case '*': return str.replace(/[\s\uFEFF\xA0]+/g, ''); // 所有空格
            default: return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); // 两侧
        }
    }
    else {
        return '';
    }
}

function isString(data) {
    return getType(data) === TYPE_STRING;
}

function isEmptyMap(data) {
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
    if (isMap(data)) {
        res = {};
        var mpItem, key, temp;
        for (key in data) {
            mpItem = data[key];
            if (isArray(mpItem) || isMap(mpItem)) {
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
        if (removeEmptyObject && isMap(data) && isEmptyMap(data)) {
            callback(data);
        }
        else {
            callback(data);
        }
    }
}

function _Array(data) {
    if (!isArray(data)) {
        data = jsonParse(data);
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
            callback(JSON.parse(item.data));
        }, 100);
    }
    return {
        isExist: isStart,
        set: setData,
        get: getData,
        logs: _tmp
    };
}

const DEFAULT_CONFIG = {
    id: "id",
    children: "children"
};
function deepFindTreePath(tree, handler, config) {
    config = Object.assign(DEFAULT_CONFIG, config);
    const path = [];
    const list = [...tree];
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
            node[children] && list.unshift(...node[children]);
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
 * @param {Number} t 单位（毫秒）
 */
function setCookie(key, value, t) {
    value = setObjectToString(value);
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + t);
    // 不能这样写[目前知道百度浏览器这样写会有bug，获取cookie【document.cookie】的时候会把cookie删除]，一定要像下面这样写
    // oDate = oDate.toGMTString(); 
    document.cookie = key + '=' + encodeURI(value) + ';path=\/;expires=' + oDate.toUTCString();
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
function FN_FORMAT_STRING_VALUE(data) {
    let res = data;
    if (data == null) {
        res = undefined;
    }
    else if (STRING_FALSE === data) {
        res = false;
    }
    else if (STRING_TRUE === data) {
        res = true;
    }
    else if (isString(data) && /^\d+$/.test(data)) {
        res = String(data);
    }
    else {
        try {
            res = JSON.parse(data);
        }
        catch (e) { }
    }
    return res;
}

function getCookie(key, target) {
    target = target || document.cookie;
    let res = '';
    target.replace(new RegExp('(^|;\\s)' + key + '=(.*?)($|(;\\s))'), function (g, prefix, value) {
        res = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(value));
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

const defaultSplitArr = [_NULL, _NULL];
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
        if (sb[1] == _NULL) {
            res.push(originValue);
        }
        else {
            if (/^\[[\D]+\]/.test(sb[1])) {
                res[nowKey] = _Map(res[nowKey]);
            }
            else {
                res[nowKey] = _Array(res[nowKey]);
            }
            handleDeepKey(res[nowKey], sb[1], originValue);
        }
    }
    else {
        if (sb[1] == _NULL) {
            res[nowKey] = originValue;
        }
        else {
            if (/^\[[\D]+\]/.test(sb[1])) {
                res[nowKey] = _Map(res[nowKey]);
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
    if (str == _NULL) {
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
    var res = {}, href, hasChlid, queryKey;
    try {
        href = WINDOW.location.href;
    }
    catch (e) {
        href = '';
    }
    str = isString(str) ? str : href;
    str.replace(/([^=&?/#]*?)=([^=&?/#]*)/g, function (_, key, val) {
        val = FN_FORMAT_STRING_VALUE(DECODE_URI_COMPONENT(val));
        queryKey = DECODE_URI_COMPONENT(key);
        hasChlid = false;
        if (queryKey !== '') {
            queryKey.replace(/(.*?)(\[.*)/, function (_, k, m) {
                var sb = splitSymbol(m);
                hasChlid = true;
                if (isPreLikeArray(sb[0])) {
                    res[k] = _Array(res[k]);
                }
                else {
                    res[k] = _Map(res[k]);
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
    var link = document.createElement('a');
    link.style.display = 'none';
    link.download = fileName;
    link.setAttribute('href', url);
    document.body.appendChild(link);
    link.click();
    link.remove();
    link = undefined;
}

function downloadFileByArrayBuffer(data, fileName) {
    const url = window.URL.createObjectURL(new Blob([data]));
    downloadFileByUrl(url, fileName);
    window.URL.revokeObjectURL(url);
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

function PAD_STRING(padTarget, targetLength, padString, direction) {
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
    return PAD_STRING(data, len, target, -1);
}

function padEnd(data, len, target) {
    return PAD_STRING(data, len, target, 1);
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
        decp = padEnd(decp, fractionDigits, ZERO_STRING);
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
            decp = padEnd(decp, fractionDigits, ZERO_STRING);
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
    props = _Map(props);
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
    const length = maxIndex + 1;
    currentIndex = (currentIndex + increase) % length;
    // 如果是负数，就加回来
    if (currentIndex < 0) {
        currentIndex = currentIndex + length;
    }
    return currentIndex === -0 ? 0 : currentIndex;
}

function simpleClone (data) {
    data = JSON.stringify(data);
    data = jsonParse(data);
    return data;
}

function zeroTo2 (data) {
    return padStart(data, 2, '0');
}

function formatFunc(units, unitIndex, data) {
    const item = units[unitIndex];
    let res = item === '' ? '' : zeroTo2(data) + item;
    return res;
}
function handleOne(startTime, endTime) {
    var refer = startTime.split[0];
    var modify = endTime.split[1];
    for (var a = 0; a < refer.length; a++) {
        if (refer[a] === modify[a]) {
            modify[a] = "";
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
            formatFunc(units, 6, date.getMilliseconds()),
        ];
        result.push({
            value: list[a],
            timestamp: +date,
            split: [fmt, simpleClone(fmt)],
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
        item.label = trim(item.split.join(""));
    }
    return result;
}

/**
 * 转换文件大小
 * @param {Number} value 文件大小
 * @param {Number} [unit="Bytes"] 传入大小的单位。可选：["KB", "Bytes"]
 * @return {Object} 计算后的详细信息
 */
function fileSize(value, unit) {
    var bit = value;
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
    var _tb = floorFixed(bit / TB, 2);
    var _gb = floorFixed(bit / GB, 2);
    var _mb = floorFixed(bit / MB, 2);
    var _kb = floorFixed(bit / KB, 2);
    var _bytes = floorFixed(bit / Bytes, 2);
    var format = '';
    if (+_tb >= 1) {
        format = _tb + ' TB';
    }
    else if (+_gb >= 1) {
        format = _gb + ' GB';
    }
    else if (+_mb >= 1) {
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
    try {
        el.parentNode.removeChild(el);
    }
    catch (e) {
    }
}

//阻止冒泡及默认行为
function prevent(ev, bubble, stop) {
    ev = ev || WINDOW.event;
    bubble = bubble === false ? false : true;
    stop = stop === false ? false : true;
    bubble && WINDOW.event ? WINDOW.event.cancelBubble = true : ev.stopPropagation();
    stop && WINDOW.event ? WINDOW.event.returnValue = false : ev.preventDefault();
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

/**
 * 生成随机ID
 * @param {Number} [length = 24] 生成的字符串长度，最大24
 *
 * @return {String}
 */
function uuid(length) {
    length = _Number(length);
    let multiplicand = '';
    for (let a = 0; a < 13; a++)
        multiplicand += getRandom(1, 9);
    multiplicand = _Number(multiplicand);
    const stamp = +new Date();
    const num = stamp * getRandom(1, String(stamp).length) + multiplicand;
    const letterRandom = LETTER_LIST[getRandom(0, LETTER_LIST.length)]; // 第一位字母
    let res = (letterRandom + multiplicand.toString(32) + num);
    res = length ? res.substring(0, length) : res;
    return res;
}

function _Boolean(data) {
    if (data === true || data === 'true' || data === '1' || data === 1) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 获取本地存储
 *
 * @param {String} key
 * @return {Object|Array|String}
 */
function getStorage(key) {
    return FN_FORMAT_STRING_VALUE(localStorage.getItem(key));
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
function SET_STRING_VALUE(val) {
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
    localStorage.setItem(key, SET_STRING_VALUE(val));
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

function getfile(gid, oHead, type, url, callback) {
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
    oElement.onload = oElement.onerror = callback;
    oHead.appendChild(oElement);
}

let _setting = {};
let times = 0;
let oHead = document.getElementsByTagName("head")[0];
function getMuti(times, id, alias, callback) {
    const result = [];
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
function getOne(times, id, aliasName, callback) {
    const item = _setting.alias && _setting.alias[aliasName];
    let errorMsg = '';
    if (!item) {
        errorMsg = `alias "${aliasName}" is't configured`;
    }
    if (errorMsg) {
        throw errorMsg;
    }
    const isJsFile = /^js/.test(aliasName);
    function onSuccess() {
        item._complete = true;
        if (!isFunction(callback))
            return;
        if (isJsFile) {
            callback(window[item.moduleName]);
        }
        else {
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
    else if (!item._depenIsLoad &&
        item.dependencies &&
        item.dependencies.length > 0) {
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
        });
        getfile(item._deeps, oHead, fileType, filePath, onSuccess);
    }
}
function loadJsAndCss(alias, callback) {
    times++;
    if (typeof alias === "object") {
        getMuti(times, 1, alias, callback);
    }
    else {
        getOne(times, 1, alias, callback);
    }
}
loadJsAndCss.config = function (setting) {
    if (!isEmptyMap(_setting))
        throw "config is already configured";
    _setting = setting;
};
loadJsAndCss.getConfig = function () {
    return _setting;
};

exports._Array = _Array;
exports._Boolean = _Boolean;
exports._Map = _Map;
exports._Number = _Number;
exports._String = _String;
exports.changeIndex = changeIndex;
exports.clean = clean;
exports.dataCacheUtil = dataCacheUtil;
exports.deepFindItem = deepFindItem;
exports.deepFindTreePath = deepFindTreePath;
exports.defaultValue = defaultValue;
exports.downloadFileByArrayBuffer = downloadFileByArrayBuffer;
exports.downloadFileByUrl = downloadFileByUrl;
exports.fileSize = fileSize;
exports.flatTree = flatTree;
exports.floorFixed = floorFixed;
exports.getCookie = getCookie;
exports.getJsFileBaseUrl = getJsFileBaseUrl;
exports.getRandom = getRandom;
exports.getRelativePos = getRelativePos;
exports.getStorage = getStorage;
exports.getType = getType;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isMap = isMap;
exports.isNull = isNull;
exports.need = loadJsAndCss;
exports.padEnd = padEnd;
exports.padStart = padStart;
exports.param = param;
exports.parseQuery = parseQuery;
exports.prevent = prevent;
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

Object.defineProperty(exports, '__esModule', { value: true });

return exports;

})({});
//# sourceMappingURL=index.js.map
