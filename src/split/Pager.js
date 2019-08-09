const _Object = require('./_Object')
const _Number = require('./_Number')
const _Function = require('./_Function')
const getByClass = require('./getByClass')
const addClass = require('./addClass')
const forEach = require('./forEach')
const numberLimit = require('./numberLimit')

function Pager (opt) {
  opt = _Object(opt)
  var el = opt.el;
  addClass(el, 'bt-pager')
  if(!el) return;
  el.innerHTML = '\
    <div class="inwp first">首页</div>\
    <div class="inwp pre">上一页</div>\
    <div class="pages"></div>\
    <div class="inwp next">下一页</div>\
    <div class="inwp end">尾页</div>\
    <div class="inwp">\
      <span>共</span>\
      <span class="total-num">0</span>\
      <span>页</span>\
    </div>\
  ';
  var pageTotal = _Number(opt.pageTotal) // 总页数
  var pageActive = _Number(opt.pageActive) // 当前页
  var showNum = _Number(opt.showNum) // 展示的页数,最小值3

  var oPages = getByClass('pages', el)[0]
  var oPre = getByClass('pre', el)[0]
  var oNext = getByClass('next', el)[0]
  var oEnd = getByClass('end', el)[0]
  var oFirst = getByClass('first', el)[0]
  var oTotalNum = getByClass('total-num', el)[0]

  // 跳转
  function goTo (toPage) {      
    toPage = numberLimit(1, pageTotal)(toPage) || 1;
    _Function(opt.onChange)(toPage, function(){
      pageActive = toPage
      update()
    })
  }

  // 获取需要显示的页数
  function getShowPages () {
    pageActive = numberLimit(1, pageTotal)(pageActive)
    showNum = numberLimit(0, pageTotal)(showNum)

    // 计算显示页码的开始和结尾
    var _beforeNum = parseInt(showNum / 2)
    var _start = pageActive - _beforeNum
    var _end = pageActive + (showNum - _beforeNum) - 1

    // 处理尾页
    if(_end>pageTotal) {
      var more = _end - pageTotal
      _end -= more
      _start -= more
    }

    // 处理起始页
    if(_start<1) {
      var pre = 1 - _start
      _start += pre
      _end += pre
    }      

    return {
      start: _start,
      end: _end,
      next: _end < pageTotal ? true : false,
      pre: _start > 1 ? true : false
    }
  }

  function update (newData) {
    newData = _Object(newData)
    var section = getShowPages()
    var _pagehtml = '';
    var _pageText = ''
    var _class = ''

    for(var a=section.start; a<=section.end; a++) {
      _class = a==pageActive ? 'page active' : 'page'
      if(section.pre && a===section.start) {
        _pageText = '... ' + a
      }else if(section.next && a===section.end){
        _pageText = a + ' ...'
      }else {
        _pageText = a
      }        
      _pagehtml += '<span real-page="'+ a +'" class="'+ _class +'">'+ _pageText +'</span>'
    }

    oPages.innerHTML = _pagehtml

    forEach(getByClass('page', oPages), function (onePage) {
      onePage.onclick = function () {
        goTo(onePage.getAttribute('real-page'))
      }        
    })
    
    oTotalNum.innerHTML = pageTotal
  }

  oPre.onclick = function () {
    goTo(pageActive-1)
  }

  oNext.onclick = function () {
    goTo(pageActive+1)
  }

  oFirst.onclick = function () {
    goTo(1)
  }

  oEnd.onclick = function () {
    goTo(pageTotal)
  }

  update()
}

module.exports = Pager