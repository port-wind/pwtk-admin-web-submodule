<script setup lang="ts" name="TopNavBar">
import { defineProps } from 'vue'
import { NavBar, Image, Icon, Sticky } from 'vant'
import TopImage from '../assets/images/top.png'
const props = defineProps({
  datas: {
    type: Object as () => any,
    required: true
  }
})
const onClickLeft = () => history.back()
const onClickRight = () => {
  // "#com-container" 滚动到顶部
  const comContainer = document.getElementById('com-container')
  if (comContainer) {
    comContainer.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'
const route = useRoute()

const isAdminEditor = computed(
  () =>
    route.path === '/webVisionBuilder' ||
    route.path === '/webVisionBuilderWebsite' ||
    route.path === '/webVisionBuilderTemplate'
)
console.log('🚀 ~ isAdminEditor:', isAdminEditor.value)
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
            <a class="top-nav-bar-home-url" :href="datas.configParamJson.homeUrl" @click="onClickLeft">
              <Image
                class="top-nav-bar-logo"
                :src="getFullUrl(datas.configParamJson.logo, PUBLIC_CDN_URL)"
                :alt="datas.configParamJson.title"
              />
            </a>
          </template>
          <template #right>
            <!-- <Icon name="arrow-up" size="18" /> -->
            <div class="top-nav-bar-right-image">
              <img v-if="!isAdminEditor" src="@/assets/images/top.png" />
              <Image v-else :src="TopImage" />
            </div>
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
  :deep(.van-nav-bar__right) {
    padding: 0;
  }
}

.top-nav-bar-right-image {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  img {
    height: 100%;
  }
}

.top-nav-bar-home-url {
  padding: 5px 0;
  height: 100%;
}
</style>
