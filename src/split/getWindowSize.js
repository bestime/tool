/**
 * 获取可视区域宽高
 */
function getWindowSize () {
	return {
		width: document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 0,
		height: document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 0
	};
}

module.exports = getWindowSize
