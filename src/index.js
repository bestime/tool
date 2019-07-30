var bestimeGroup = {
  _Array: require('./split/_Array.js'),
  _Boolean: require('./split/_Boolean'),
  _Function: require('./split/_Function'),
  _Number: require('./split/_Number'),
  _Object: require('./split/_Object'),
  _String: require('./split/_String'),
  addClass: require('./split/addClass'),
  average: require('./split/average'),
  barCode: require('./split/barCode'),
  bind: require('./split/bind'),
  clear: require('./split/clear'),// 废除
  clone: require('./split/clone'),
  convertTime: require('./split/convertTime'),
  createStyleElement: require('./split/createStyleElement'),
  createUUID: require('./split/createUUID'),
  defaultType: require('./split/defaultType'),
  drag: require('./split/drag'),
  each: require('./split/each'), // 废除
  fillHtml: require('./split/fillHtml'),
  fixed: require('./split/fixed'),
  getByClass: require('./split/getByClass'),
  getById: require('./split/getById'),
  getCookie: require('./split/getCookie'),
  getData: require('./split/getData'),
  getQuery: require('./split/getQuery'),
  getRandom: require('./split/getRandom'),
  getRelativePos: require('./split/getRelativePos'),
  getScrollPosition: require('./split/getScrollPosition'),
  getStyle: require('./split/getStyle'),
  getType: require('./split/getType.js'),
  getWindowSize: require('./split/getWindowSize'),
  hasClass: require('./split/hasClass'),
  isArray: require('./split/isArray'),
  isEmpty: require('./split/isEmpty'),
  isFunction: require('./split/isFunction'),
  isNumber: require('./split/isNumber'),
  isObject: require('./split/isObject'),
  isPhone: require('./split/isPhone'),
  isString: require('./split/isString'),
  loading: require('./split/loading'),
  numberMax: require('./split/numberMax'),
  numberMin: require('./split/numberMin'),
  onDomRoll: require('./split/onDomRoll'),
  Parabola: require('./split/Parabola'),
  prevent: require('./split/prevent'),
  removeClass: require('./split/removeClass'),
  removeCookie: require('./split/removeCookie'),
  removeElement: require('./split/removeElement'),
  setCookie: require('./split/setCookie'),
  split: require('./split/split'),
  trim: require('./split/trim'),// 废除
  unbind: require('./split/unbind'),
  unique: require('./split/unique'),

  throttle: require('./split/throttle'),
  debounce: require('./split/debounce'),
  FunctionOnce: require('./split/FunctionOnce'),
  FunctionConfirm: require('./split/FunctionConfirm'),
  FunctionLoop: require('./split/FunctionLoop'),
  getNowTime: require('./split/getNowTime'),
  zero: require('./split/zero'),
  dialog: require('./split/dialog'),
  Progress: require('./split/Progress'),
  ready: require('./split/ready'),
  getJsPath: require('./split/getJsPath'),
  getMonthInfo: require('./split/getMonthInfo'),
  backTop: require('./split/backTop'),
  getEventTarget: require('./split/getEventTarget'),
  mouseWheel: require('./split/mouseWheel'),
  bindEasy: require('./split/bindEasy'),
  thousands: require('./split/thousands'),
  html: require('./split/html'),
  getImgSize: require('./split/getImgSize'),
  getUserFromIdCard: require('./split/getUserFromIdCard'),
  onlyOneAddClass: require('./split/onlyOneAddClass'),
  replaceCustom: require('./split/replaceCustom'),
  https: require('./split/https'),
  reduce: require('./split/reduce'),// 废除
  Pager: require('./split/Pager'),
  numberLimit: require('./split/numberLimit'),
  map: require('./split/map'),// 废除
  mapJson: require('./split/mapJson'),// 废除
  some: require('./split/some'),// 废除
  toggleClass: require('./split/toggleClass'),
  clean: require('./split/clean')
};


require('./split/polyfill')
module.exports = !function () {
  window['bestime'] = window['ns'] = bestimeGroup;
} ();

