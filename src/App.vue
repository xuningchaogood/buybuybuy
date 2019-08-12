<template>
  <div>
    <!-- 顶部 -->
    <top1></top1>

    <!-- 中间显示内容的区域 -->
    <router-view></router-view>

    <!-- 底部 -->
    <bottom1></bottom1>
  </div>
</template>

<script>
// 如果有些东西不需要切换，那么就直接注册成组件
// 有些组件需要根据地址切换，那么就被路由管理起来
import top1 from "./components/top.vue";
import bottom1 from "./components/bottom.vue";

export default {
  components: {
    top1,
    bottom1
  }
};
</script>

<style>
</style>
