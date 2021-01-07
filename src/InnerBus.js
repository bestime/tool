const CreateEventBus = require('./split/CreateEventBus')
const getConfig = require('./split/getConfig')
const setConfig = require('./split/setConfig')
const isObject = require('./split/isObject')
const BUS_NAME = 'InnerBus'

/**
 * 仅限工具内部使用 => 【订阅发布】
 */
function InnerBus () {
  let bus = getConfig(BUS_NAME);
  if(!isObject(bus)) {
    bus = new CreateEventBus()
    setConfig(BUS_NAME, bus)
  }
  return bus
}

module.exports = InnerBus