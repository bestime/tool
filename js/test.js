function addScript (src, callback) {
  var oScript = document.createElement('script')
  if (typeof callback === 'function') {
    oScript.onload = callback
  }
  oScript.src = src
  document.body.appendChild(oScript)
}

addScript('../js/a.js', function () {
  my()
})