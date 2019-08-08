/**
 * 
 * @param {Dom} el 返回顶部的容器，默认body 
 */
function backTop (el) {
	var currentTop = 0;
	if(el) {
		currentTop = el.scrollTop;
	}else {
		currentTop = document.documentElement.scrollTop || document.body.scrollTop;
	}
	
	var timer = null;
	clearInterval(timer);
	timer = setInterval(function() {
		currentTop = parseInt(currentTop - (currentTop / 5));
		if (currentTop <= 0) {
			clearInterval(timer);
			return false;
		}
		if(el) {
			el.scrollTop = currentTop
		}else {
			window.scrollTo(0, currentTop);
		}		
	}, 30);
}

module.exports = backTop