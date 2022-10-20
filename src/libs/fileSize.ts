import floorFixed from './floorFixed';

export const Bytes = 8;
export const KB = Bytes * 1024;
export const MB = KB * 1024;
export const GB = MB * 1024;
export const TB = GB * 1024;

const minUnit = 0.1;

/**
 * 转换文件大小
 * @param {Number} value 文件大小
 * @param {Number} [unit="Bytes"] 传入大小的单位。可选：["KB", "Bytes"]
 * @return {Object} 计算后的详细信息
 */
export default function fileSize(
  value: number,
  unit: 'KB' | 'Bytes' | 'MB'
): {
  Bit: number;
  Bytes: string;
  KB: string;
  MB: string;
  GB: string;
  TB: string;
  format: string;
} {
  var bit = value;
  unit = unit || 'Bytes';
  switch (unit) {
    case 'MB':
      bit = value * MB;
      break;
    case 'KB':
      bit = value * KB;
      break;
    case 'Bytes':
      bit = value * Bytes;
      break;
  }

  var _tb: any = bit / TB;
  var _gb: any = bit / GB;
  var _mb: any = bit / MB;
  var _kb: any = bit / KB;
  console.log("_kb", _kb)
  var _bytes: any = bit / Bytes;

  _tb = floorFixed(_tb.toFixed(8), 2)
  _gb = floorFixed(_gb.toFixed(8), 2)
  _mb = floorFixed(_mb.toFixed(8), 2)
  _kb = floorFixed(_kb.toFixed(8), 2)
  _bytes = floorFixed(_bytes.toFixed(8), 2)

  var format = '';

  if (+_tb > minUnit) {
    format = _tb + ' TB';
  } else if (+_gb > minUnit) {
    format = _gb + ' GB';
  } else if (+_mb > minUnit) {
    format = _mb + ' MB';
  } else {
    format = _kb + ' KB';
  }

  return {
    Bit: bit,
    Bytes: _bytes,
    KB: _kb,
    MB: _mb,
    GB: _gb,
    TB: _tb,
    format: format
  };
}

/*

// => {"Bit":9011.2,"Bytes":"1126.40","KB":"1.10","MB":"0.00","GB":"0.00","TB":"0.00","format":"1.10KB"}
JSON.stringify(fileSize(1.1, 'KB'))

*/
