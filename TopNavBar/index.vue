<script setup lang="ts" name="TopNavBar">
import { defineProps } from 'vue'
import { NavBar } from 'vant'
import { Image } from 'vant'
import { Icon } from 'vant'
import { Sticky } from 'vant'
const props = defineProps({
  datas: {
    type: Object as () => any,
    required: true,
  },
})
const onClickLeft = () => history.back()
const onClickRight = () => {
  // "#com-container" 滚动到顶部
  const comContainer = document.getElementById('com-container')
  if (comContainer) {
    comContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}
const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'
// 定义 props 接收父组件传入的数据
const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}
</script>

<template>
  <div class="top-nav-bar">
    <div class="top-nav-bar-container">
      <Sticky>
        <NavBar
          class="custom-bar-nav"
          :title="datas.configParamJson.title"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        >
          <template #left>
            <Image
              class="top-nav-bar-logo"
              :src="getFullUrl(datas.configParamJson.logo, PUBLIC_CDN_URL)"
              :alt="datas.configParamJson.title"
            />
          </template>
          <template #right>
            <Icon name="arrow-up" size="18" />
          </template>
        </NavBar>
      </Sticky>
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
