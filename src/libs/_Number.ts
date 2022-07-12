

 export default function _Number (data: any): number {
  data = Number(data);
  return data === Math.abs(Infinity) ||  isNaN(data) ? 0 : data
}