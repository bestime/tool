import _KvPair from "./_KvPair"
import _Number from "./_Number"
import isEmpty from "./isEmpty"
import isLikeNumber from "./isLikeNumber"
import isNull from "./isNull"
import trim from "./trim"

interface INumConfig {
  min?: number
  max?: number
  required?: boolean
  unit?: string
}

/**
 * 数字校验
 * @param name 校验的名称
 * @param data 校验的数据
 * @param config 校验其他配置
 * @returns 
 */
export default function validatorNumbervalidatorNumber (name: string, data: any, config?: INumConfig) {
  config = _KvPair(config)
  let message = ''
  let success = true
  const unit = trim(config.unit)
  const hasMin = !isNull(config.min)
  const hasMax = !isNull(config.max)

  const noData = isEmpty(data)

  if(noData) {
    success = !config.required
  } else if(isLikeNumber(data)) {
    const num = _Number(data)
    if(hasMin && hasMax) {
      if(num < config.min! || num > config.max!) {
        success = false
      }
    }else if(hasMin) {
      if(num < config.min!) {
        success = false
      }
    } else if(hasMax) {
      if(num > config.max!) {
        success = false
      }
    }
  } else {
    success = false
  }

  

  if(!success) {
    if(noData) {
      message = '请输入' + name
    } else if(!isLikeNumber(data)) {
      message = `${name}必须为数字`
    } else if(hasMin && hasMax) {
      message = `${name}范围为${config.min}至${config.max}${unit}`
    } else if(hasMin) {
      message = `${name}最小值为${config.min}${unit}`
    } else if(hasMax) {
      message = `${name}最大值为${config.max}${unit}`
    }
  }

  return {
    success,
    message
  }
} 