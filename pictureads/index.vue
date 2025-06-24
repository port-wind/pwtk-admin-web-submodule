<template>
  <div class="PictureADs">
    <!-- 无图片 -->
    <div class="upload" v-if="!imageList[0]">
      <i class="iconfont icon-lunbotu"></i>
    </div>

    <!-- 一行一个 -->
    <div
      v-if="imageList[0] && swiperType === 0"
      class="type0"
      :style="{
        'padding-left': datas.configParamJson.pageMargin + 'px',
        'padding-right': datas.configParamJson.pageMargin + 'px'
      }"
    >
      <div
        v-for="(item, index) in imageList"
        :key="index"
        class="imgLis"
        :style="{ 'margin-bottom': datas.configParamJson.imageMargin + 'px' }"
      >
        <!-- 图片 -->
        <img
          :src="item.src"
          draggable="false"
          :style="{ 'border-radius': datas.configParamJson.borderRadius + 'px' }"
        />
        <!-- 图片标题 -->
        <p class="title" v-show="item.text ? true : false">{{ item.text }}</p>
      </div>
    </div>

    <!-- 轮播组件 -->
    <div
      class="swiper-container pointer-events"
      v-if="(imageList[0] && swiperType === 1) || swiperType === 2 || swiperType === 3"
    >
      <div :class="swiperType === 3 && imageList[0] ? 'type3 type1 swiper-wrapper type3H' : 'swiper-wrapper type1'">
        <div class="swiper-slide" v-for="(item, index) in imageList" :key="index">
          <!-- 图片 -->
          <img
            :src="item.src"
            alt=""
            draggable="false"
            :style="{ 'border-radius': datas.configParamJson.borderRadius + 'px' }"
          />
          <!-- 图片标题 -->
          <p class="title" v-show="item.text ? true : false">{{ item.text }}</p>
        </div>
      </div>

      <!-- 分页器 -->
      <div class="swiper-pagination" style="color: #007aff"></div>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="PictureADs">
import { ref, computed, watch, nextTick } from 'vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}

const props = defineProps<IProps>()

// 响应式状态
const mySwiper = ref<any>(null)

// 计算属性
/* 类型切换 */
const swiperType = computed(() => {
  console.log(props.datas.configParamJson.swiperType, '----------------轮播类型')
  addSwiper()
  return props.datas.configParamJson.swiperType
})

/* 图片删除或者增加 */
const imageList = computed(() => {
  addSwiper()
  console.log(props.datas.configParamJson.imageList?.length || 0, '-------轮播数量')
  return props.datas.configParamJson.imageList
})

/* 分页器类型切换 */
const pagingType = computed(() => {
  addSwiper()
  return props.datas.configParamJson.pagingType
})

/* 一行个数 */
const rowindividual = computed(() => {
  addSwiper()
  if (props.datas.configParamJson.swiperType === 1) {
    return 1
  } else {
    return props.datas.configParamJson.rowindividual || 0
  }
})

/* 图片间距 */
const imageMargin = computed(() => {
  addSwiper()
  if (props.datas.configParamJson.swiperType === 1) {
    return 0
  } else {
    return props.datas.configParamJson.imageMargin || 0
  }
})

// 方法定义
/* 创建轮播对象 */
const addSwiper = () => {
  nextTick(() => {
    if (props.datas.configParamJson.swiperType !== 0 && props.datas.configParamJson.imageList?.[0]) {
      if (mySwiper.value instanceof Array) {
        mySwiper.value.forEach((element: any) => {
          element.destroy()
        })
      } else if (mySwiper.value instanceof Object) {
        // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
        mySwiper.value.destroy()
      }

      let params: any = {
        loop: true,
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          type: pagingType.value
        }
      }

      if (props.datas.configParamJson.swiperType === 1 || props.datas.configParamJson.swiperType === 2) {
        params.slidesPerView = rowindividual.value
        params.spaceBetween = imageMargin.value
      } else if (props.datas.configParamJson.swiperType === 3) {
        params.slidesPerView = 1.3
        params.centeredSlides = true
      }

      mySwiper.value = new Swiper('.swiper-container', params)
    } else {
      if (mySwiper.value instanceof Array) {
        mySwiper.value.forEach((element: any) => {
          element.destroy()
        })
      }
      // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
      if (mySwiper.value instanceof Object) {
        mySwiper.value.destroy()
      }
    }
  })
}

// 监听器
watch(pagingType, () => {})
watch(rowindividual, () => {})
watch(imageMargin, () => {})
</script>

<style scoped lang="scss">
.PictureADs {
  position: relative;

  /* 无图片 */
  .upload {
    background: #979797;
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 120px;
    }
  }

  /* 类型0 */
  .type0 {
    box-sizing: border-box;
    /* 图片列表 */
    .imgLis {
      width: 100%;
      position: relative;
      overflow: hidden;
      &:last-child {
        margin: 0 !important;
      }
      /* 图片 */
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .title {
        height: 36px;
        width: 100%;
        background-color: rgba(51, 51, 51, 0.8);
        text-align: center;
        line-height: 36px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  /* 类型1 */
  .type1 {
    width: 100%;
    position: relative;
    .swiper-slide {
      width: 100%;
      height: 250px;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }

  .type3 {
    width: 100%;
    height: 250px;
    align-items: center;
    .swiper-slide {
      height: 210px !important;
      text-align: center;
      font-size: 18px;
      background: #fff;
      box-shadow: rgba(173, 173, 173, 0.8) 0px 7px 24px 0px;
      border-radius: 12px;
      overflow: hidden;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
    .swiper-pagination {
      bottom: 0 !important;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }
  .type3H {
    height: 250px;
  }
  .swiper-container-horizontal > .swiper-pagination-progressbar {
    height: 2px;
  }
}
</style>
