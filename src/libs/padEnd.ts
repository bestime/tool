import PAD_STRING from './help/hpPadString'

export default function padEnd (data: string | number, len: number, target: string) {
  return PAD_STRING(data, len, target, 1)
}