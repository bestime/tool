module.exports = function (data) {
  switch (typeof data) {
    case 'number': data = String(data); break;
    case 'undefined': data = ''; break;
  }
  
  return data
}