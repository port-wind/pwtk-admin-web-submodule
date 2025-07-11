<script setup lang="ts" name="ZodiacGridArea">
import { computed, onMounted, defineComponent, h, watch } from 'vue'
import { mockData } from '@/views/WebVision/components/rightslider/Zodiac12WuxingPageStyle/mockData'
import type {
  IZodiacCardStyle,
  IZodiacImageStyle,
  IZodiacNameStyle,
  INumberButtonStyle,
  IGridLayoutStyle,
  Zodiac12WuxingPageConfig
} from '../type'

interface IProps {
  config: Zodiac12WuxingPageConfig
}
const props = defineProps<IProps>()

// 🎯 从mockData获取生肖数据
const { shengXiaoToNumber, playTypes } = mockData
const waveColorData = playTypes.find((item) => item.code === '8007')?.options || {}

// 🎨 动态颜色映射 - 支持自定义配置
const numberToColorMap = new Map<string, string>()

const getColorMapping = () => {
  const customColors = props.config.customColorMapping
  return {
    红波: customColors?.redWave || '#ff4757',
    蓝波: customColors?.blueWave || '#3742fa',
    绿波: customColors?.greenWave || '#2ed573'
  }
}

// 初始化颜色映射
const initializeColorMapping = () => {
  numberToColorMap.clear()
  const colorMapping = getColorMapping()

  Object.entries(waveColorData).forEach(([colorKey, numbers]) => {
    const color = colorMapping[colorKey as keyof typeof colorMapping]
    if (color && Array.isArray(numbers)) {
      numbers.forEach((num) => {
        numberToColorMap.set(num, color)
      })
    }
  })
}

// 🐲 生肖配置数据
const zodiacClashMap: Record<string, string> = {
  鼠: '马',
  牛: '羊',
  虎: '猴',
  兔: '鸡',
  龙: '狗',
  蛇: '猪',
  马: '鼠',
  羊: '牛',
  猴: '虎',
  鸡: '兔',
  狗: '龙',
  猪: '蛇'
}

const zodiacPinyinMap: Record<string, string> = {
  鼠: 'shu',
  牛: 'niu',
  虎: 'hu',
  兔: 'tu',
  龙: 'long',
  蛇: 'she',
  马: 'ma',
  羊: 'yang',
  猴: 'hou',
  鸡: 'ji',
  狗: 'gou',
  猪: 'zhu'
}

// 🔄 动态生肖配置
const zodiacConfig = computed(() => {
  const customOrder = props.config.zodiacOrder || [
    '蛇',
    '龙',
    '兔',
    '虎',
    '牛',
    '鼠',
    '猪',
    '狗',
    '鸡',
    '猴',
    '羊',
    '马'
  ]

  return customOrder.map((zodiacName) => {
    const clashWith = zodiacClashMap[zodiacName]
    const showClash = props.config.showClashNames !== false

    return {
      name: zodiacName,
      pinyin: zodiacPinyinMap[zodiacName],
      displayName: showClash ? `${zodiacName}[冲 ${clashWith}]` : zodiacName,
      numbers: shengXiaoToNumber[zodiacName] || []
    }
  })
})

// 默认样式配置
const getDefaultZodiacCardStyle = (): IZodiacCardStyle => ({
  backgroundColor: '#ffffff',
  borderRadius: 12,
  borderColor: '#e9ecef',
  borderWidth: 1,
  padding: 8,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowBlur: 3,
  hoverShadowBlur: 6,
  hoverTransform: 'translateY(-1px)'
})

const getDefaultZodiacImageStyle = (): IZodiacImageStyle => ({
  width: 48,
  height: 48,
  borderRadius: 6,
  backgroundColor: '#f8f9fa',
  borderColor: '#e9ecef',
  borderWidth: 1,
  marginBottom: 4
})

const getDefaultZodiacNameStyle = (): IZodiacNameStyle => ({
  fontSize: 12,
  fontWeight: 700,
  color: '#2c3e50',
  marginBottom: 4,
  textAlign: 'center'
})

const getDefaultNumberButtonStyle = (): INumberButtonStyle => ({
  width: 26,
  height: 22,
  borderRadius: 3,
  fontSize: 10,
  fontWeight: 700,
  gap: 3,
  shadowBlur: 2,
  hoverScale: 1.05,
  transition: 'all 0.1s ease'
})

