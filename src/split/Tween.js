const Tween = {
  Linear: function(t, b, c, d) { 
    return c * t / d + b; 
  },
  Quad: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c *(t /= d)*(t-2) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t-2) - 1) + b;
    }
  },
  Cubic: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t/d - 1) * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
      return c / 2*((t -= 2) * t * t + 2) + b;
    }
  },
  Quart: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t*t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c * ((t = t/d - 1) * t * t*t - 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
    }
  },
  Quint: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2*((t -= 2) * t * t * t * t + 2) + b;
    }
  },
  Sine: {
    easeIn: function(t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOut: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
    }
  },
  Expo: {
    easeIn: function(t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOut: function(t, b, c, d) {
      return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  },
  Circ: {
    easeIn: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
  },
  Elastic: {
    easeIn: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        s = p / 4;
        a = c;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d) == 1) return b + c;
      if (typeof p == "undefined") p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c; 
        s = p / 4;
      } else {
        s = p/(2*Math.PI) * Math.asin(c/a);
      }
      return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function(t, b, c, d, a, p) {
      var s;
      if (t==0) return b;
      if ((t /= d / 2) == 2) return b+c;
      if (typeof p == "undefined") p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) {
        a = c; 
        s = p / 4;
      } else {
        s = p / (2  *Math.PI) * Math.asin(c / a);
      }
      if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
    }
  },
  Back: {
    easeIn: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158;
      return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function(t, b, c, d, s) {
      if (typeof s == "undefined") s = 1.70158; 
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
  },
  Bounce: {
    easeIn: function(t, b, c, d) {
      return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
    },
    easeOut: function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function(t, b, c, d) {
      if (t < d / 2) {
        return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      } else {
        return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    }
  }
};



/**
 * 运动函数
 * update time: 2017-10-26
 * 添加了实时返回改变的属性值得功能
 * [注] => 在使用opacity时，需要先在 css 里面给元素初始化透明属性 opacity:0;FILTER: alpha(opacity=0); 不然 ie 会报错
 * 
 * @param {obj} obj                     运动对象元素
 * @param {Json} attrs                  {json} 变化的属性   值是最终值 (和getTweenValue的有区别)
 * @param {Number} duration             持续时间
 * @param {String} fx                   动画方式
 * @param {Function} callback           回调函数
 * @param {Function} everyTimeCallback  返回实时改变的数据
 * @author bestime 2016/06/14
 * @modify 2016/09/02 将部分在ie7下出错的代码 try catch 并返回。对程序没有影响
 * 
 * 
 */
Tween.move = function(obj, attrs, duration, fx, callback, everyTimeCallback){
  obj.stopMove = function () {
    clearInterval(obj.timer);
  };
  try {
    obj.stopMove();
  } catch (err) {
    //清空对象就属性
    //修复在动画没有执行完，此动画实例却没有停止所导致的ie8及以下的报错以及不再执行的bug
    obj = {};
    attrs = [];
  }
  
  var startTime = getNowTimeStamp();
  var j = {};
  for (var attr in attrs) {
    j[attr] = {};
    if(attr == "opacity"){
      if(obj.currentStyle){
        j[attr].b = parseFloat(obj.currentStyle[attr]);                    
      }else{
        j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
      }
    }else{
      j[attr].b = obj.currentStyle ? parseFloat(obj.currentStyle[attr]) : (isNaN(parseFloat(getComputedStyle(obj)[attr]))?0:parseFloat(getComputedStyle(obj)[attr]));
    }
    j[attr].c = attrs[attr] - j[attr].b;
  }
  var d = duration;
  obj.timer = setInterval(function() {
    var t = getNowTimeStamp() - startTime;
    var nowAttr = {};  //2017-10-26 add
    if ( t >= d ) {
      t = d;
    }
    try {
      for (var attr in attrs) {
        var b = j[attr].b;
        var c = j[attr].c;
        var value = fx(t, b, c, d);
        
        
        if( attr == 'opacity' ) {
          obj.style[attr] = value;
          obj.style.filter = "alpha(opacity=" +(value*100)+ ")";
        }else{
          obj.style[attr] = value + 'px';
        }
        nowAttr[attr] = value; 
        
      }
    }catch(e) {
      clearInterval(obj.timer)
      if(callback) {                    
        return callback('err');
      }
      return;
    }
    
    if (t==d) {
      clearInterval(obj.timer);
      if (typeof callback == 'function') {
        callback.call(obj, true);
      }
    }

    everyTimeCallback && everyTimeCallback(nowAttr); //2017-10-26 add
  }, 16);
};


/**
 * @param {Number} startValue 起始值
 * @param {Number} changeValue 变化的值
 * @param {Tween} fx 动画曲线
 * @param {Number} duration 持续时间
 * @param {Function} 实时变化的回调
 * @return {Object<stop,start>} 返回暂停、继续的接口
 */
Tween.getAnimate = function (startValue, changeValue, fx, duration, callback) {
  var startTime = 0; // 开始时间
  var goneTime = 0; // 相对于duratoin的运行时间		
  var runTime = 0; // 本次动画运行时间，用来多次stop和start累计计算goneTime。
  var isFinish = false; //本次计算是否完毕
  var isStop = true; // 初始化true,是否暂停状态，如果连续执行start或出现bug，所以设置一个状态来判断
  
  var timer = null;
  function start () {	
    if(!isStop) return;
    isStop = false;
    if(isFinish) return;
    startTime = getNowTimeStamp();
    clearInterval(timer);
    timer = setInterval(function () {
      goneTime = getNowTimeStamp() - startTime  + runTime;
      if(goneTime >= duration) {
        goneTime = duration;
        isFinish = true;
        stop();
      }
      var result = fx(goneTime, startValue, changeValue, duration);
      callback && callback(result, isFinish);
    }, 17);
  }
  
  function stop () {
    isStop = true;
    runTime = goneTime;
    clearInterval(timer);
  }
  
  // 初始化自动运行
  start();
  
  // 可停止，并断点续接
  return {
    stop: stop,
    start: start
  }
};

function getNowTimeStamp () {
  return +new Date();
}

export default Tween