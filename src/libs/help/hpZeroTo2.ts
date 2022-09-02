import padStart from '../padStart'

export default function (data: number) {
  return padStart(data, 2, '0')
}