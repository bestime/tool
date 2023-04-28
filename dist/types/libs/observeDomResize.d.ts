/**
  * 监听DOM尺寸变化
  * @param element - dom元素
  * @param handler - 变换回调函数
  * @param type - 监听类型。默认width+height
  * @param interval - 多久检查一次。默认值：500
  * @returns 销毁方法
  *
  */
export default function observeDomResize(element: HTMLElement, handler: (element: HTMLElement) => void, type?: ('width' | 'height' | 'position')[], interval?: number): () => void;
