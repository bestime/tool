
const imageTypes = ['jpg', 'png', 'gif', 'jpeg']

/**
 * 判断文件类型是否是图片
 * @param fileType 
 * @returns 
 */
export default function isImageType (fileType: string) {
  return imageTypes.includes(fileType)
}