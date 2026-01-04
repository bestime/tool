

export { default as SeamlessScroll } from './libs/SeamlessScroll'


import { style } from "@bestime/utils_browser"

style(`
  .seamless_scroll_wrapper{overflow:hidden;margin:0;padding:0;border:none;}
  .seamless_scroll_content{overflow:hidden;margin:0;padding:0;border:none;}
  .seamless_scroll_content_copy{overflow:hidden;display:none;margin:0;padding:0;border:none;}
  .seamless_scroll_wrapper.enabled .seamless_scroll_content_copy{display:block;margin:0;padding:0;border:none;}
`)