
import floorFixed from './floorFixed'

import { Bytes, KB, GB, MB, TB } from './basic/constant'


/**
 * 转换文件大小
 * @param {Number} value 文件大小
 * @param {Number} [unit="Bytes"] 传入大小的单位。可选：["KB", "Bytes"]
 * @return {Object} 计算后的详细信息
 */
export default function fileSize (value, unit) {
  var bit = value;
  switch(unit) {
    case 'MB':
      bit = value * MB
      break;
    case 'KB':
      bit = value * KB 
      break;
    case 'Bytes':
      bit = value * Bytes 
      break;
  }

  var _tb = floorFixed(bit/TB, 2);
  var _gb = floorFixed(bit/GB, 2);
  var _mb = floorFixed(bit/MB, 2);
  var _kb = floorFixed(bit/KB, 2);
  var _bytes = floorFixed(bit/Bytes, 2);

  var format = '';

  if(_tb>=1) {
    format = _tb + ' TB'
  } else if(_gb>=1) {
    format = _gb + ' GB'
  } else if(_mb>=1) {
    format = _mb + ' MB'
  } else {
    format = _kb + ' KB'
  }

  return {
    Bit: bit,
    Bytes: _bytes,
    KB: _kb,
    MB: _mb,
    GB: _gb,
    TB: _tb,
    format: format
  }
}


/*

// => {"Bit":9011.2,"Bytes":"1126.40","KB":"1.10","MB":"0.00","GB":"0.00","TB":"0.00","format":"1.10KB"}
JSON.stringify(fileSize(1.1, 'KB'))

*/