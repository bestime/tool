const getName= (d) =>{
  return '还好' + d
}

export default function (prefix) {
  return `hello ${prefix} = ${getName(+new Date())}`
}