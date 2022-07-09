// declare module "@bestime/utils" {
//   /**
//    * url数据序列化
//    */
//   export function param (data: {
//     [key: string]: any
//     [key: number]: any
//   }): string

//   /**
//    * 接口白名单配置
//    */
//   export function createServerUrl (config: {
//     [key: string]: string | null
//   }) : (path: string) => string
// }


declare namespace bestime {
  /**
   * url数据序列化
   */
  export function param (data: {
    [key: string]: any
    [key: number]: any
  }): string

  /**
   * 接口白名单配置
   */
  export function createServerUrl (config: {
    [key: string]: string | null
  }) : (path: string) => string
}

export = bestime


