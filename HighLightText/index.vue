<!-- HighLightText 组件 -->
<template>
  <div
    class="highlight-text"
    :class="[
      `highlight-text--${datas.configParamJson.highlightType}`,
      datas.configParamJson.animation !== 'none' ? `highlight-text--${datas.configParamJson.animation}` : ''
    ]"
    :style="computedStyles"
  >
    <div :style="computedStyles" v-html="datas.configParamJson.text"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IDatas } from './type'

interface Props {
  datas: IDatas
}

const props = defineProps<Props>()

const computedStyles = computed(() => {
  const { configParamJson } = props.datas
  const styles: Record<string, string> = {
    fontSize: `${configParamJson.fontSize}px`,
    fontWeight: `${configParamJson.fontWeight}`,
    color: configParamJson.textColor,
    textAlign: configParamJson.textAlign,
    lineHeight: `${configParamJson.lineHeight}`,
    padding: `${configParamJson.padding.top}px ${configParamJson.padding.right}px ${configParamJson.padding.bottom}px ${configParamJson.padding.left}px`
  }

  switch (configParamJson.highlightType) {
    case 'background':
      styles.backgroundColor = configParamJson.highlightColor
      break
    case 'underline':
      styles.borderBottom = `2px solid ${configParamJson.highlightColor}`
      break
    case 'marker':
      styles.background = `linear-gradient(transparent 60%, ${configParamJson.highlightColor} 40%)`
      break
    case 'gradient':
      if (configParamJson.gradientColors) {
        styles.background = `linear-gradient(45deg, ${configParamJson.gradientColors.from}, ${configParamJson.gradientColors.to})`
        styles.webkitBackgroundClip = 'text'
        styles.webkitTextFillColor = 'transparent'
      }
      break
  }

  return styles
})
</script>

<style lang="scss" scoped>
.highlight-text {
  display: block;
  word-break: break-word;

  // 动画效果
  &--flash {
    animation: flash 2s infinite;
  }

  &--pulse {
    animation: pulse 2s infinite;
  }
}

@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