const getDefaultGridLayoutStyle = (): IGridLayoutStyle => ({
  columns: 4,
  gap: 8,
  padding: 12,
  backgroundColor: '#f8f9fa'
})

// 样式合并计算
const zodiacCardStyle = computed(() => ({
  ...getDefaultZodiacCardStyle(),
  ...props.config.zodiacCardStyle
}))

const zodiacImageStyle = computed(() => ({
  ...getDefaultZodiacImageStyle(),
  ...props.config.zodiacImageStyle
}))

const zodiacNameStyle = computed(() => ({
  ...getDefaultZodiacNameStyle(),
  ...props.config.zodiacNameStyle
}))

const numberButtonStyle = computed(() => ({
  ...getDefaultNumberButtonStyle(),
  ...props.config.numberButtonStyle
}))

const gridLayoutStyle = computed(() => ({
  ...getDefaultGridLayoutStyle(),
  ...props.config.gridLayoutStyle
}))

// 🔢 获取数字对应的颜色
const getNumberColor = (num: string) => {
  return numberToColorMap.get(num) || '#6c757d'
}

// 🖼️ 获取生肖图片路径
const getZodiacImagePath = (pinyin: string) => {
  try {
    return new URL(`../shengxiao/${pinyin}.gif`, import.meta.url).href
  } catch (error) {
    console.warn(`生肖图片 ${pinyin}.gif 未找到`)
    return ''
  }
}

