# 滚动条插件


## 安装
```ts
@bestime/scroll-bar
```

## 引入样式文件
index.min.css
```ts
import "@bestime/scroll-bar/index.min.css
```

## 预备html结构
```html
<div class="scroll_bar_container">
  <div class="scroll_bar_wrap">
    <div class="scroll_bar_view">
      <!-- 这里放你的内容 -->
    </div>
  </div>
</div>
```

## 使用
```ts
new ScrollBar({
  el: document.getElementByClassName('scroll_bar_container')[0],
  fade: false
})
```