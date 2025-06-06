<template>
  <div class="headerbarbox">
    <!-- <component
      :is="data?.configParamJson?.Attr?.sticky ? 'van-sticky' : 'div'"
      :offset-top="data?.configParamJson?.Attr?.offsetTop || 0"
    > -->
    <van-sticky :offset-top="data?.configParamJson?.Attr?.offsetTop || 0">
      <div class="header-bar" :style="headerBarStyle">
        <van-image class="responsive-image" :src="PUBLIC_CND_URL + data?.configParamJson?.logoSrc" />
        <van-image
          v-if="data?.configParamJson?.middleSrc"
          class="middle-image"
          :src="PUBLIC_CND_URL + data?.configParamJson?.middleSrc"
        />
        <div v-if="data?.configParamJson?.backToHome" class="back-top" @click="scrollToTop">
          <div class="back-top-icon">
            <van-icon name="back-top" />
          </div>
          <span>返回顶部</span>
        </div>
        <div v-else @click="backToHome">
          <div class="back-top-icon">
            <van-icon name="wap-home-o" />
          </div>
          <span>返回首页</span>
        </div>
      </div>
    </van-sticky>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="HeaderBarBox">
import { Icon as VanIcon, Image as VanImage, Sticky as VanSticky } from 'vant'
import { computed, ref } from 'vue'
// import { PUBLIC_CND_URL } from '@/consts';
import { onMounted } from 'vue'
import constants from '@/constants'
import type { HeaderBarBox } from './type'
// import utils from '@/utils';
// import homeIcon from '../../assets/images/homeIcon.png' // 添加图片导入

interface IProps {
  data: {
    configParamJson: HeaderBarBox
  }
}

const { data } = defineProps<IProps>()

const PUBLIC_CND_URL = 'https://stt.pwtk.cc/'
const WEBSITE_DOMAIN = 'tk02.pwtk.cc'
// const WEBSITE_DOMAIN = JSON.parse(utils.getSession(constants.sessionStorageKeys.WEBSITE_DOMAIN) || '{}');
const websitDomain = ref(WEBSITE_DOMAIN)

const headerBarStyle = computed(() => {
  if (data) {
    return {
      background: getBackgroundStyle(data.configParamJson),
      backgroundSize: '100% 100%',
      color: data?.configParamJson?.textColor
    }
  } else {
    return {
      backgroundSize: '100% 100%'
    }
  }
})

function getBackgroundStyle(data: HeaderBarBox): string {
  if (data) {
    if (data?.bgImg) {
      return `url(${PUBLIC_CND_URL}${data.bgImg})` // 使用背景图片
    } else {
      return data.bgColor || 'var(--theme-color)' // 否则使用背景颜色
    }
  } else {
    return ''
  }
}

onMounted(() => {
  if (data?.configParamJson?.theme) {
    document.documentElement.style.setProperty('--theme-color', data.configParamJson.theme.primary)
    document.documentElement.style.setProperty(
      '--second-color',
      data.configParamJson.theme.secondary || data.configParamJson.theme.primary
    )
    document.documentElement.style.setProperty(
      '--gradient-direction',
      data.configParamJson.theme?.gradient || 'to right'
    )
  }
})
// console.log("WEBSITE_DOMAIN",websitDomain.value)
// console.log("WEBSITE_DOMAIN",PUBLIC_CND_URL + data.middleSrc ?? websitDomain.value.icon)
const backToHome = () => {
  window.location.href = '/'
}
//data.themeColor
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
}
</script>
<style scoped lang="less">
.headerbarbox {
  position: relative;
}
.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
  max-height: 4rem;
  overflow: hidden;
  .responsive-image {
    max-width: 45%;
    max-height: 3.75rem; /* 图片的最大高度不超过父级 */
    height: 3.75rem;
    width: auto; /* 保持宽高比 */
  }
  .middle-image {
    max-height: 3.75rem; /* 图片的最大高度不超过父级 */
    height: 3.75rem;
    width: 3.75rem;
  }

  .back-top {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-direction: column;
    .back-top-icon {
      border: 1px solid #fff;
      border-radius: 50%;
      height: 1.6rem;
      width: 1.6rem;
      text-align: center;
    }
    span {
      font-size: 0.8rem;
    }
  }
}
</style>
