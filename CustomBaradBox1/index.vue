<template>
  <div class="custom-bar-ad-box">
    <div class="bar-ad-container" :class="`mode-${config.model}`">
      <!-- 模式 1: 滚动文字广告 -->
      <div v-if="config.model === 's1'" class="scrolling-ads">
        <div class="scrolling-content" ref="scrollingRef">
          <div
            v-for="(item, index) in config.itemData"
            :key="index"
            class="scrolling-item"
            @click="handleItemClick(item)"
          >
            {{ item.text }}
          </div>
        </div>
      </div>

      <!-- 模式 2: 卡片式广告 -->
      <div v-else-if="config.model === 's2'" class="card-ads">
        <div v-for="(item, index) in displayItems" :key="index" class="card-item" @click="handleItemClick(item)">
          <div v-if="item.icon" class="card-icon">
            <img :src="getFullImageUrl(item.icon)" :alt="item.text" draggable="false" />
          </div>
          <div class="card-text">{{ item.text }}</div>
          <div v-if="item.highlight" class="card-highlight">{{ item.highlight }}</div>
        </div>
      </div>

      <!-- 模式 3: 横幅广告 -->
      <div v-else-if="config.model === 's3'" class="banner-ads">
        <div v-for="(item, index) in displayItems" :key="index" class="banner-item" @click="handleItemClick(item)">
          <div class="banner-content">
            <div class="banner-main">{{ item.text }}</div>
            <div v-if="item.subtext" class="banner-sub">{{ item.subtext }}</div>
          </div>
          <div v-if="item.action" class="banner-action">
            {{ item.action }}
          </div>
        </div>
      </div>
    </div>

    <!-- 插槽：用于拖拽时的删除操作 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { CustomBarAdConfig, AdItem } from './type'

interface Props {
  data: {
    componentName: string
    componentType: string
    configParamJson: {
      model?: string
      itemData?: Array<{ text: string; link?: string; icon?: string }>
    }
  }
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  pageModel: 'websiteMode'
})

const scrollingRef = ref<HTMLElement>()
let scrollInterval: NodeJS.Timeout | null = null

// 配置处理
const config = computed(() => {
  let configParamJson = {}

  if (props.data?.configParamJson) {
    try {
      if (typeof props.data.configParamJson === 'string') {
        configParamJson = JSON.parse(props.data.configParamJson)
      } else {
        configParamJson = props.data.configParamJson
      }
    } catch (error) {
      console.error('CustomBarAdBox: JSON 解析错误', error)
    }
  }

  const itemData = configParamJson.itemData || []

  // 如果没有数据，生成默认数据
  const defaultData =
    itemData.length > 0
      ? itemData
      : [
          { text: '站长推荐：藏宝阁◁六肖⑥码▷连中好料✔', link: 'www.baidu.com' },
          { text: '站长推荐：藏宝阁◁公式七尾▷等您验证✔', link: 'www.baidu.com' },
          { text: '站长推荐：藏宝阁◁精准三码▷必中特马✔', link: 'www.baidu.com' }
        ]

  return {
    model: configParamJson.model || 's1',
    itemData: defaultData
  }
})

// 显示的项目（限制数量）
const displayItems = computed(() => {
  return config.value.itemData.slice(0, 6) // 最多显示6个
})

// 获取完整图片URL
const getFullImageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${import.meta.env.VITE_FILE_URL || ''}/${path}`
}

// 处理点击事件
const handleItemClick = (item: AdItem) => {
  if (item.link) {
    if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
      window.open(item.link, '_blank')
    } else {
      window.location.href = item.link
    }
  }
}

// 初始化滚动动画
const initScrolling = () => {
  if (config.value.model !== 's1' || !scrollingRef.value) return

  const scrollElement = scrollingRef.value
  let scrollAmount = 0
  const scrollStep = 1
  const scrollSpeed = 50 // ms

  scrollInterval = setInterval(() => {
    scrollAmount += scrollStep
    if (scrollAmount >= scrollElement.scrollWidth / 2) {
      scrollAmount = 0
    }
    scrollElement.style.transform = `translateX(-${scrollAmount}px)`
  }, scrollSpeed)
}

onMounted(() => {
  if (config.value.model === 's1') {
    initScrolling()
  }
})

onUnmounted(() => {
  if (scrollInterval) {
    clearInterval(scrollInterval)
  }
})
</script>

<style lang="scss" scoped>
.custom-bar-ad-box {
  position: relative;
  width: 100%;
}

.bar-ad-container {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  border-radius: 6px;

  // 模式 1: 滚动文字
  &.mode-s1 {
    height: 40px;

    .scrolling-ads {
      height: 100%;
      overflow: hidden;
      position: relative;

      .scrolling-content {
        display: flex;
        white-space: nowrap;
        will-change: transform;

        .scrolling-item {
          display: inline-block;
          padding: 0 30px;
          line-height: 40px;
          font-size: 14px;
          cursor: pointer;
          transition: color 0.3s ease;

          &:hover {
            color: #ffd700;
          }

          &:not(:last-child)::after {
            content: '|';
            margin-left: 30px;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }

  // 模式 2: 卡片式
  &.mode-s2 {
    padding: 12px;

    .card-ads {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;

      .card-item {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);

        &:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .card-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 8px;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .card-text {
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .card-highlight {
          font-size: 12px;
          color: #ffd700;
          font-weight: 600;
        }
      }
    }
  }

  // 模式 3: 横幅式
  &.mode-s3 {
    .banner-ads {
      .banner-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .banner-content {
          flex: 1;

          .banner-main {
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 4px;
          }

          .banner-sub {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.8);
          }
        }

        .banner-action {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;

          &:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .bar-ad-container {
    &.mode-s1 {
      height: 36px;

      .scrolling-item {
        line-height: 36px;
        font-size: 13px;
        padding: 0 20px;

        &:not(:last-child)::after {
          margin-left: 20px;
        }
      }
    }

    &.mode-s2 {
      padding: 10px;

      .card-ads {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 8px;

        .card-item {
          padding: 10px;

          .card-text {
            font-size: 13px;
          }
        }
      }
    }

    &.mode-s3 {
      .banner-item {
        padding: 12px 16px;

        .banner-main {
          font-size: 14px;
        }

        .banner-action {
          padding: 4px 8px;
          font-size: 11px;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .bar-ad-container {
    &.mode-s2 {
      .card-ads {
        grid-template-columns: 1fr;
      }
    }

    &.mode-s3 {
      .banner-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;

        .banner-action {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
