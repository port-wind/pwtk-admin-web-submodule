<script setup lang="ts" name="WuxingArea">
import { computed, onMounted, defineComponent, h, watch } from 'vue'
import type { Zodiac12WuxingPageConfig } from '../type'

interface IProps {
  config: Zodiac12WuxingPageConfig
}
const props = defineProps<IProps>()

// 🌟 五行数据配置
const wuxingElements = [
  { name: '金', color: '#FFD700', description: '属金的号码' },
  { name: '木', color: '#228B22', description: '属木的号码' },
  { name: '水', color: '#4169E1', description: '属水的号码' },
  { name: '火', color: '#FF6347', description: '属火的号码' },
  { name: '土', color: '#8B4513', description: '属土的号码' }
]

// 🎨 样式计算
const wuxingAreaStyle = computed(() => ({
  backgroundColor: props.config.wuxingAreaStyle?.backgroundColor || '#f8f9fa',
  borderRadius: `${props.config.wuxingAreaStyle?.borderRadius || 8}px`,
  padding: `${props.config.wuxingAreaStyle?.padding || 12}px`,
  marginTop: `${props.config.wuxingAreaStyle?.marginTop || 16}px`
}))

const wuxingGridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.config.wuxingGridStyle?.columns || 5}, 1fr)`,
  gap: `${props.config.wuxingGridStyle?.gap || 8}px`,
  padding: `${props.config.wuxingGridStyle?.padding || 8}px`
}))

const wuxingCardStyle = computed(() => ({
  backgroundColor: props.config.wuxingCardStyle?.backgroundColor || '#ffffff',
  borderRadius: `${props.config.wuxingCardStyle?.borderRadius || 6}px`,
  padding: `${props.config.wuxingCardStyle?.padding || 8}px`,
  textAlign: 'center' as const,
  boxShadow: `0 2px 4px ${props.config.wuxingCardStyle?.shadowColor || 'rgba(0, 0, 0, 0.1)'}`
}))

const wuxingTitleStyle = computed(() => ({
  fontSize: `${props.config.wuxingTitleStyle?.fontSize || 16}px`,
  fontWeight: props.config.wuxingTitleStyle?.fontWeight || 600,
  color: props.config.wuxingTitleStyle?.color || '#2c3e50',
  marginBottom: `${props.config.wuxingTitleStyle?.marginBottom || 8}px`,
  textAlign: 'center' as const
}))

// 🎯 WuxingCard 子组件
const WuxingCard = defineComponent({
  name: 'WuxingCard',
  props: {
    element: { type: Object, required: true },
    cardStyle: { type: Object, required: true }
  },
  setup(cardProps) {
    return () =>
      h(
        'div',
        {
          class: 'wuxing-card',
          style: cardProps.cardStyle
        },
        [
          h(
            'div',
            {
              class: 'wuxing-name',
              style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: cardProps.element.color,
                marginBottom: '4px'
              }
            },
            cardProps.element.name
          ),
          h(
            'div',
            {
              class: 'wuxing-description',
              style: {
                fontSize: '12px',
                color: '#666',
                marginBottom: '8px'
              }
            },
            cardProps.element.description
          ),
          h(
            'div',
            {
              class: 'wuxing-numbers',
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2px',
                justifyContent: 'center'
              }
            },
            [
              // 这里将来会添加具体的号码
              h(
                'div',
                {
                  style: {
                    fontSize: '10px',
                    color: '#999',
                    fontStyle: 'italic'
                  }
                },
                '待完善...'
              )
            ]
          )
        ]
      )
  }
})

// 📱 导出接口
defineExpose({
  wuxingElements,
  wuxingAreaStyle,
  wuxingGridStyle,
  wuxingCardStyle
})

onMounted(() => {
  console.log('🌟 WuxingArea 组件已挂载')
})
</script>

<template>
  <div class="wuxing-area" :style="wuxingAreaStyle" v-if="config.showWuxing !== false">
    <!-- 五行标题 -->
    <div class="wuxing-title" :style="wuxingTitleStyle">
      {{ config.wuxingTitle || '五行属性' }}
    </div>

    <!-- 五行网格 -->
    <div class="wuxing-grid" :style="wuxingGridStyle">
      <WuxingCard
        v-for="element in wuxingElements"
        :key="element.name"
        :element="element"
        :card-style="wuxingCardStyle"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wuxing-area {
  .wuxing-title {
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }

  .wuxing-grid {
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 6px !important;
    }

    @media (max-width: 480px) {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 4px !important;
    }
  }
}
</style> 