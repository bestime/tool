

const CreateEventBus = require('./split/CreateEventBus')
const getConfig = require('./split/getConfig')
const setConfig = require('./split/setConfig')
const isObject = require('./split/isObject')

/**
 * 工具内部使用的订阅发布，外部无法使用 
 */
function InnerBus () {
  var NAME = 'inner-bus'
  var bus = getConfig(NAME)
  if(!isObject(bus)) {
    bus = new CreateEventBus()
    setConfig(NAME, bus)
  }
  return bus
}

module.exports = InnerBus