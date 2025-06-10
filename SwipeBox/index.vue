<template>
  <div class="swipe">
    <!-- Model 1 的渲染内容 -->
    <SwipeCustom v-if="data.model === 's1'" :data="data" />
    <!-- Model 2 的渲染内容 -->
    <SwipeLine v-else-if="data.model === 's2'" :data="data" />
    <!-- Model 3 的渲染内容 -->
    <SwipeCode v-else :data="data" />
  </div>
</template>
<script setup lang="ts" name="Swipe">
import { defineProps } from 'vue'
import SwipeCustom from './swipe/SwipeCustom.vue'
import SwipeLine from './swipe/SwipeLine.vue'
import SwipeCode from './swipe/SwipeCode.vue'

const props = defineProps({
  data: {
    type: Object as () => any,
    required: true
  }
})
</script>

<style scoped lang="less"></style>
