import { _TOSTRING} from './constant'


export default function getType (data: any): string {
  return _TOSTRING.call(data).slice(8, -1)
}

