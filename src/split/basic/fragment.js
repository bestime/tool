import padStart from '../padStart'
import { ZERO_STRING } from './constant'

/** 数字不足2位，向前补0 */
export function prevZero2 (num) {
	return padStart(num, 2, ZERO_STRING)
}

/** 数字不足3位，向前补0 */
export function prevZero3 (num) {
	return padStart(num, 3, ZERO_STRING)
}
