/**  
 * 个人工具库 => jUtilsBrowser
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 * @update 2023-10-13 15:58:19
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@bestime/utils_base")):"function"==typeof define&&define.amd?define(["exports","@bestime/utils_base"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).jUtilsBrowser={},e.jUtilsBase)}(this,function(e,t){"use strict";e.getWindowSize=function(){return{width:document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth||0,height:document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight||0}},e.test=function(e){return t._String(e)}});
