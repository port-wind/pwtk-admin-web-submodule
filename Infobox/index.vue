<script setup lang="ts" name="Infobox">
import { computed } from 'vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

const styleJSON = computed(() => props.datas.configParamJson.styleJSON)
</script>

<template>
  <div class="infobox-wrapper">
    <div class="infobox-content" :style="{ backgroundColor: styleJSON?.value?.backgroundColor }">
      <p class="info-line">{{ datas.configParamJson.line1 }}</p>
      <p class="info-line">{{ datas.configParamJson.line2 }}</p>
      <p class="info-line">
        <span class="highlight">{{ datas.configParamJson.line3 }}</span>
      </p>
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.infobox-wrapper {
  position: relative;
  padding: 20px 15px;
  background-color: #f7f8fa;
  border-radius: 8px;
}

.infobox-content {
  text-align: center;
  color: #646566;
  font-size: 14px;
  line-height: 1.8;
}

.info-line {
  margin: 0;
}

.highlight {
  background-color: yellow;
  padding: 2px 4px;
}
</style>
