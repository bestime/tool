

/**
 * 控制器
 */
interface IController {
  /**
   * 校验是否可以继续往下执行
   * @returns 
   */
  validate: () => boolean
}

export type Thander = (controller:IController, ...args: any[]) => any



/**
 * 处理竞态问题，只认最后一个执行结果（一般用于异步场景）
 * @param handler 际处理函数
 * @returns 
 */
export default function raceTaskPlus<T extends Thander> (handler: T) {
  let taskId = 0
  type AllParams = Parameters<T>;
  type RestParams = AllParams extends [any, ...infer P] ? P : [];
    
  return function (this: ThisParameterType<T>, ...args:RestParams): ReturnType<T> {
    const flag = ++taskId
    // console.log(`任务开始：${flag}/${taskId}`)
    const controller: IController = {
      
      validate () {
        return flag === taskId
      }
    }

    // @ts-ignore
    args.unshift(controller)
    
    
    return handler.apply(this, args as any)
  }
}


/*
async function add(a: number, b:number): Promise<number> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(a+b)
    }, 2000)
  })
}


const demo = raceTaskPlus(async function (controller, a: number, b:number) {
  console.log("参数", arguments)
  const res = await add(a, b)
  if(!controller.validate()) {
    return console.log("无意义", res)
  }
  console.log("结果", res)
  return res
})

demo(1, 3)
setTimeout(() => {
  demo(5, 5)
}, 500);
*/