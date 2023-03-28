import hpInterval from './help/hpInterval';

const main: typeof bestime.observeDomResize = function (element, handler, type, interval) {
  interval = interval || 500;
  let width = [0, 0, false];
  let height = [0, 0, false];
  let posLeft = [0,0,false]
  let posTop = [0,0,false]

  const timer = hpInterval.add(timerHandler, interval);
  timerHandler();

  function timerHandler() {
    if (!document.body.contains(element)) {      
      dispose();
      return;
    }

    let isChange = false

    if(type?.includes('position')) {
      const bound = element.getBoundingClientRect()
      posLeft[0] = bound.left
      posLeft[2] = posLeft[0] !== posLeft[1]

      posTop[0] = bound.top
      posTop[2] = posTop[0] !== posTop[1]
    }

    width[0] = element.offsetWidth;
    width[2] = width[0] !== width[1]; // 宽度变化

    height[0] = element.offsetHeight;
    height[2] = height[0] !== height[1]; // 高度变化

    if (width[2]) {
      width[1] = width[0];
      if (type?.includes('width')) {
        isChange = true
      }
    }

    if (height[2]) {
      height[1] = height[0];
      if (type?.includes('height')) {
        isChange = true
      }
    }

    if(posTop[2] || posLeft[2]) {
      posTop[1] = posTop[0];
      posLeft[1] = posLeft[0];
      if(type?.includes('position')) {
        isChange = true
      }
    }

    if (!type || type.length === 0) {
      if (width[2] || height[2] || posTop[2] || posLeft[2]) {
        isChange = true
        
      }
    }

    if(isChange) {
      handler(element);
    }
  }

  function dispose() {
    hpInterval.remove(timer);
    width = undefined!
    height = undefined!
  }

  return dispose;
};

export default main;
