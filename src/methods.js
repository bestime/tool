const $createStyle = require('./split/$createStyle')

module.exports = {
  _Array: require('./split/_Array.js'),
  _Boolean: require('./split/_Boolean'),
  _Function: require('./split/_Function'),
  _Number: require('./split/_Number'),
  _Object: require('./split/_Object'),
  _String: require('./split/_String'),
  _http: require('./split/_http'),
  _https: require('./split/_https'),
  _Url: require('./split/_Url'),
  _UpperCase: require('./split/_UpperCase'),
  symbolNumber: require('./split/symbolNumber'),
  addClass: require('./split/addClass'),
  average: require('./split/average'),
  barCode: require('./split/barCode'), // 意义不大，考虑移除
  bind: require('./split/bind'),
  clone: require('./split/clone'),
  convertTime: require('./split/convertTime'),
  createUUID: require('./split/createUUID'),
  defaultType: require('./split/defaultType'),
  drag: require('./split/drag'),
  fillHtml: require('./split/fillHtml'),
  fixed: require('./split/fixed'),
  getByClass: require('./split/getByClass'),
  getById: require('./split/getById'),
  getCookie: require('./split/getCookie'),
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
  loading: require('./split/loading'), // 考虑移除
  numberMax: require('./split/numberMax'), // 意义不大，考虑移除
  numberMin: require('./split/numberMin'), // 意义不大，考虑移除
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
  throttle: require('./split/throttle'), // 有改进版，准备移除
  debounce: require('./split/debounce'), // 有改进版，准备移除
  FunctionOnce: require('./split/FunctionOnce'), // 意义不大，考虑移除
  FunctionConfirm: require('./split/FunctionConfirm'), // 意义不大，考虑移除
  FunctionLoop: require('./split/FunctionLoop'), // 有改进版，准备移除
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
  Pager: require('./split/Pager'),
  numberLimit: require('./split/numberLimit'), // 意义不大，考虑移除
  trim: require('./split/trim'),
  toggleClass: require('./split/toggleClass'),
  clean: require('./split/clean'),
  assign: require('./split/assign'),
  mapJson: require('./split/mapJson'),
  forEach: require('./split/forEach'),
  map: require('./split/map'),
  filter: require('./split/filter'),
  some: require('./split/some'),
  find: require('./split/find'),
  indexOf: require('./split/indexOf'),
  reduce: require('./split/reduce'),
  scrollToElement: require('./split/scrollToElement'),
  scrollToBottom: require('./split/scrollToBottom'),
  ContainerFollowMouse: require('./split/ContainerFollowMouse'), // 考虑移除
  DomMouse: require('./split/DomMouse'),  // 考虑移除
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
  write: require('./split/write'),
  array: require('./split/array'),
  pcScroll: require('./split/pcScroll'),
  JSONPARSE: require('./split/JSONPARSE'),
  $null: require('./split/$null'),
  CreateToast: require('./split/CreateToast'),
  authorization: require('./split/authorization'),
  fullScreen: require('./split/fullScreen'),
  isFullScreen: require('./split/isFullScreen'),
  formatTime: require('./split/formatTime'),
  FN_debounce: require('./split/FN_debounce'),
  FN_throttle: require('./split/FN_throttle'),
  FN_confirm: require('./split/FN_confirm'),
  FN_loop: require('./split/FN_loop'),
};