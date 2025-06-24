<template>
  <div class="custommodule">
    {{ datas?.componentName }}
    <!-- {{ datas.jsonData }} -->
    <!-- <img
      :src="datas.img"
      alt=""
    /> -->
    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import type { IleftComponentData } from '@/views/WebVision/components/sliderassembly/type'

// 接收 props
const props = defineProps({
  datas: { type: Object as PropType<IleftComponentData['setStyle']>, required: true }
})

onMounted(() => {
  // console.log('通用组件', props.datas)
})
</script>

<style scoped lang="less">
.custommodule {
  font-size: large;
  position: relative;
  min-height: 5rem;
  img {
    width: 100%;
  }
}
</style>
