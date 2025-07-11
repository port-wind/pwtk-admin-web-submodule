<script setup lang="ts" name="WaveColorArea">
import { computed, onMounted } from 'vue'
import { mockData } from '@/views/WebVision/components/rightslider/Zodiac12WuxingPageStyle/mockData'
import type { Zodiac12WuxingPageConfig } from '../type'

interface IProps {
  config: Zodiac12WuxingPageConfig
}
const props = defineProps<IProps>()

// 🌈 从 mockData 获取波色数据
const waveColorData = mockData.playTypes.find((item) => item.code === '8007')?.options || {}

// 🌈 波色数据配置（按照图片中的顺序：红波、蓝波、绿波）
const waveColorElements = [
  { name: '红波', color: '#ff4757', numbers: waveColorData['红波'] || [] },
  { name: '蓝波', color: '#3742fa', numbers: waveColorData['蓝波'] || [] },
  { name: '绿波', color: '#2ed573', numbers: waveColorData['绿波'] || [] }
]

// 🎨 样式计算
const waveColorAreaStyle = computed(() => ({
  backgroundColor: props.config.waveColorAreaStyle?.backgroundColor || '#f8f9fa',
  borderRadius: `${props.config.waveColorAreaStyle?.borderRadius || 8}px`,
  padding: `${props.config.waveColorAreaStyle?.padding || 16}px`,
  marginTop: `${props.config.waveColorAreaStyle?.marginTop || 16}px`
}))

const waveColorTitleStyle = computed(() => ({
  fontSize: `${props.config.waveColorTitleStyle?.fontSize || 18}px`,
  fontWeight: '600',
  color: props.config.waveColorTitleStyle?.color || '#2c3e50',
  marginBottom: '12px',
  textAlign: 'center' as const
}))

const waveColorRowStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: `${props.config.waveColorGridStyle?.gap || 8}px`,
  backgroundColor: props.config.waveColorCardStyle?.backgroundColor || '#ffffff',
  borderRadius: `${props.config.waveColorCardStyle?.borderRadius || 6}px`,
  padding: `${props.config.waveColorCardStyle?.padding || 8}px`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
}))

const waveColorNameStyle = computed(() => ({
  fontSize: `${props.config.waveColorElementStyle?.nameSize || 16}px`,
  fontWeight: '600',
  minWidth: '40px',
  marginRight: '12px',
  textAlign: 'center' as const
}))

// 获取数字颜色（使用波色自身的颜色）
const getNumberColor = (waveColorName: string) => {
  const element = waveColorElements.find((el) => el.name === waveColorName)
  return element?.color || '#6c757d'
}

const getNumberButtonStyle = (number: string, waveColorName: string) => ({
  backgroundColor: getNumberColor(waveColorName),
  color: 'white',
  border: 'none',
  borderRadius: `${props.config.waveColorElementStyle?.numberBorderRadius || 3}px`,
  fontSize: `${props.config.waveColorElementStyle?.numberFontSize || 10}px`,
  fontWeight: '600',
  padding: '0',
  width: `${props.config.waveColorElementStyle?.numberWidth || 24}px`,
  height: `${props.config.waveColorElementStyle?.numberHeight || 20}px`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
})

// 📱 导出接口
defineExpose({
  waveColorElements,
  waveColorData
})

onMounted(() => {
  console.log('🌈 WaveColorArea 组件已挂载，波色数据:', waveColorData)
})
</script>

<template>
  <div class="wave-color-area" :style="waveColorAreaStyle" v-if="config.showWaveColor !== false">
    <!-- 波色标题 -->
    <div class="wave-color-title" :style="waveColorTitleStyle">
      {{ config.waveColorTitle || '波色' }}
    </div>

    <!-- 波色行布局 -->
    <div class="wave-color-rows">
      <div v-for="element in waveColorElements" :key="element.name" class="wave-color-row" :style="waveColorRowStyle">
        <!-- 波色名称 -->
        <div class="wave-color-name" :style="{ ...waveColorNameStyle, color: element.color }">
          {{ element.name }}
        </div>

        <!-- 数字按钮容器 -->
        <div
          class="wave-color-numbers"
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            gap: `${config.waveColorElementStyle?.numberGap || 3}px`
          }"
        >
          <span
            v-for="number in element.numbers"
            :key="number"
            class="number-button"
            :style="getNumberButtonStyle(number, element.name)"
          >
            {{ number }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wave-color-area {
  .wave-color-title {
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .wave-color-rows {
    .wave-color-row {
      &:last-child {
        margin-bottom: 0;
      }
    }

    // wave-color-numbers 样式已移至内联样式
  }

  // 响应式调整
  @media (max-width: 768px) {
    .wave-color-row {
      flex-direction: column;
      align-items: flex-start !important;

      .wave-color-name {
        margin-bottom: 6px !important;
        margin-right: 0 !important;
      }
    }
  }

  @media (max-width: 480px) {
    .wave-color-numbers {
      gap: 2px !important;
    }
  }
}
</style>
