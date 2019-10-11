function $HTTP (url, mode) {
  let find, res = String(url).replace(/.*?(?=:\/\/)/, function (pre) {
    find = true
    return /http/.test(pre) ? mode : pre
  });
  return find ? res : `${mode}://${url}`
}

module.exports = $HTTP