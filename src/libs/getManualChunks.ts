const prefix = 'auto_chunk'

/**
 * 对node_modules的包进行分包
 * @param data 
 * @returns 
 */
export default function getManualChunks (data: Array<Array<string>>) {
  return data.reduce(function (chunkMap, item, i) {
    const name = `${prefix}_${i}`
    chunkMap[name] = item
    return chunkMap
  }, {} as Record<string, string[]>)
}