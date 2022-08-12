import _String from '../_String'
import repeatString from '../repeatString'


export default function PAD_STRING (padTarget: string|number, targetLength: number, padString: string, direction: number): string {
  padTarget = _String(padTarget)
  targetLength = targetLength >> 0;
  if(padTarget.length > targetLength) {
    return padTarget;
  } else {
    targetLength = targetLength - padTarget.length;
    if(padString.length < targetLength) {
      padString += repeatString(padString, targetLength / padString.length)
    }
    if(direction===-1) {
      return padString.slice(0, targetLength) + padTarget;
    } else {
      return padTarget + padString.slice(0, targetLength);
    }
  }
}