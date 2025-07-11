<script setup lang="ts" name="WuxingArea">
import { computed, onMounted } from 'vue'
import { mockData } from '@/views/WebVision/components/rightslider/Zodiac12WuxingPageStyle/mockData'
import type { Zodiac12WuxingPageConfig } from '../type'

interface IProps {
  config: Zodiac12WuxingPageConfig
}
const props = defineProps<IProps>()

// 🌟 从 mockData 获取五行数据
const { wuXingToNumber } = mockData

// 🌟 五行数据配置（按照图片中的顺序：金、木、水、火、土）
const wuxingElements = [
  { name: '金', color: '#FFD700', numbers: wuXingToNumber.金 || [] },
  { name: '木', color: '#228B22', numbers: wuXingToNumber.木 || [] },
  { name: '水', color: '#4169E1', numbers: wuXingToNumber.水 || [] },
  { name: '火', color: '#FF6347', numbers: wuXingToNumber.火 || [] },
  { name: '土', color: '#8B4513', numbers: wuXingToNumber.土 || [] }
]

// 🎨 样式计算
const wuxingAreaStyle = computed(() => ({
  backgroundColor: props.config.wuxingAreaStyle?.backgroundColor || '#f8f9fa',
  borderRadius: `${props.config.wuxingAreaStyle?.borderRadius || 8}px`,
  padding: `${props.config.wuxingAreaStyle?.padding || 16}px`,
  marginTop: `${props.config.wuxingAreaStyle?.marginTop || 16}px`
}))

const wuxingTitleStyle = computed(() => ({
  fontSize: `${props.config.wuxingTitleStyle?.fontSize || 18}px`,
  fontWeight: '600',
  color: props.config.wuxingTitleStyle?.color || '#2c3e50',
  marginBottom: '12px',
  textAlign: 'center' as const
}))

const wuxingRowStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: `${props.config.wuxingGridStyle?.gap || 8}px`,
  backgroundColor: props.config.wuxingCardStyle?.backgroundColor || '#ffffff',
  borderRadius: `${props.config.wuxingCardStyle?.borderRadius || 6}px`,
  padding: `${props.config.wuxingCardStyle?.padding || 8}px`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
}))

const wuxingNameStyle = computed(() => ({
  fontSize: `${props.config.wuxingElementStyle?.nameSize || 16}px`,
  fontWeight: '600',
  minWidth: '24px',
  marginRight: '12px',
  textAlign: 'center' as const
}))

// 获取数字颜色（使用生肖区域的颜色映射）
const getNumberColor = (num: string) => {
  const customColors = props.config?.customColorMapping
  if (customColors) {
    const numValue = parseInt(num, 10)
    if (numValue >= 1 && numValue <= 16) {
      return customColors.redWave || '#ff4757'
    }
    if (numValue >= 17 && numValue <= 32) {
      return customColors.blueWave || '#3742fa'
    }
    return customColors.greenWave || '#2ed573'
  }
  return '#6c757d'
}

const getNumberButtonStyle = (number: string) => ({
  backgroundColor: getNumberColor(number),
  color: 'white',
  border: 'none',
  borderRadius: `${props.config.wuxingElementStyle?.numberBorderRadius || 3}px`,
  fontSize: `${props.config.wuxingElementStyle?.numberFontSize || 10}px`,
  fontWeight: '600',
  padding: '0',
  width: `${props.config.wuxingElementStyle?.numberWidth || 24}px`,
  height: `${props.config.wuxingElementStyle?.numberHeight || 20}px`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
})

// 📱 导出接口
defineExpose({
  wuxingElements,
  wuXingToNumber
})

onMounted(() => {
  console.log('🌟 WuxingArea 组件已挂载，五行数据:', wuXingToNumber)
})
</script>

<template>
  <div class="wuxing-area" :style="wuxingAreaStyle" v-if="config.showWuxing !== false">
    <!-- 五行标题 -->
    <div class="wuxing-title" :style="wuxingTitleStyle">
      {{ config.wuxingTitle || '五行对照' }}
    </div>

    <!-- 五行行布局 -->
    <div class="wuxing-rows">
      <div v-for="element in wuxingElements" :key="element.name" class="wuxing-row" :style="wuxingRowStyle">
        <!-- 五行名称 -->
        <div class="wuxing-name" :style="{ ...wuxingNameStyle, color: element.color }">
          {{ element.name }}
        </div>

        <!-- 数字按钮容器 -->
        <div
          class="wuxing-numbers"
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            gap: `${config.wuxingElementStyle?.numberGap || 3}px`
          }"
        >
          <span
            v-for="number in element.numbers"
            :key="number"
            class="number-button"
            :style="getNumberButtonStyle(number)"
          >
            {{ number }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wuxing-area {
  .wuxing-title {
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .wuxing-rows {
    .wuxing-row {
      &:last-child {
        margin-bottom: 0;
      }
    }

    // wuxing-numbers 样式已移至内联样式
  }

  // 响应式调整
  @media (max-width: 768px) {
    .wuxing-row {
      flex-direction: column;
      align-items: flex-start !important;

      .wuxing-name {
        margin-bottom: 6px !important;
        margin-right: 0 !important;
      }
    }
  }

    @media (max-width: 480px) {
    .wuxing-numbers {
      gap: 2px !important;
    }
  }
}
</style>
