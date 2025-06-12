<script setup lang="ts" name="ImageCard">
import { defineProps } from 'vue'
import { Card } from 'vant'
import type { IDatas } from './type'

const props = defineProps({
  datas: {
    type: Object as () => IDatas,
    required: true
  }
})

const handleLink = () => {
  if (props.datas.configParamJson.link) {
    window.open(props.datas.configParamJson.link, '_blank')
  }
}
</script>

<template>
  <div class="image-card" @click="handleLink">
    <van-card
      :desc="datas.configParamJson.description"
      :title="datas.configParamJson.title"
      :thumb="datas.configParamJson.imageUrl"
    />
    <slot name="deles" />
  </div>
</template>

<style lang="scss" scoped>
.image-card {
  position: relative;
  cursor: pointer;
}
</style>
