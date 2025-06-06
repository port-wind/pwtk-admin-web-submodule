<script setup lang="ts" name="WebAdBox">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  datas: any
}>()

onMounted(() => {
  console.log('props', props.datas)
})
</script>

<template>
  <div class="WebAdBox">
    广告大全
    <slot name="deles" />
  </div>
</template>

<style lang="less" scoped>
.WebAdBox {
  position: relative;
}
</style>
