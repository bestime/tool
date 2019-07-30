/**
 * 获取当前执行js的路径
 * @param {Number} // 【默认0】 向上取几级目录
 */
function getJsPath (upLevel) {
    upLevel = upLevel || 0; 
	var jsPath = document.scripts;
	jsPath = jsPath[jsPath.length-1].src.substring(0,jsPath[jsPath.length-1].src.lastIndexOf("/") + 1);
	for(var a=0; a < upLevel; a++) {
		jsPath = jsPath.replace(/[^\/]+\/$/g, '');
	}
	
	return jsPath;
}

module.exports = getJsPath