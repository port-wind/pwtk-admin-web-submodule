<script setup lang="ts" name="NumberOddEvenArea">
import { computed, onMounted } from 'vue'
import { getPlayTypes } from '../../store/gameStore'
import type { Zodiac12WuxingPageConfig } from '../type'

interface IProps {
  config: Zodiac12WuxingPageConfig
}
const props = defineProps<IProps>()

// 🔢 从 gameStore 获取合数单双数据
const playTypes = computed(() => getPlayTypes())
const numberOddEvenData = computed(() => playTypes.value.find((item) => item.code === '8018')?.options || {})

// 🔢 合数单双数据配置（按照图片中的顺序：合数单、合数双）
const numberOddEvenElements = computed(() => [
  { name: '合数单', color: '#ff6b6b', numbers: numberOddEvenData.value['合数单'] || [] },
  { name: '合数双', color: '#4ecdc4', numbers: numberOddEvenData.value['合数双'] || [] }
])

// 🎨 样式计算
const numberOddEvenAreaStyle = computed(() => ({
  backgroundColor: props.config.numberOddEvenAreaStyle?.backgroundColor || '#f8f9fa',
  borderRadius: `${props.config.numberOddEvenAreaStyle?.borderRadius || 8}px`,
  padding: `${props.config.numberOddEvenAreaStyle?.padding || 16}px`,
  marginTop: `${props.config.numberOddEvenAreaStyle?.marginTop || 16}px`
}))

const numberOddEvenTitleStyle = computed(() => ({
  fontSize: `${props.config.numberOddEvenTitleStyle?.fontSize || 18}px`,
  fontWeight: '600',
  color: props.config.numberOddEvenTitleStyle?.color || '#2c3e50',
  marginBottom: '12px',
  textAlign: 'center' as const
}))

const numberOddEvenRowStyle = computed(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: `${props.config.numberOddEvenGridStyle?.gap || 8}px`,
  backgroundColor: props.config.numberOddEvenCardStyle?.backgroundColor || '#ffffff',
  borderRadius: `${props.config.numberOddEvenCardStyle?.borderRadius || 6}px`,
  padding: `${props.config.numberOddEvenCardStyle?.padding || 8}px`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
}))

const numberOddEvenNameStyle = computed(() => ({
  fontSize: `${props.config.numberOddEvenElementStyle?.nameSize || 16}px`,
  fontWeight: '600',
  minWidth: '60px',
  marginRight: '12px',
  textAlign: 'center' as const
}))

// 获取数字颜色（使用合数单双自身的颜色）
const getNumberColor = (numberOddEvenName: string) => {
  const element = numberOddEvenElements.value.find((el) => el.name === numberOddEvenName)
  return element?.color || '#6c757d'
}

const getNumberButtonStyle = (number: string, elementName: string) => ({
  backgroundColor: getNumberColor(elementName),
  color: 'white',
  border: 'none',
  borderRadius: `${props.config.numberOddEvenElementStyle?.numberBorderRadius || 3}px`,
  fontSize: `${props.config.numberOddEvenElementStyle?.numberFontSize || 10}px`,
  fontWeight: '600',
  padding: '0',
  width: `${props.config.numberOddEvenElementStyle?.numberWidth || 24}px`,
  height: `${props.config.numberOddEvenElementStyle?.numberHeight || 20}px`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
})

// 📱 导出接口
defineExpose({
  numberOddEvenElements,
  numberOddEvenData
})

onMounted(() => {
  console.log('🔢 NumberOddEvenArea 组件已挂载，合数单双数据:', numberOddEvenData.value)
})
</script>

<template>
  <div class="number-odd-even-area" :style="numberOddEvenAreaStyle" v-if="config.showNumberOddEven !== false">
    <!-- 合数单双标题 -->
    <div class="number-odd-even-title" :style="numberOddEvenTitleStyle">
      {{ config.numberOddEvenTitle || '合数单双' }}
    </div>

    <!-- 合数单双行布局 -->
    <div class="number-odd-even-rows">
      <div
        v-for="element in numberOddEvenElements"
        :key="element.name"
        class="number-odd-even-row"
        :style="numberOddEvenRowStyle"
      >
        <!-- 合数单双名称 -->
        <div class="number-odd-even-name" :style="{ ...numberOddEvenNameStyle, color: element.color }">
          {{ element.name }}
        </div>

        <!-- 数字按钮容器 -->
        <div
          class="number-odd-even-numbers"
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            gap: `${config.numberOddEvenElementStyle?.numberGap || 3}px`
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
.number-odd-even-area {
  .number-odd-even-title {
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .number-odd-even-rows {
    .number-odd-even-row {
      &:last-child {
        margin-bottom: 0;
      }
    }

    // number-odd-even-numbers 样式已移至内联样式
  }

  // 响应式调整
  @media (max-width: 768px) {
    .number-odd-even-row {
      flex-direction: column;
      align-items: flex-start !important;

      .number-odd-even-name {
        margin-bottom: 6px !important;
        margin-right: 0 !important;
      }
    }
  }

  @media (max-width: 480px) {
    .number-odd-even-numbers {
      gap: 2px !important;
    }
  }
}
</style>
