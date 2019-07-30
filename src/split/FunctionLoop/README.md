


#### 参数详解

| 参数        | 描述  | 
| --------   | -----:  |
| handle(next, stop, timer)     | 主处理函数   |
| sleepTime      | 轮询频率，在执行完成之后至下一次执行的时间间隔  |
| overTime: { time, handle }      | 超时配置  |

#### 实例化
```javascript
const demo = FunctionLoop({
  sleepTime: 500,
  handle: function (next, stop, times) {
    $.ajax({
      url: './test',
      success: function (isLogin) {
        if(isLogin) {
          stop(); // 登录成功，执行停止
        }else {
          next(); // 未登录，继续轮询
        }
      },
      error: function (err) {
        next() // 接口异常，继续轮询
      }
    })
  },

  // 这一项，不配置则不生效，如果不主动执行 demo(false)，将一直轮询
  overTime: {
    time: 5000, // 超时事件
    handle: function () {
      dialog({ msg: '获取登录状态超时' })
    }
  }
})
```

#### 执行
```javascript
demo.start.call(this); 
```

#### 动态改变配置
```javascript
demo.start.updateProps(this, {
  sleepTime: 5000
}); 
```

#### 停止，销毁（用于路由跳转或者组件销毁）
```javascript
demo.stop.call(this);
```

