<script setup lang="ts" name="TopNavBar">
import { defineProps } from 'vue'
import { NavBar } from 'vant'
import { Icon } from 'vant'
import getImageUrl from '@/utils/getImageUrl'
const props = defineProps({
  datas: {
    type: Object as () => any,
    required: true
  }
})
const onClickLeft = () => history.back()

const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'
// 定义 props 接收父组件传入的数据
const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}
</script>

<template>
  <div class="top-nav-bar">
    <div class="top-nav-bar-container">
      <van-nav-bar
        class="custom-bar-nav"
        :title="datas.configParamJson.title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #left>
          <van-image
            class="top-nav-bar-logo"
            :src="getFullUrl(datas.configParamJson.logo, PUBLIC_CDN_URL)"
            :alt="datas.configParamJson.title"
          />
        </template>
        <template #right>
          <van-icon name="arrow-up" size="18" />
        </template>
      </van-nav-bar>
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

.top-nav-bar-logo {
  height: 100%;
}

.custom-bar-nav {
  :deep(.van-nav-bar__left) {
    padding: 0;
  }
}
</style>
