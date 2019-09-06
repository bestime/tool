

const CreateEventBus = require('./split/CreateEventBus')
const getJcy = require('./split/getJcy')
const setJcy = require('./split/setJcy')
const isObject = require('./split/isObject')

/**
 * 工具内部使用的订阅发布，外部无法使用 
 */
function InnerBus () {
  var NAME = 'inner-bus'
  var bus = getJcy(NAME)
  if(!isObject(bus)) {
    bus = new CreateEventBus()
    setJcy(NAME, bus)
  }
  return bus
}

module.exports = InnerBus