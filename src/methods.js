import _String from './split/_String'
import _UpperCase from './split/_UpperCase'
import isObject from './split/isObject'
import assign from './split/assign'
import forEach from './split/forEach'
import getType from './split/getType'
import isString from './split/isString'
import _Array from './split/_Array'
import isArray from './split/isArray'
import JSONPARSE from './split/JSONPARSE'
import urlToGet from './split/urlToGet'
import param from './split/param'
import split from './split/split'
import trim from './split/trim'
import some from './split/some'
import thousands from './split/thousands'
import urlIsLocal from './split/urlIsLocal'
import updateWebVersion from './split/updateWebVersion'
import parseQuery from './split/parseQuery'
import updateQuery from './split/updateQuery'
import isIncluded from './split/isIncluded'
import _Object from './split/_Object'
import _Number from './split/_Number'
import _Boolean from './split/_Boolean'
import _Function from './split/_Function'
import $createStyle from './split/$createStyle'
import fillHtml from './split/fillHtml'
import filter from './split/filter'
import fileSize from './split/fileSize'
import floorFixed from './split/floorFixed'
import padEnd from './split/padEnd'
import repeatString from './split/repeatString'
import padStart from './split/padStart'
import shuffle from './split/shuffle'
import addClass from './split/addClass'
import hasClass from './split/hasClass'
import isEmpty from './split/isEmpty'
import _Url from './split/_Url'
import roundFixed from './split/roundFixed'
import getRandom from './split/getRandom'
import unique from './split/unique'
import updateClass from './split/updateClass'
import scrollToElement from './split/scrollToElement'
import getRelativePos from './split/getRelativePos'
import getScrollPosition from './split/getScrollPosition'
import isFunction from './split/isFunction'
import TimeLast from './split/TimeLast'
import timeFormatToRecent from './split/timeFormatToRecent'
import convertTime from './split/convertTime'
import RMB from './split/RMB'
import clean from './split/clean'
import defaultType from './split/defaultType'
import map from './split/map'
import bind from './split/bind'
import unbind from './split/unbind'
import prevent from './split/prevent'
import ready from './split/ready'
import pcScroll from './split/pcScroll'
import clone from './split/clone'
import removeClass from './split/removeClass'
import arrayExchangeIndex from './split/arrayExchangeIndex'
import removeElement from './split/removeElement'
import numberRange from './split/numberRange'
import onDomRoll from './split/onDomRoll'
import openWindow from './split/openWindow'
import backTop from './split/backTop'
import bindEasy from './split/bindEasy'
import createDebounce from './split/createDebounce'
import CreateEventBus from './split/CreateEventBus'
import createLoop from './split/createLoop'
import createThrottle from './split/createThrottle'
import dataLayout from './split/dataLayout'
import equal from './split/equal'
import find from './split/find'
import fullScreen from './split/fullScreen'
import getByClass from './split/getByClass'
import isSupportStyle from './split/isSupportStyle'
import getWindowSize from './split/getWindowSize'
import indexOf from './split/indexOf'
import getEventTarget from './split/getEventTarget'
import formatTime from './split/formatTime'
import getCookie from './split/getCookie'
import getImgSize from './split/getImgSize'
import getJsPath from './split/getJsPath'
import $HTTP from './split/$HTTP'
import getStorage from './split/getStorage'
import getMonthInfo from './split/getMonthInfo'
import getNowStep from './split/getNowStep'
import getRandomArray from './split/getRandomArray'
import Parabola from './split/Parabola'
import isFuzzyMatch from './split/isFuzzyMatch'
import isNumber from './split/isNumber'
import mouseWheel from './split/mouseWheel'
import toggleClass from './split/toggleClass'
import getStyle from './split/getStyle'
import notRefreshToChangeUrl from './split/notRefreshToChangeUrl'
import onlyOneAddClass from './split/onlyOneAddClass'
import reduce from './split/reduce'
import removeCookie from './split/removeCookie'
import removeStorage from './split/removeStorage'
import replaceCustom from './split/replaceCustom'
import scrollToBottom from './split/scrollToBottom'
import sectionMerger from './split/sectionMerger'
import setCookie from './split/setCookie'
import setStorage from './split/setStorage'
import symbolNumber from './split/symbolNumber'
import encodeHTML from './split/encodeHTML'
import decodeHTML from './split/decodeHTML'

export default {
  decodeHTML,
  encodeHTML,
  symbolNumber,
  setStorage,
  setCookie,
  sectionMerger,
  scrollToBottom,
  replaceCustom,
  removeStorage,
  removeCookie,
  reduce,
  onlyOneAddClass,
  notRefreshToChangeUrl,
  getStyle,
  toggleClass,
  mouseWheel,
  isNumber,
  isFuzzyMatch,
  Parabola,
  getRandomArray,
  getNowStep,
  getMonthInfo,
  getStorage,
  _http: function (url) { return $HTTP(url, 'http') },
  _https: function (url) { return $HTTP(url, 'https') },
  getJsPath,
  getImgSize,
  getCookie,
  formatTime,
  getEventTarget,
  indexOf,
  getWindowSize,
  isSupportStyle,
  getByClass,
  fullScreen,
  find,
  equal,
  dataLayout,
  createThrottle,
  createLoop,
  CreateEventBus,
  createDebounce,
  bindEasy,
  backTop,
  openWindow,
  onDomRoll,
  numberRange,
  removeElement,
  arrayExchangeIndex,
  removeClass,
  clone,
  pcScroll,
  ready,
  prevent,
  unbind,
  bind,
  map,
  defaultType,
  clean,
  convertTime,
  timeFormatToRecent,
  TimeLast,
  isFunction,
  getScrollPosition,
  getRelativePos,
  scrollToElement,
  updateClass,
  unique,
  getRandom,
  roundFixed,
  _Url,
  isEmpty,
  hasClass,
  addClass,
  RMB,
  shuffle,
  padStart,
  repeatString,
  padEnd,
  floorFixed,
  fileSize,
  filter,
  fillHtml,
  $createStyle,
  style: $createStyle(),
  _Function,
  _Boolean,
  _Object,
  _String,
  _UpperCase,
  isObject,
  assign,
  forEach,
  getType,
  isString,
  _Array,
  isArray,
  JSONPARSE,
  urlToGet,
  param,
  split,
  trim,
  some,
  thousands,
  urlIsLocal,
  updateWebVersion,
  parseQuery,
  updateQuery,
  isIncluded,
  _Number
};