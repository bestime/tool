let staticBase: string | undefined

export function setBaseUrl (data: string) {
  staticBase = data
}

export default function resolveBaseUrl (path: string) {
  return `${staticBase}/readonly-utils_maptalks-static${path}`
}