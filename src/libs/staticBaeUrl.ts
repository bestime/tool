let staticBase: string | undefined

export function setBaseUrl (data: string) {
  staticBase = data
}

export default function resolveBaseUrl (path: string) {
  return `${staticBase}/readonly-npm-utils-maptalks${path}`
}