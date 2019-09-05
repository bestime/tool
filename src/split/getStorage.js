function getStorage (key) {
  var res = localStorage.getItem(key)
  try { res = JSON.parse(res) } catch (e) { }
  return res
}

module.exports = getStorage