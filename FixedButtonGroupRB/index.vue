<script setup lang="ts" name="FixedButtonGroupRB">
import { computed } from 'vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 样式计算
const styleMain = computed(() => props.datas.configParamJson.styleMain)

const contentStyle = computed(() => ({
  color: styleMain.value?.textColor || '#333333',
  fontSize: `${styleMain.value?.fontSize || 14}px`,
  fontWeight: styleMain.value?.fontWeight || 400,
  textAlign: styleMain.value?.textAlign || 'center',
  lineHeight: '1.5'
}))
console.log(contentStyle.value)
</script>

<template>
  <div class="FixedButtonGroupRB">
    <div style="display: flex; align-items: center; justify-content: center">这是固定按钮组</div>
    <div>content</div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.FixedButtonGroupRB {
  position: relative;
  height: 50px;
  border: 1px solid #000;
}
</style>
