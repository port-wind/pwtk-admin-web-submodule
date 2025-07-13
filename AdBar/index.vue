<template>
  <div class="AdBar">
    <div class="ad-bar-box-container">
      <div
        class="mbox"
        data-component-name="广告大全"
        data-component-title
        v-if="datas.configParamJson.adData && datas.configParamJson.adData.length > 0"
      >
        <div class="ad-bar" v-for="(item, index) in datas.configParamJson.adData" :key="index">
          <a v-if="item" class="ad-bar-image" :href="item.link || '#'" target="_blank">
            <van-image :src="getFullUrl(item.img, PUBLIC_CDN_URL)" :alt="item.name" />
          </a>
          <div v-else>
            <van-image :src="EmptyImage.src" alt="黄金位置等您入驻" />
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="AdBar">
import { computed } from 'vue'
import { Image as VanImage } from 'vant'
import { PUBLIC_CDN_URL } from '../utils'
import EmptyImage from '@/assets/images/hjwz.gif'

// 定义 props 接收父组件传入的数据
const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}
interface AdBarType {
  configParamJson: {
    total: number
    adData: AdItem[]
  }
}
interface AdItem {
  index: number
  img: string
  link: string
  name: string
}
const props = defineProps({
  datas: {
    type: Object as () => AdBarType,
    required: true
  }
})

// const sortedAdData = computed(() => {
//   // 创建一个新的数组，长度为 total，初始值为 null
//   const totalArray = Array(props.datas.configParamJson.total).fill(null)

//   // 将 adData 中有 index 的项放入 totalArray 的对应位置
//   props.datas.configParamJson.adData.forEach((item) => {
//     // console.log(item);
//     if (item.index !== undefined && item.index - 1 < props.datas.configParamJson.total) {
//       totalArray[item.index - 1] = item
//     }
//   })

//   return totalArray
// })
</script>

<style scoped lang="less">
.AdBar {
  position: relative;
}

.ad-bar-box-container {
  --theme-color: #f39800;
}

.ad-bar {
  // height: 3rem;
  // line-height: 3rem;
  margin: 2px 0;

  .ad-bar-image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ad-bar-default {
    text-align: center;
    color: #ccc;
    font-size: 1.2rem;
    background-color: #fff;
    border-radius: 0.5rem;
    letter-spacing: 0.6rem;
  }
}
</style>
