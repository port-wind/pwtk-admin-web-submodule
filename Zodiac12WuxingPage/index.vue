<script setup lang="ts" name="Zodiac12WuxingPage">
import { computed, onMounted } from 'vue'
import { mockData } from '@/views/WebVision/components/rightslider/Zodiac12WuxingPageStyle/mockData'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 🎯 从mockData获取生肖数据
const { shengXiaoToNumber, playTypes } = mockData
const waveColorData = playTypes.find((item) => item.code === '8007')?.options || {}

// 🎨 颜色映射 - 使用真实的波色数据
const numberToColorMap = new Map<string, string>()
const colorMapping = {
  红波: '#ff4757',
  蓝波: '#3742fa',
  绿波: '#2ed573'
}

// 初始化颜色映射
Object.entries(waveColorData).forEach(([colorKey, numbers]) => {
  const color = colorMapping[colorKey as keyof typeof colorMapping]
  if (color && Array.isArray(numbers)) {
    numbers.forEach((num) => {
      numberToColorMap.set(num, color)
    })
  }
})

// 🐲 生肖冲克关系映射 - 使用真实数据而非硬编码
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

// 🎯 生肖拼音映射
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

// 🔄 基于mockData动态生成生肖配置 - 按照参考图片的顺序
const zodiacOrder = ['蛇', '龙', '兔', '虎', '牛', '鼠', '猪', '狗', '鸡', '猴', '羊', '马']
const zodiacConfig = computed(() => {
  return zodiacOrder.map((zodiacName) => {
    const clashWith = zodiacClashMap[zodiacName]
    return {
      name: zodiacName,
      pinyin: zodiacPinyinMap[zodiacName],
      displayName: `${zodiacName}[冲 ${clashWith}]`,
      numbers: shengXiaoToNumber[zodiacName] || []
    }
  })
})

// 🎨 样式计算
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

const containerStyle = computed(() => ({
  backgroundColor: styleMain.value?.backgroundColor || '#f8f9fa',
  borderRadius: `${styleMain.value?.borderRadius || 8}px`,
  padding: `${styleMain.value?.padding || 16}px`,
  fontFamily: 'Arial, sans-serif'
}))

const titleHeaderStyle = computed(() => {
  if (styleHeader.value?.isGradient) {
    return {
      background: `linear-gradient(to right, ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  }
  return {
    backgroundColor: styleHeader.value?.headerBgColor || '#2c3e50'
  }
})

const mainTitleStyle = computed(() => ({
  color: styleHeader.value?.titleColor || '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center' as const
}))

const subTitleStyle = computed(() => ({
  color: styleHeader.value?.subTitleColor || '#ecf0f1',
  fontSize: '13px',
  textAlign: 'center' as const
}))

// 🔢 获取数字对应的颜色
const getNumberColor = (num: string) => {
  return numberToColorMap.get(num) || '#6c757d'
}

// 🖼️ 获取生肖图片路径
const getZodiacImagePath = (pinyin: string) => {
  try {
    return new URL(`./shengxiao/${pinyin}.gif`, import.meta.url).href
  } catch (error) {
    console.warn(`生肖图片 ${pinyin}.gif 未找到`)
    return ''
  }
}

// 📱 导出颜色映射供其他组件使用
defineExpose({
  numberToColorMap,
  getNumberColor
})

onMounted(() => {
  console.log('🎨 生肖颜色映射已初始化:', numberToColorMap)
  console.log('🐲 生肖配置:', zodiacConfig.value)
})
</script>

<template>
  <div class="Zodiac12WuxingPage">
    <div class="zodiac12wuxingpage-content" :style="containerStyle" v-if="datas.configParamJson.enable">
      <!-- 标题区域 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">
          {{ datas.configParamJson.title || '2025蛇年（十二生肖号码对照）' }}
        </h2>
        <div v-if="datas.configParamJson.subtitle" class="sub-title" :style="subTitleStyle">
          {{ datas.configParamJson.subtitle }}
        </div>
      </div>

      <!-- 生肖网格布局 -->
      <div class="zodiac-grid">
        <div v-for="(zodiac, index) in zodiacConfig" :key="zodiac.name" class="zodiac-card">
          <!-- 生肖图片和名称 -->
          <div class="zodiac-header">
            <img :src="getZodiacImagePath(zodiac.pinyin)" :alt="zodiac.name" class="zodiac-image" draggable="false" />
            <div class="zodiac-name">{{ zodiac.displayName }}</div>
          </div>

          <!-- 数字按钮组 -->
          <div class="number-buttons">
            <button
              v-for="number in zodiac.numbers"
              :key="number"
              class="number-button"
              :style="{ backgroundColor: getNumberColor(number) }"
            >
              {{ number }}
            </button>
          </div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div v-if="datas.configParamJson.content" class="content-description">
        {{ datas.configParamJson.content }}
      </div>
    </div>

    <!-- 必需的删除按钮插槽 -->
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.Zodiac12WuxingPage {
  position: relative;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;

  .zodiac12wuxingpage-content {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .title-header {
    padding: 12px 16px;
    background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
    text-align: center;

    .main-title {
      margin: 0 0 2px 0;
      font-size: 18px;
      font-weight: bold;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .sub-title {
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .zodiac-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    padding: 12px;
    background: #f8f9fa;
  }

  .zodiac-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e9ecef;
    padding: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    .zodiac-header {
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .zodiac-image {
        width: 48px;
        height: 48px;
        margin-bottom: 4px;
        border-radius: 6px;
        background: #f8f9fa;
        padding: 2px;
        border: 1px solid #e9ecef;
        object-fit: contain;
      }

      .zodiac-name {
        font-size: 12px;
        font-weight: bold;
        color: #2c3e50;
        white-space: nowrap;
        margin-bottom: 4px;
      }
    }

    .number-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      justify-content: center;
      width: 100%;

      .number-button {
        width: 26px;
        height: 22px;
        border: none;
        border-radius: 3px;
        color: white;
        font-weight: bold;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.1s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .content-description {
    padding: 12px 16px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    font-size: 13px;
    color: #6c757d;
    text-align: center;
    line-height: 1.5;
  }

  // 响应式布局
  @media (max-width: 768px) {
    .zodiac-grid {
      gap: 6px;
      padding: 8px;
    }

    .zodiac-card {
      padding: 6px;

      .zodiac-header {
        margin-bottom: 6px;

        .zodiac-image {
          width: 40px;
          height: 40px;
        }

        .zodiac-name {
          font-size: 11px;
        }
      }

      .number-buttons {
        gap: 2px;

        .number-button {
          width: 22px;
          height: 18px;
          font-size: 9px;
        }
      }
    }

    .title-header {
      padding: 10px 12px;

      .main-title {
        font-size: 16px;
      }

      .sub-title {
        font-size: 11px;
      }
    }
  }

  @media (max-width: 480px) {
    .zodiac-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 4px;
      padding: 6px;
    }

    .zodiac-card {
      padding: 4px;

      .zodiac-header {
        .zodiac-image {
          width: 32px;
          height: 32px;
        }

        .zodiac-name {
          font-size: 10px;
        }
      }

      .number-buttons {
        gap: 1px;

        .number-button {
          width: 18px;
          height: 16px;
          font-size: 8px;
        }
      }
    }
  }
}
</style>
