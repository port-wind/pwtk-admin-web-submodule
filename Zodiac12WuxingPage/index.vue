<script setup lang="ts" name="Zodiac12WuxingPage">
import { computed, onMounted } from 'vue'
import { mockData } from '@/views/WebVision/components/rightslider/Zodiac12WuxingPageStyle/mockData'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 🎯 生肖数据映射
const { shengXiaoToNumber, playTypes } = mockData
const waveColorData = playTypes.find((item) => item.code === '8007')?.options || {}

// 🎨 颜色映射 - 创建数字到颜色的映射
const numberToColorMap = new Map<string, string>()
const colorMapping = {
  红波: '#ff6b6b',
  蓝波: '#4dabf7',
  绿波: '#51cf66'
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

// 🐲 生肖配置 - 按布局顺序排列
const zodiacConfig = [
  { name: '蛇', pinyin: 'she', displayName: '蛇[冲 猪]' },
  { name: '龙', pinyin: 'long', displayName: '龙[冲 狗]' },
  { name: '兔', pinyin: 'tu', displayName: '兔[冲 鸡]' },
  { name: '虎', pinyin: 'hu', displayName: '虎[冲 猴]' },
  { name: '牛', pinyin: 'niu', displayName: '牛[冲 羊]' },
  { name: '鼠', pinyin: 'shu', displayName: '鼠[冲 马]' },
  { name: '猪', pinyin: 'zhu', displayName: '猪[冲 蛇]' },
  { name: '狗', pinyin: 'gou', displayName: '狗[冲 龙]' },
  { name: '鸡', pinyin: 'ji', displayName: '鸡[冲 兔]' },
  { name: '猴', pinyin: 'hou', displayName: '猴[冲 虎]' },
  { name: '羊', pinyin: 'yang', displayName: '羊[冲 牛]' },
  { name: '马', pinyin: 'ma', displayName: '马[冲 鼠]' }
]

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
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const
}))

const subTitleStyle = computed(() => ({
  color: styleHeader.value?.subTitleColor || '#ecf0f1',
  fontSize: '14px',
  textAlign: 'center' as const
}))

// 🔢 获取生肖对应的数字按钮
const getZodiacNumbers = (zodiacName: string) => {
  const numbers = shengXiaoToNumber[zodiacName] || []
  return numbers.map((num) => ({
    number: num,
    color: numberToColorMap.get(num) || '#6c757d'
  }))
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
  getNumberColor: (num: string) => numberToColorMap.get(num) || '#6c757d'
})

onMounted(() => {
  console.log('🎨 生肖颜色映射已初始化:', numberToColorMap)
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
        <div
          v-for="(zodiac, index) in zodiacConfig"
          :key="zodiac.name"
          class="zodiac-card"
          :class="`zodiac-${zodiac.pinyin}`"
        >
          <!-- 生肖图片和名称 -->
          <div class="zodiac-header">
            <img :src="getZodiacImagePath(zodiac.pinyin)" :alt="zodiac.name" class="zodiac-image" draggable="false" />
            <div class="zodiac-name">{{ zodiac.displayName }}</div>
          </div>

          <!-- 数字按钮组 -->
          <div class="number-buttons">
            <button
              v-for="numberInfo in getZodiacNumbers(zodiac.name)"
              :key="numberInfo.number"
              class="number-button"
              :style="{ backgroundColor: numberInfo.color }"
            >
              {{ numberInfo.number }}
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
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }

  .title-header {
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    text-align: center;
    position: relative;

    .main-title {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: bold;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .sub-title {
      margin: 0;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .zodiac-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px;
    padding: 20px;
    background: white;
  }

  .zodiac-card {
    background: white;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    padding: 16px;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      border-color: #4dabf7;
    }

    .zodiac-header {
      margin-bottom: 12px;

      .zodiac-image {
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
        border-radius: 50%;
        background: #f8f9fa;
        padding: 4px;
        border: 2px solid #e9ecef;
      }

      .zodiac-name {
        font-size: 14px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 4px;
      }
    }

    .number-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;

      .number-button {
        width: 32px;
        height: 28px;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

        &:hover {
          transform: scale(1.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        &:active {
          transform: scale(0.95);
        }
      }
    }
  }

  .content-description {
    padding: 16px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
    font-size: 14px;
    color: #6c757d;
    text-align: center;
    line-height: 1.6;
  }

  // 响应式布局
  @media (max-width: 768px) {
    .zodiac-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(6, 1fr);
      gap: 12px;
      padding: 16px;
    }

    .zodiac-card {
      padding: 12px;

      .zodiac-header {
        .zodiac-image {
          width: 40px;
          height: 40px;
        }

        .zodiac-name {
          font-size: 12px;
        }
      }

      .number-buttons {
        gap: 4px;

        .number-button {
          width: 28px;
          height: 24px;
          font-size: 10px;
        }
      }
    }

    .title-header {
      padding: 16px;

      .main-title {
        font-size: 20px;
      }

      .sub-title {
        font-size: 12px;
      }
    }
  }

  @media (max-width: 480px) {
    .zodiac-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(12, 1fr);
    }

    .zodiac-card {
      .number-buttons {
        .number-button {
          width: 24px;
          height: 20px;
          font-size: 9px;
        }
      }
    }
  }
}
</style>
