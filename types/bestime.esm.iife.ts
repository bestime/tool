declare namespace bestime {  
  /**
   * 默认值处理函数
   * @param data - 需要处理的数据
   * @param value - 如果data为undefined，则返回此值
   * @returns 实际值
   */
   export function defaultValue<T> (data: any, value: T): T

   /**
    * 创建一个url前缀批量转换函数，当前缀代理地址发生变化，方便修改   
    * 
    * @param config - 服务器白名单前缀配置
    * @returns 配置工具
    * @example
    *```javascript
    * // 初始化配置
    * const iUrl = serverConfig({
    *   '@baidu': 'http://www.google.com'
    * })
    * 
    * const apiUrl = iUrl('/@baidu/api/user/info')
    * ```
    */
   export function serverConfig (config: {
     [key: string]: string | null
   }): (path: string) => string
 
   /**
    * 强制转化数据为字符串
    * @param data - 处理的值
    * @returns 实际值
    */
   export function _String (data: any): string
 
   /**
    * 获取数据类型
    * 
    * @param data - 需要判断的数据
    * @return 数据类型字符串
    */
   export function getType (data: any): string
 
   /**
    * 判断数据是否为数组
    * @param data - 判断的值
    * @returns 真假值
    */
   export function isArray (data: any): boolean
 
   /**
    * 判断数据是否为对象
    * @param data - 判断的值
    * @returns 真假值
    */
   export function isMap (data: any): boolean
 
   /**
    * 判断数据是否为函数
    * @param data - 判断的值
    * @returns 真假值
    */
   export function isFunction (data: any): boolean
 
   /**
    * 对象序列化为字符串, 用于URL查询字符串或AJAX请求
    * @param data - 需要转化的数据
    * @returns 转换后的字符串
    */
   export function param (data: {
     [key: string]: any
   }): string
 
   /**
    * 为url链接拼接参数
    * @param url - url地址
    * @param data - 查询参数
    * @returns 拼接后的url地址
    */
   export function urlToGet (url: string, data: string| {
     [key: string]: any
   }): string
   
   /**
    * 移除空字符串
    * @param data - 需要处理的数据
    * @param position - 移除位置。默认：两侧，1：左侧，-1右侧，* 所有
    * @returns 字符串
   */
   export function trim (data: any, position: 1 | -1 | 0 | '*'): string
 
   /**
    * 移除undefined和null数据
    * 
    * @param data - 需要处理的数据
    * @param removeEmptyStr - 是否移除空字符串
    * @returns string
    */
   export function clean<T extends any[]| {
     [key: string]: any
     [key: number]: any
   }> (data: T, removeEmptyStr?: boolean): string
 
   /**
    * 对相同地址的数据进行缓存
    * @param url - 请求地址
    * @returns 处理工具
    */
    export function dataCacheUtil (url: string): {
     isExist: () => boolean,
     set: (data: any) => void,
     get: (success:(data: any) => void) => void
   }
 
   /**
    * 对相同地址的数据进行缓存
    * @param handler - 验证函数
    * @param callback - 成功回调
    * @param interval - 检测时间间隔
    */
    export function variableHasValue (
     handler: () => boolean,
     callback: () => void,
     interval: number
   ): void
 
   /**
    * 查找某个元素所在树的所有父链
    * @param tree - 数据
    * @param handler - 验证回调
    * @param config - 字段映射配置。
    * @returns 查找的结果
    */
   export function deepFindTreePath (
     tree: any[],
     handler: (item: any) => boolean,
     config?: {
       id: string,
       children: string,
       pid: string,
     }
   ): null | any[]
 
 }
 
 