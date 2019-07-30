var const_DOMContentLoaded = 'DOMContentLoaded';
var const_onreadystatechange = 'onreadystatechange'
var const_complete = 'complete';

//文档加载完成【仅指文档就绪，图片等资源可能没有加载完成】
function ready (callback) {
    var arg = arguments;
    if (document.addEventListener) {
        document.addEventListener(const_DOMContentLoaded, function () {
            document.removeEventListener(const_DOMContentLoaded, arg.callee, false);
            callback();
        }, false)
    }else if (document.attachEvent) {
        document.attachEvent(const_onreadystatechange, function () {
                if (document.readyState == const_complete) {
                    document.detachEvent(const_onreadystatechange, arg.callee);
                    callback();
                }
        })
    }else if (document.lastChild == document.body) {
        callback();
    }
}

module.exports = ready