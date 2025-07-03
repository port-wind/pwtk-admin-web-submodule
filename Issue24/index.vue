<script setup lang="ts" name="Issue24">
import { computed, defineProps } from 'vue'
import type { IDatas } from './type'
// import { getWebSitePost, type IGetWebSitePostResponse } from '../api'
import Result24 from './result24.vue'
import Result2 from './result2.vue'
import Result1 from './result1.vue'
import { EModel } from './type'
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// style 样式
const containerStyle = computed(() => {
  return {
    // backgroundColor: styleMain.value?.backgroundColor || '#f8f9fa',
    borderRadius: `${styleMain.value?.borderRadius || 0}px`,
    padding: `${styleMain.value?.padding || 0}px`
  }
})

// const numberStyle = computed(() => {
//   return {
//     fontSize: `${styleMain.value?.numberSize || 14}px`,
//     margin: `0 ${styleMain.value?.numberSpacing || 0}px`
//   }
// })

const titleHeaderStyle = computed(() => {
  if (styleHeader.value.isGradient) {
    return {
      background: `linear-gradient(to right,  ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  } else {
    return {
      backgroundColor: styleHeader.value?.headerBgColor || '#4a90e2'
    }
  }
})

const mainTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.titleColor || '#333333'
  }
})

const subTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.subTitleColor || '#333333'
  }
})
</script>

<template>
  <div class="Issue24">
    <div class="Issue24-content" :style="containerStyle">
      <!-- 头部标题 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">{{ datas.configParamJson.title }}</h2>
        <span class="sub-title" :style="subTitleStyle">{{ datas.configParamJson.subtitle }}</span>
      </div>
      <!-- 开奖信息列表 24码风格 -->
      <Result24 :datas="datas" v-if="datas.configParamJson.model === EModel['24码']" />
      <!-- 胆大胆小 2码风格 -->
      <Result2 :datas="datas" v-if="datas.configParamJson.model === EModel['胆大胆小']" />
      <!-- 色波 -->
      <Result1 :datas="datas" v-if="datas.configParamJson.model === EModel['色波']" />
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.Issue24 {
  position: relative;
}

.title-header {
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .main-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 14px;
    opacity: 0.9;
  }
}
</style>
