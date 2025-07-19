import trim from "./trim";

export default function checkPhone (data: any) {
  const text = trim(data)
  const reg01 = /^(\+86)?\s?1\d{10}$/
  const reg02 = /^0\d{2,3}-\d{7,8}$/
  return reg01.test(text) || reg02.test(text)
}