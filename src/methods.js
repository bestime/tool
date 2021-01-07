const $createStyle = require('./split/$createStyle')
const $HTTP = require('./split/$HTTP')


module.exports = {
  throttle: require('./split/throttle'), // 有改进版，准备移除
  debounce: require('./split/debounce'), // 有改进版，准备移除
  FN_debounce: require('./split/FN_debounce'), // 即将废弃
  FunctionOnce: require('./split/FunctionOnce'), // 意义不大，考虑移除
  FunctionConfirm: require('./split/FunctionConfirm'), // 意义不大，考虑移除
  FunctionLoop: require('./split/FunctionLoop'), // 有改进版，准备移除
  numberLimit: require('./split/numberLimit'), // 意义不大，考虑移除
  ContainerFollowMouse: require('./split/ContainerFollowMouse'), // 考虑移除
  DomMouse: require('./split/DomMouse'),  // 考虑移除
  loading: require('./split/loading'), // 考虑移除
  CreateToast: require('./split/CreateToast'), // 即将移除
  numberMax: require('./split/numberMax'), // 意义不大，考虑移除
  numberMin: require('./split/numberMin'), // 意义不大，考虑移除
  barCode: require('./split/barCode'), // 意义不大，考虑移除
  mapJson: require('./split/mapJson'), // 准备移除，用map代替，支持array和对象
  array: require('./split/array'), // 准备移除，没什么用
  zero: require('./split/zero'), // 将被移除，可用 padStart 代替
  createUUID: require('./split/createUUID'), // 用处不大
  isPhone: require('./split/isPhone'), // 用处不大
  write: require('./split/write'), // 即将移除
  average: require('./split/average'), // 即将移除
  openWindow: require('./split/openWindow'),// 即将移除
  drag: require('./split/drag'),// 即将移除
  fixed: require('./split/fixed'),// 即将移除
  Pager: require('./split/Pager'),// 即将移除
  FN_confirm: require('./split/FN_confirm'),// 即将移除
  $null: require('./split/$null'), // 考虑移除
  authorization: require('./split/authorization'), // 考虑移除
  

  
  
  
  _Array: require('./split/_Array.js'),
  _Boolean: require('./split/_Boolean'),
  _Function: require('./split/_Function'),
  _Number: require('./split/_Number'),
  _Object: require('./split/_Object'),
  _String: require('./split/_String'),
  _http: function (url) { return $HTTP(url, 'http') },
  _https: function (url) { return $HTTP(url, 'https') },
  _Url: require('./split/_Url'),
  _UpperCase: require('./split/_UpperCase'),
  symbolNumber: require('./split/symbolNumber'),
  addClass: require('./split/addClass'),
  bind: require('./split/bind'),
  clone: require('./split/clone'),
  convertTime: require('./split/convertTime'),
  defaultType: require('./split/defaultType'),  
  fillHtml: require('./split/fillHtml'),  
  getByClass: require('./split/getByClass'),
  getById: require('./split/getById'),
  getCookie: require('./split/getCookie'),
  getQuery: require('./split/getQuery'), // 发布
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
  isString: require('./split/isString'),
  onDomRoll: require('./split/onDomRoll'),
  Parabola: require('./split/Parabola'), 
  prevent: require('./split/prevent'),
  removeClass: require('./split/removeClass'),
  removeCookie: require('./split/removeCookie'),
  removeElement: require('./split/removeElement'),
  setCookie: require('./split/setCookie'),
  split: require('./split/split'),
  unbind: require('./split/unbind'),
  unique: require('./split/unique'),
  getNowTime: require('./split/getNowTime'),
  dialog: require('./split/dialog'),
  Progress: require('./split/Progress'),
  ready: require('./split/ready'),
  getJsPath: require('./split/getJsPath'), // 发布
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
  trim: require('./split/trim'),
  toggleClass: require('./split/toggleClass'),
  clean: require('./split/clean'),
  assign: require('./split/assign'),
  forEach: require('./split/forEach'),
  map: require('./split/map'),
  filter: require('./split/filter'),
  some: require('./split/some'),
  find: require('./split/find'),
  indexOf: require('./split/indexOf'),
  reduce: require('./split/reduce'),
  scrollToElement: require('./split/scrollToElement'),
  scrollToBottom: require('./split/scrollToBottom'),
  ArrayDelete: require('./split/ArrayDelete'),
  setStorage: require('./split/setStorage'),
  getStorage: require('./split/getStorage'),
  removeStorage: require('./split/removeStorage'),
  CreateEventBus: require('./split/CreateEventBus'),
  isSupportStyle: require('./split/isSupportStyle'),
  Tween: require('./split/Tween'),
  getNowStep: require('./split/getNowStep'),
  getRandomArray: require('./split/getRandomArray'),
  timeFormatToRecent: require('./split/timeFormatToRecent'),
  setConfig: require('./split/setConfig'),
  getConfig: require('./split/getConfig'),
  getMinAndMax: require('./split/getMinAndMax'),
  assembly: require('./split/assembly'),
  isEqualArray: require('./split/isEqualArray'),
  equal: require('./split/equal'),
  TimeLast: require('./split/TimeLast'),
  shuffle: require('./split/shuffle'),
  ArrayExchangeIndex: require('./split/ArrayExchangeIndex'),
  MouseTip: require('./split/MouseTip'),
  updateWebVersion: require('./split/updateWebVersion'),
  updateQuery: require('./split/updateQuery'),
  dataLayout: require('./split/dataLayout'),
  updateClass: require('./split/updateClass'),
  $createStyle: $createStyle,
  style: $createStyle(),  
  pcScroll: require('./split/pcScroll'),
  JSONPARSE: require('./split/JSONPARSE'),
  
  fullScreen: require('./split/fullScreen'),
  isFullScreen: require('./split/isFullScreen'),
  formatTime: require('./split/formatTime'),  
  FN_throttle: require('./split/FN_throttle'),
  FN_loop: require('./split/FN_loop'),
  urlToGet: require('./split/urlToGet'),
  param: require('./split/param'),  
  sectionMerger: require('./split/sectionMerger'), // 发布
  differenceCollect: require('./split/differenceCollect'),
  RMB: require('./split/RMB'),
  FN_FORMAT_STRING_VALUE: require('./split/FN_FORMAT_STRING_VALUE'),
  parseQuery: require('./split/parseQuery/index'),
  urlIsLocal: require('./split/urlIsLocal'),
  notRefreshToChangeUrl: require('./split/notRefreshToChangeUrl'),
  isIncluded: require('./split/isIncluded'),
  fileSize: require('./split/fileSize'),
  repeatString: require('./split/repeatString'),
  padEnd: require('./split/padEnd'),
  padStart: require('./split/padStart'),
  roundFixed: require('./split/roundFixed'),
  floorFixed: require('./split/floorFixed'),
  isFuzzyMatch: require('./split/isFuzzyMatch'),
  numberRange: require('./split/numberRange'),
  allocateNumber: require('./split/allocateNumber'),
  createDebounce: require('./split/createDebounce'),
  createLoop: require('./split/createLoop'),
  createThrottle: require('./split/createThrottle'),
};