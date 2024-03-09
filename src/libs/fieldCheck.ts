import getType from './getType';
import isEmpty from './isEmpty';
import isLikeNumber from './isLikeNumber';

type CheckType = 'String' | 'Number';

function basicCheck<T>(note: string, data: any, required: boolean, type: CheckType): T {
  note = `【${note}】`;

  if (required && isEmpty(data)) {
    throw `字段${note}不能为空`;
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
          throw `字段${note}必须为数字`;
        }
        break;
    }
  }
  return data as T;
}

const fieldCheck = {
  /**
   * 验证传入的数据是否是数字
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns 
   */
  number(title: string, value: any, required = true) {
    return basicCheck<number>(title, value, required, 'Number');
  },

  /**
   * 验证传入的数据是否是字符串
   * @param title - 标题
   * @param value - 值
   * @param required - 是否必填
   * @returns 
   */
  string(title: string, value: any, required = false) {
    return basicCheck<string>(title, value, required, 'String');
  }
};

export default fieldCheck;
