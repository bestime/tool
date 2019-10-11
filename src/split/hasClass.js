

function hasClass (obj, cl){
  var str = typeof obj === 'string' ? obj : obj.className 
  return new RegExp('(\\s|^)' + cl + '(\\s|$)').test(str); 
}

module.exports = hasClass