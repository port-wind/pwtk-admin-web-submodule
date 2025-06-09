<template>
  <div class="custom-box">
    <div class="custom-box-container">
      <div class="mbox">
        <BoxTitle :data="datas.configParamJson"></BoxTitle>
        <div class="custom-box-content">
          <img v-if="datas.img" :src="getFullUrl(datas.img, PUBLIC_CDN_URL)" />
          <div v-if="datas.content" v-html="datas.content"></div>
          <p v-if="datas.text">{{ datas.text }}</p>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="CustomBox">
// import { PUBLIC_CDN_URL } from '@/consts'
import BoxTitle from './BoxTitle.vue'

const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'

const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}
interface Props {
  title: string
  content?: string
  img?: string
  text?: string
  configParamJson: {
    title?: string
    align?: string
    titleBg?: string
  }
}

const props = defineProps({
  datas: {
    type: Object as () => Props,
    required: true
  }
})
</script>

<style scoped lang="less">
.custom-box {
  position: relative;
}
.custom-box-container {
  min-height: 50px;
}
.custom-box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
