<template>
  <div class="notice">
    <!-- 公告 -->
    <van-notice-bar
      :text="datas.noticeText"
      left-icon="volume-o"
      :background="datas.backColor"
      :color="datas.textColor"
    />

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { NoticeBar as vanNoticeBar } from 'vant'
import { ComponentStyle } from './type'

const props = defineProps({
  datas: { type: Object as PropType<ComponentStyle>, required: true }
})
// console.log('notice组件', props.datas)
// export default {
//   name: 'notice',
//   props: {
//     datas: Object
//   }
// }
</script>

<style scoped lang="less">
.notice {
  position: relative;
}
</style>
