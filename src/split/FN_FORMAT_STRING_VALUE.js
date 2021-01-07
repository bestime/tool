
/**
 * 解析字符串
 * 1、布尔值转换
 * 2、数字转换为字符串
 * 3、尝试解析json数据
 * 
 * @param {String} data
 * 
 * @return {*}
 */
function FN_FORMAT_STRING_VALUE (data) {
  switch (typeof data) {
    case 'undefined':
    case 'null': break;
    default:
      if (/^\d+$/.test(data)) {
        data = String(data);
      } else if(data == 'false') {
        data = false
      }else if(data == 'true') {
        data = true
      } else {
        try { data = JSON.parse(data) } catch (e) {}
      }
  }
  return data
}

module.exports = FN_FORMAT_STRING_VALUE