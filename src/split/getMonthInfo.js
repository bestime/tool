const convertTime =  require('./convertTime.js')
const _Number =  require('./_Number.js')
const zero = require('./zero')




function getMonthInfo (timestamp) {
	timestamp = _Number(timestamp) || +new Date()
	var t = convertTime(new Date(timestamp));
	var status = [-1, 0, 1];// -1 上月， 0 当月， 1 下月
	var total = new Date(t.year, t.month, 0).getDate(); // 当月总共多少天
  var firstDayWeek =  getWeek(1) || 7; // 第一天索引
	
	var preStamp = 0
	var nextStamp = 0
	
	// 获取上下月信息
	function getNearMonth (flag) {
		var a_year = t.year
		var a_month = 0;
		if(flag=='pre') {
			a_month = _Number(t.month) - 1;
			if(!a_month) {
				a_month = 12;
				a_year = _Number(t.year) - 1;
			}
			preStamp = +new Date(a_year + '-' + a_month);
		}else if(flag=='next') {
			a_month = _Number(t.month) + 1;
			if(a_month>12) {
				a_month = 1;
				a_year = _Number(t.year) + 1;
			}
			nextStamp = +new Date(a_year + '-' + a_month);
		}
		
		return {
			year: zero(a_year), 
			month: zero(a_month), 
			total: new Date(a_year, a_month, 0).getDate()
		}
	}
	
	
	
	function getDays () {
		var arr = [];
		var currentMonthArr = []
		var day = 0; // 当前几日
		var pre = getNearMonth('pre'); // 上月数据
		var oneData;
		
		var next = getNearMonth('next'); // 下月数据
		for(var a=0; a<42; a++) {
			oneData = null;
			day = a - firstDayWeek + 1;
			if(a<firstDayWeek) {
				// 上月数据
				oneData = {					
					year: pre.year,
					month: pre.month,
					day: pre.total - firstDayWeek + a + 1,
					status: status[0]
				}				
			}else if(firstDayWeek+total<=a) {
				// 下月数据
				oneData = {					
					year: next.year,
					month: next.month,
					day: day - total,
					status: status[2]
				}
			}else {
				// 本月数据
				oneData = {					
					year: t.year,
					month: t.month,
					day: day,
					status: status[1]
				}
				currentMonthArr.push(oneData)
			}
			if(oneData) {
				oneData.year = zero(oneData.year)
				oneData.month = zero(oneData.month)
				oneData.day = zero(oneData.day)
				arr.push(oneData)
			}
		}
		return [currentMonthArr, arr];
	}
	
	// 获取某天星期几
	function getWeek (day) {
		return new Date([t.year, t.month, day].join('/')).getDay()
	}
	
	var filterArr = getDays()
	
	
	var res = {
		current: filterArr[0],// 本月数据数组
		caleandar: filterArr[1],//日历数据数组，日历使用
		t: t,
		firstDayWeek: firstDayWeek,// 第一天星期几
		nowWeek: getWeek(t.day),// 今天星期几
		nextMonthStamp: nextStamp,// 下月时间戳
		preMonthStamp: preStamp, // 上月时间戳
	}
	return res
}

module.exports = getMonthInfo