
var data = {
  2020: _2020,
  2021: _2021
}




ns.ready(function () {
  var _oldMonthInfo;
  var FN_THR = ns.FN_throttle(500, true, true)
  var oWrapper = document.getElementById('every-day')
  var oUl = oWrapper.getElementsByTagName('ul')[0]
  var oTitle = ns.getByClass('title', oWrapper)[0]
  var recordItem;
  var _liClass = ''
  var _status;
  var list;
  var now;
  
  var headerHtml = '\
    <li class="eq-w7 dds-header first-column">日</li>\
    <li class="eq-w7 dds-header">一</li>\
    <li class="eq-w7 dds-header">二</li>\
    <li class="eq-w7 dds-header">三</li>\
    <li class="eq-w7 dds-header">四</li>\
    <li class="eq-w7 dds-header">五</li>\
    <li class="eq-w7 dds-header">六</li>\
  ';


  function update (monthInfo, record) {
    
    var winSize = ns.getWindowSize()
    var size = winSize.width - 20;
    if(size>800) {
      size = 800
    }
    (function computedSize() {
      if(size % 7 > 0) {
        computedSize(--size)
      } 
    })();
    ns.style('.every-day{width: '+ size +'px;}')
    size = size / 7
    var fontSize = size * 0.3
    var spanSize = size * 0.5
    ns.style('.eq-w7{width: '+ size +'px;height: '+ size +'px;line-height: '+ size +'px;}.every-day li span{width: '+ spanSize +'px;font-size:'+ fontSize +'px;height:'+ spanSize +'px;line-height:'+ spanSize +'px;}')


    _oldMonthInfo = monthInfo
    now = ns.getNowTime()
    list = monthInfo.caleandar
    oTitle.innerHTML = monthInfo.t.year + '年' + ns.padStart(monthInfo.t.month, 2, '0') + '月'
    oUl.innerHTML = headerHtml + ns.map(list, function (item, index) {
      _status = ''	  
      if(record[item.year]) {
        recordItem = record[item.year]['-'.concat(item.month)]
        if(recordItem && recordItem[item.day]) {
          _status = recordItem[item.day].status
        }
      }

      _liClass = 'eq-w7'
      
      if(now.day == item.day && now.month == item.month && now.year == item.year) {
        _liClass += ' current'
      } 

      if(index % 7 === 0) {
        _liClass += ' first-column'
      }

      if(_status) {
        _liClass += ' status status-' + _status
      }

      if(item.status == -1) {
        _liClass += ' pre'
      } else if(item.status == 1) {
        _liClass += ' next'
      }


      return '<li data-code="'+ item.status +'" class="'+ _liClass +'"><span>'+ item.day +'</span></li>'
    }, true, '');

    // 点击按钮事件
    ns.forEach(oUl.getElementsByTagName('li'), function (oLi) {
      oLi.onclick = function () {
        var status = this.getAttribute('data-code')
        if(status==1) {
          toNextMonth()
        } else if(status==-1) {
          toPreMonth()
        }
      }
    })

    function toPreMonth () {
      update(ns.getMonthInfo(monthInfo.preMonthStamp), data)
    }
    function toNextMonth () {
      update(ns.getMonthInfo(monthInfo.nextMonthStamp), data)
    }
    function toNow () {
      update(ns.getMonthInfo(), data)
    }
    

    // 上一月
    ns.getByClass('awl', oWrapper)[0].onclick = toPreMonth
    // 下一月
    ns.getByClass('awr', oWrapper)[0].onclick = toNextMonth
    ns.getByClass('today', oWrapper)[0].onclick = toNow

    
  };

  update(ns.getMonthInfo(), data)
  ns.bindEasy(window, 'resize', function () {
    FN_THR(function () {
      console.log('_oldMonthInfo', _oldMonthInfo)
      if(_oldMonthInfo) {
        update(_oldMonthInfo, data)
      }
    })
  })
});