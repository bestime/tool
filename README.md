## 2021-01-07：以前webpack版的文件移到@webpack分支不再维护了）

### ⑤ 部分工具文档
- 解析复杂url参数
	- 文档（未处理不规范数据，例：`bet[[d]=1&bet[a]]=2`）： [查看parseQuery文档](./src/split/parseQuery)
	- 示例（多种测试用例）：[在线demo](https://bestime.github.io/tool/demo/parseQuery.html)

## 提前体验ES新特性 （babel插件）
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

## 在ajax回调中使用window.open无效解决方案
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

## 邮箱账号
 - 火狐：jiangyang0909@foxmail.com

## git 常用操作
```
// git pull 相当于
git fetch origin <分支名>
git merge FETCH_HEAD

// 合并分支
git fetch origin <分支名>
git merge <分支名>

// 放弃本地修改，使用最新的远程代码
git fetch origin <分支名>
git reset --hard FETCH_HEAD

// 创建并切换到分支
git checkout --orphan <分支名>
git rm -rf .

// 拉取指定分支并到指定文件夹
git clone -b 分支名 仓库地址 本地目录
```


## web富文本编辑器
字体颜色相关默认没有，可在官网在线配置 https://ckeditor.com/ckeditor-5/

## 桌面工具
- `LICEcap` gif录制工具: https://www.cockos.com/licecap/
- `Bandizip` http://www.bandisoft.com/

## 编辑器等宽代码字体
  - JetBrainsMono下载：[本地](./source/JetBrainsMono) | [官网](https://www.jetbrains.com/lp/mono/)
## codepen 收藏
  - 旋转：https://codepen.io/sdras/pen/JdJgrB
  - css 背景：https://codepen.io/leemark/pen/icHjI

## TeamViewer账号（密码相同）
 - 工作号：QQ小号邮箱（手机小号绑定）
 - 主号：QQ大号邮箱


## 2020起自己写的插件
 - 圆角环形渐变进度条：[在线demo](./demo/canvas/circle-progress.html)

## window10 专业版激活命令（2023-09-20亲测有效）
- 依次管理员运行cmd执行一下命令（注意：每一条命令执行后都会有一个弹窗提示）
- 激活成功后，查看激活期限：`slmgr /xpr`
- 第二部的kms服务器，如果在第三步提示失效，网上多找几个试试

```cmd
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.lotro.cc
slmgr /ato
```