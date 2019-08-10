

function hasClass (obj, cl){
  var str = typeof obj === 'string' ? obj : obj.className 
  return str.match(new RegExp('(\\s|^)' + cl + '(\\s|$)'));  
}

module.exports = hasClass