

const getRandom = require('./getRandom')
const _Object = require('./_Object')
const removeElement = require('./removeElement')

/*

// 初始化
const iPro = Progress()

// 开始运动
iPro.run()

// 一定时间后走到最后
iPro.goTo(100)



*/

function Progress (opt) {
  opt = _Object(opt)
  const oFather = opt.oFather || document.body

  let percent = 0;
  let timer, doing;
  let duration = 30

  const oWrapper = document.createElement('div')
  oWrapper.style.cssText = 'display:none;position:absolute;left:0;right:0;top:0;height:2px;z-index:9000;'
  oWrapper.innerHTML = '<b style="width:0;transition:0.1s ease;position:absolute;left:0;top:0;bottom:0;background:rgba(255,139,26);border-radius:100px;box-shadow:0 0 5px rgba(255,139,26,0.5)"></b>'
  oFather.appendChild(oWrapper);
  const oInner = oWrapper.getElementsByTagName('b')[0]

  function run () {
    !doing && (oWrapper.style.display = 'block');
    doing = true
    clearTimeout(timer)
    timer = setTimeout(function () {
      goStep(1)
      percent < 100 && run();
    }, duration)
  }

  function goStep (step) {
    percent += step
    if(doing && percent >= 97) {
      percent = 97 + getRandom(0, 1)
    }

    switch (percent) {
      case 60:
        duration = 250
        break;
      case 70:
        duration = 500
        break;
      case 80:
        duration = 1000
        break;
      case 90:
        duration = 500
        break;
    }
    oInner.style.width = percent + '%';
  }

  function done () {
    clearTimeout(timer)
    removeElement(oWrapper)
  }
  
  return {
    run,
    goTo: function (step) {
      step = Number(step) || 0
      if(step>=100) {
        doing = false
        setTimeout(done, 300)
      }
      
      goStep(step)
    }
  }
}


module.exports = Progress


