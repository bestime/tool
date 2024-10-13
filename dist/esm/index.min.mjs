/*!
 * 构建工具（vite、webpack）使用工具集
 * @author bestime
 * @update 2024-10-13 14:05:55
 */
import{loadEnv as n}from"vite";function e(n,e,r,t,o,i,u){try{var a=n[i](u),c=a.value}catch(n){return void r(n)}a.done?e(c):Promise.resolve(c).then(t,o)}function r(r){var t;r=r||{};var o,i,u={name:"rollup-plugin-html-template",enforce:"pre",configResolved:function(e){t=n(e.mode,e.envDir)},transformIndexHtml:{handler:(o=function*(n,e){var o=e.filename;return/.html.*$/.test(o)?n=n.replace(/({%\s*)(.*?)(\s*%})/g,(function(n,e,o,i){var u;return null!==(u=r[o])&&void 0!==u?u:t[o]})):n},i=function(){var n=this,r=arguments;return new Promise((function(t,i){var u=o.apply(n,r);function a(n){e(u,t,i,a,c,"next",n)}function c(n){e(u,t,i,a,c,"throw",n)}a(void 0)}))},function(n,e){return i.apply(this,arguments)})}};return u}function t(n){return n.reduce((function(n,e,r){return n["auto_chunk_"+r]=e,n}),{})}function o(n){var e={};return n.forEach((function(n){n.target&&(e[n.name]={target:n.target,changeOrigin:n.changeOrigin,ws:n.ws,ssl:n.ssl,timeout:n.timeout,rewrite:function(e){var r=new RegExp("^"+n.name);return e.replace(r,"")}})})),e}export{o as getDevProxy,t as getManualChunks,r as vitePluginHtmlTemplate};
