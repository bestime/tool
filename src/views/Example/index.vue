<style lang="scss" scoped>
.Example {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-start;
  
  ul {
    background-color: #444;
    color: #fff;
    flex-shrink: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    align-self: stretch;
    li {
      padding: 5px 12px;
      margin: 0;
    }
  }
  .route-box {
    flex: 1;
    width: 0;
    overflow: hidden;
    align-self: stretch;

  }
}
</style>

<template>
  <div class="Example">
    <ul>
      <li v-for="item in demoList" :key="item.routeName">
        {{ item.title }}
      </li>
    </ul>
    <RouterView class="route-box"/>
  </div>
</template>

<script lang="ts" setup>
const demoList = [
  {
    title: '自动缩放容器',
    routeName: 'ROUTE_EXAMPLE_NINESIZEBOX',
  }
]
</script>