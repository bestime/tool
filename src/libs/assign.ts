

export default function assign<T extends Record<string, any>, U> (target: T, source: U): T&U {
  return Object.assign(target, source)
}