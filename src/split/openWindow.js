import { WINDOW } from './basic/browser'

/**
 * 新开一个浏览器窗口，用于解决在ajax中window.open被阻止的问题
 * 例子看最下面
 * 
 * @param {String} title 打开的空页面的过渡标题
 * @param {Function:(jump(url), close)} callback 回调函数，jump(url)执行最终页面，close关闭过渡页面
 */
export default function openWindow (title, callback) {
  var newWindow = WINDOW.open('about:blank')
  title = title || '加载中，请稍候...'
  newWindow.document.write('\
    <!DOCTYPE html>\
    <html lang="en">\
      <head>\
        <title>'+ title +'</title>\
      </head>\
    </html>'
  );
  callback(
    function (url) {
      newWindow.location = url
    },
    function () {
      newWindow.close()
    }
  )
}



/*

// 例子
ns.openWindow('维护商后台', function (jump, close) {
  $.ajax({
    url: 'http://192.168.0.201:8087/info/index',
    success: function (res, msg, xhr) {
      jump('http://www.baidu.com')
    },
    error: function () {
      close()
    }
  })
})
*/