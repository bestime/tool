function scrollToElement (dom, oFather, callback) {
  oFather = oFather || dom.parentNode
  var timer, now = oFather.scrollTop, to = dom.offsetTop, step = 10;
  timer = setInterval(function () {
    if(now<to) {
      now += step
      if(now>=to) {
        now = to
      }
    } else {
      now -= to
      if(now<=to) {
        now = to
      }
    }
    oFather.scrollTop = now
    now === to && toStop()
  }, 20)

  function toStop () {
    clearInterval(timer)
    typeof callback === 'function' && callback();
  }
}    

module.exports = scrollToElement