## (一) 工具库相关

### ① 测试地址
[https://bestime.github.io/tool/](https://bestime.github.io/tool/)


### ② 在线 javascript 地址
```html
<!-- 最新版本 -->
<script src="https://bestime.github.io/tool/js/bestime/bestime@beta.min.js"></script>

<!-- 指定版本 -->
<script src="https://bestime.github.io/tool/js/bestime/bestime@[version].min.js"></script>
```

### ③ 在线 css 地址
```javascript
<link href="https://bestime.github.io/tool/css/bestime.css" rel="stylesheet" type="text/css">
```

### ④stylus 预编译
```
stylus -w index.styl -o index.styl.css
```

### ⑤ 部分工具文档
- 解析复杂url参数
	- 文档（未处理不规范数据，例：`bet[[d]=1&bet[a]]=2`）： [查看parseQuery文档](./src/split/parseQuery)
	- 示例（多种测试用例）：[在线demo](https://bestime.github.io/tool/demo/parseQuery.html)

## (二)、提前体验ES新特性 （babel插件）
```javascript
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator"
  ]
}
```
### ① 可选链 @babel/plugin-proposal-optional-chaining
```javascript
const a = item?.info?.name
```
### ② 空值赋默认值 @babel/plugin-proposal-nullish-coalescing-operator
```javascript
const a = item ?? {}
```

## (三)、在ajax回调中使用window.open无效解决方案
```javascript
// 部分浏览器在ajax中使用window.open会被拦截，导致无法打开新窗口
// 解决办法：提前打开空白窗口，在更改窗口地址。失败后关闭此窗口
// 封装：ns.openWindow(title, callback)
var newWindow = window.open() 
$.ajax({
  success: function () {
    newWindow.location = 'http://www.baidu.com'; // 改变窗口链接地址
  },
  error: function () {
    newWindow.close(); // 失败之后记得关闭
  }
})

```

## (四)、谨慎使用，以后考虑移除
- barCode
- loading
- numberMax
- numberMin
- FunctionOnce
- numberLimit
- ContainerFollowMouse
- DomMouse

## (五)、方法升级，用法不同，之前的即将移除
- throttle => FN_throttle
- debounce => FN_debounce
- FunctionConfirm => FN_confirm
- FunctionLoop => FN_loop





## (六)、git 常用操作
```
// git pull 相当于
git fetch origin <branch>
git merge FETCH_HEAD

// 合并分支
git fetch origin <branch>
git merge <branch>

// 放弃本地修改，使用最新的远程代码
git fetch origin <branch>
git reset --hard FETCH_HEAD

// 创建并切换到分支
git checkout -b <branch>
```


## (七)、web富文本编辑器
字体颜色相关默认没有，可在官网在线配置 https://ckeditor.com/ckeditor-5/

## (八)、桌面工具
- `LICEcap` gif录制工具: https://www.cockos.com/licecap/
- `Bandizip` http://www.bandisoft.com/

## (九)、编辑器等宽代码字体
  - JetBrainsMono下载：[本地](./source/JetBrainsMono) | [官网](https://www.jetbrains.com/lp/mono/)
## (十)、codepen 收藏
  - 旋转：https://codepen.io/sdras/pen/JdJgrB
  - css 背景：https://codepen.io/leemark/pen/icHjI

## (十一)、TeamViewer账号（密码相同）
 - 工作号：QQ小号邮箱（手机小号绑定）
 - 主号：QQ大号邮箱


## (十二)、2020起自己写的插件
 - 圆角环形渐变进度条：[在线demo](./demo/canvas/circle-progress.html)


## (十三)、邮箱账号
 - 火狐：jiangyang0909@foxmail.com
