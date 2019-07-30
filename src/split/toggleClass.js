const hasClass = require('./hasClass')
const addClass = require('./addClass')
const removeClass = require('./removeClass')

function toggleClass (el, className) {
  hasClass(el, className) ? removeClass(el, className) : addClass(el, className)
}

module.exports = toggleClass