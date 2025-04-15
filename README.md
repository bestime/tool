# vue3相关组件、工具

## NineSizeBox - 自动缩放组件
需要对组件设置视觉宽高（非uiWidth和uiHeight），组件内容会自动根据外容器尺寸进行缩放适配

|  props    | 默认值 | 类型  | 备注 |
|----|----|----|----|
| mode      | initial | initial、scale-stretch、scale-aspect | 缩放模式 |
| uiWidth   | 1920    | number |设计稿的原始宽度 |
| uiHeight  | 1080    | number |设计稿的原始高度 |
| control   | true    | boolean |是否显示切换模式的按钮，一般用于调试，正式上线应都为false |
| interval  | 200     | number |多久检测一次容器尺寸变化，单位：毫秒 |

## elValidateNumberLimit 饿了么：表单验证 → 数字

|  参数    | 默认值 | 类型  | 备注 |
|----|----|----|----|
| min      | - | number |最小值|
| max   | -    | number |最大值 |
| isInt  | false    | boolean |是否为整数 |
| canZero  | true    | boolean |是否可为零 |

```ts
// 例子
const rules = {
  tzLiang: {
    required: true,
    trigger: 'blur',
    validator: validateNumberLimit(-10, 40, true, false, false)
  },
}
```