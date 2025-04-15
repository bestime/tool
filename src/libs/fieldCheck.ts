import getType from './getType';
import isEmpty from './isEmpty';
import isLikeNumber from './isLikeNumber';

type CheckType = 'String' | 'Number';
type TValidator<T> = (data: T) => void | string | undefined

function basicCheck<T>(note: string, data: any, required: boolean, type: CheckType, validator?: TValidator<T>) {  
  let errorMessage: string | undefined | void

  if (required && isEmpty(data)) {
    errorMessage = `不能为空`;
  }

  if (getType(data) !== type) {
    switch (type) {
      case 'String':
        data = String(data);
                
        break;
      case 'Number':
        if (isLikeNumber(data)) {
          data = Number(data);
        } else {
          errorMessage = `必须为数字`
        }
        break;
    }
  }

  if(!errorMessage && validator) {
    errorMessage = validator(data)
  }
  if(errorMessage) {
    errorMessage = `[${note}]：${errorMessage}`
  }
  return {
    value: data as T,
    error: errorMessage
  };
}

const fieldCheck = {
  /**
   * 验证传入的数据是否是数字
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns 
   */
  number(title: string, value: any, required?: boolean, validator?: TValidator<number>) {
    return basicCheck<number>(title, value, !!required, 'Number', validator);
  },

  /**
   * 验证传入的数据是否是字符串
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns 
   */
  string(title: string, value: any, required?: boolean, validator?: TValidator<string>) {
    return basicCheck<string>(title, value, !!required, 'String', validator);
  }
};

export default fieldCheck;
