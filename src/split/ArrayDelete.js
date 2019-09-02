
const forEach = require('./forEach')
const getType = require('./getType')

function ArrayDelete (arr, data) {
  for(var a = arr.length-1; a >= 0; a--) {
    switch (getType(data)) {
      case 'Array':
        forEach(data, function (item) {
          arr[a] === item && arr.splice(a, 1)
        })
        break;
      case 'Function':
        data(arr[a], a, arr) === true && arr.splice(a, 1)
        break;
      default:
        arr[a] === data && arr.splice(a, 1)
    }
  }
  return arr
}

module.exports = ArrayDelete