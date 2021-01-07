import { WINDOW } from './basic/browser'

/**
 * 获取可视区域宽高
 */
export default function getWindowSize () {
	return {
		width: document.documentElement.clientWidth || document.body.clientWidth || WINDOW.innerWidth || 0,
		height: document.documentElement.clientHeight || document.body.clientHeight || WINDOW.innerHeight || 0
	};
}
