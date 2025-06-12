<script setup lang="ts" name="TopNavBar">
import { defineProps } from 'vue'
import { NavBar } from 'vant'

const props = defineProps({
  datas: {
    type: Object as () => any,
    required: true
  }
})
const onClickLeft = () => history.back()
</script>

<template>
  <div class="top-nav-bar">
    <div class="top-nav-bar-container">
      <van-nav-bar :title="datas.configParamJson.title" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <slot name="deles" />
  </div>
</template>

<style lang="scss" scoped>
.top-nav-bar {
  position: relative;
}
.top-nav-bar-container {
  min-height: 20px;
}
</style>
