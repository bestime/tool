/**  
 * 个人工具库 => jUtilsBrowser
 * @QQ 1174295440
 * @author Bestime
 * @see https://github.com/bestime/tool
 * @update 2023-10-13 15:58:19
 */
import{_String}from"@bestime/utils_base";function getWindowSize(){return{width:document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth||0,height:document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight||0}}function test(t){return _String(t)}export{getWindowSize,test};
