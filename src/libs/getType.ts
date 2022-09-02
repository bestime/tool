import { $ObjectTypeNameBigPrototypeToString} from './help/hpConsts'


export default function getType (data: any): string {
  return $ObjectTypeNameBigPrototypeToString.call(data).slice(8, -1)
}

