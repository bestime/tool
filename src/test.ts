const getName= (d: number) =>{
  return '还好' + d
}

export default function (prefix: string) {
  return `hello ${prefix} = ${getName(+new Date())}`
}