function mapJson (data, handle) {
  var res = []
  for(var key in data) {
    res.push(handle(data[key], key))
  }
  return res
}

module.exports = mapJson