// 🎯 ZodiacCard 子组件
const ZodiacCard = defineComponent({
  name: 'ZodiacCard',
  props: {
    zodiac: { type: Object, required: true },
    cardStyle: { type: Object, required: true },
    imageStyle: { type: Object, required: true },
    nameStyle: { type: Object, required: true },
    buttonStyle: { type: Object, required: true }
  },
  setup(cardProps) {
    const cardComputedStyle = computed(() => ({
      backgroundColor: cardProps.cardStyle.backgroundColor,
      borderRadius: `${cardProps.cardStyle.borderRadius}px`,
      border: `${cardProps.cardStyle.borderWidth}px solid ${cardProps.cardStyle.borderColor}`,
      padding: `${cardProps.cardStyle.padding}px`,
      boxShadow: `0 ${cardProps.cardStyle.shadowBlur}px ${cardProps.cardStyle.shadowBlur * 2}px ${
        cardProps.cardStyle.shadowColor
      }`,
      transition: `all ${cardProps.buttonStyle.transition}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }))

    const imageComputedStyle = computed(() => ({
      width: `${cardProps.imageStyle.width}px`,
      height: `${cardProps.imageStyle.height}px`,
      borderRadius: `${cardProps.imageStyle.borderRadius}px`,
      backgroundColor: cardProps.imageStyle.backgroundColor,
      border: `${cardProps.imageStyle.borderWidth}px solid ${cardProps.imageStyle.borderColor}`,
      marginBottom: `${cardProps.imageStyle.marginBottom}px`,
      padding: '2px',
      objectFit: 'contain' as const
    }))

    const nameComputedStyle = computed(() => ({
      fontSize: `${cardProps.nameStyle.fontSize}px`,
      fontWeight: cardProps.nameStyle.fontWeight,
      color: cardProps.nameStyle.color,
      marginBottom: `${cardProps.nameStyle.marginBottom}px`,
      textAlign: cardProps.nameStyle.textAlign,
      whiteSpace: 'nowrap' as const
    }))

    const numberButtonsStyle = computed(() => ({
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: `${cardProps.buttonStyle.gap}px`,
      justifyContent: 'center',
      width: '100%'
    }))

    const getButtonStyle = (number: string) => ({
      width: `${cardProps.buttonStyle.width}px`,
      height: `${cardProps.buttonStyle.height}px`,
      borderRadius: `${cardProps.buttonStyle.borderRadius}px`,
      fontSize: `${cardProps.buttonStyle.fontSize}px`,
      fontWeight: cardProps.buttonStyle.fontWeight,
      backgroundColor: getNumberColor(number),
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      transition: cardProps.buttonStyle.transition,
      boxShadow: `0 1px ${cardProps.buttonStyle.shadowBlur}px rgba(0, 0, 0, 0.2)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    })

    const onCardHover = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      target.style.transform = cardProps.cardStyle.hoverTransform
      target.style.boxShadow = `0 ${cardProps.cardStyle.hoverShadowBlur}px ${
        cardProps.cardStyle.hoverShadowBlur * 2
      }px ${cardProps.cardStyle.shadowColor}`
    }

    const onCardLeave = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      target.style.transform = 'none'
      target.style.boxShadow = `0 ${cardProps.cardStyle.shadowBlur}px ${cardProps.cardStyle.shadowBlur * 2}px ${
        cardProps.cardStyle.shadowColor
      }`
    }

    const onButtonHover = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      target.style.transform = `scale(${cardProps.buttonStyle.hoverScale})`
      target.style.boxShadow = `0 2px ${cardProps.buttonStyle.shadowBlur * 2}px rgba(0, 0, 0, 0.3)`
    }

    const onButtonLeave = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      target.style.transform = 'scale(1)'
      target.style.boxShadow = `0 1px ${cardProps.buttonStyle.shadowBlur}px rgba(0, 0, 0, 0.2)`
    }

    return () =>
      h(
        'div',
        {
          class: 'zodiac-card',
          style: cardComputedStyle.value,
          onMouseenter: onCardHover,
          onMouseleave: onCardLeave
        },
        [
          // Header section
          h(
            'div',
            {
              class: 'zodiac-header',
              style: {
                marginBottom: `${cardProps.imageStyle.marginBottom + 4}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }
            },
            [
              // Image
              h('img', {
                src: getZodiacImagePath(cardProps.zodiac.pinyin),
                alt: cardProps.zodiac.name,
                style: imageComputedStyle.value,
                draggable: false
              }),
              // Name
              h(
                'div',
                {
                  class: 'zodiac-name',
                  style: nameComputedStyle.value
                },
                cardProps.zodiac.displayName
              )
            ]
          ),
          // Number buttons
          h(
            'div',
            {
              class: 'number-buttons',
              style: numberButtonsStyle.value
            },
            cardProps.zodiac.numbers.map((number: string) =>
              h(
                'button',
                {
                  key: number,
                  class: 'number-button',
                  style: getButtonStyle(number),
                  onMouseenter: onButtonHover,
                  onMouseleave: onButtonLeave
                },
                number
              )
            )
          )
        ]
      )
  }
})

// 响应式样式
const responsiveBreakpoints = computed(() => ({
  tablet: props.config.responsiveBreakpoints?.tablet || 768,
  mobile: props.config.responsiveBreakpoints?.mobile || 480
}))

// 📱 导出接口
defineExpose({
  numberToColorMap,
  getNumberColor,
  zodiacConfig,
  initializeColorMapping
})

onMounted(() => {
  initializeColorMapping()
})

// 监听配置变化重新初始化颜色映射
watch(
  () => props.config.customColorMapping,
  () => {
    initializeColorMapping()
  },
  { deep: true }
)
</script>

<template>
  <div
    class="zodiac-grid-area"
    :style="{
      display: 'grid',
      gridTemplateColumns: `repeat(${gridLayoutStyle.columns}, 1fr)`,
      gap: `${gridLayoutStyle.gap}px`,
      padding: `${gridLayoutStyle.padding}px`,
      backgroundColor: gridLayoutStyle.backgroundColor
    }"
  >
    <ZodiacCard
      v-for="zodiac in zodiacConfig"
      :key="zodiac.name"
      :zodiac="zodiac"
      :card-style="zodiacCardStyle"
      :image-style="zodiacImageStyle"
      :name-style="zodiacNameStyle"
      :button-style="numberButtonStyle"
    />
  </div>
</template>

<style scoped lang="scss">
.zodiac-grid-area {
  // Responsive styles are handled dynamically through computed styles
  @media (max-width: v-bind('responsiveBreakpoints.tablet + "px"')) {
    gap: 6px !important;
    padding: 8px !important;
  }

  @media (max-width: v-bind('responsiveBreakpoints.mobile + "px"')) {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 4px !important;
    padding: 6px !important;
  }
}
</style>
