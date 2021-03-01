import { prevZero3, prevZero2 } from './basic/fragment'


export default function convertTime (date) { 
	return {
		year: prevZero2(date.getFullYear()),
		month: prevZero2(date.getMonth() + 1),
		day: prevZero2(date.getDate()),
		hour: prevZero2(date.getHours()),
		minute: prevZero2(date.getMinutes()),
		second: prevZero2(date.getSeconds()),
		milliSecond: prevZero3(date.getMilliseconds())
	}
}