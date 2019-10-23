function FN_FORMAT_STRING_VALUE (data) {
  switch (typeof data) {
    case 'undefined':
    case 'null': break;
    default:
      if (/^\d+$/.test(data)) {
        data = Number(data)
      } else if(res == 'false') {
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