<script setup lang="ts" name="ImageGridList">
import { computed } from 'vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

const styleJSON = computed(() => props.datas.configParamJson.gridStyleJSON)
const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'

// 获取完整URL的方法
const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}

// 容器样式
const containerStyle = computed(() => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${styleJSON.value.columnsPerRow}, 1fr)`,
    gap: `${styleJSON.value.itemSpacing}px`,
    backgroundColor: styleJSON.value.backgroundColor,
    padding: '16px'
  }
})

// 单个图片项样式
const getItemStyle = (item: any) => {
  return {
    padding: `${styleJSON.value.itemPadding}px`,
    borderRadius: `${styleJSON.value.borderRadius}px`,
    backgroundColor: '#fff',
    border: `${styleJSON.value.borderWidth}px solid ${styleJSON.value.borderColor}`,
    cursor: 'pointer',
    transition: styleJSON.value.hoverEffect ? 'all 0.3s ease' : 'none',
    opacity: item.enabled ? 1 : 0.6,
    overflow: 'hidden'
  }
}

// 图片样式
const imageStyle = computed(() => {
  return {
    width: '100%',
    height: `${styleJSON.value.imageHeight}px`,
    objectFit: 'cover' as const,
    borderRadius: `${Math.max(0, styleJSON.value.borderRadius - 2)}px`
  }
})

// 标题样式
const titleStyle = computed(() => {
  return {
    fontSize: `${styleJSON.value.titleFontSize}px`,
    color: styleJSON.value.titleColor,
    textAlign: 'center' as const,
    marginTop: '8px',
    fontWeight: 500,
    lineHeight: 1.4
  }
})

// 处理图片项点击
const handleItemClick = (item: any) => {
  if (!item.enabled) return

  if (item.link) {
    // 如果是外部链接
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank')
    } else {
      // 内部路由跳转
      window.location.href = item.link
    }
  }
}

// 悬停效果
const handleMouseEnter = (event: Event) => {
  if (!styleJSON.value.hoverEffect) return
  const target = event.target as HTMLElement
  target.style.transform = 'translateY(-2px)'
  target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'
}

const handleMouseLeave = (event: Event) => {
  if (!styleJSON.value.hoverEffect) return
  const target = event.target as HTMLElement
  target.style.transform = 'translateY(0)'
  target.style.boxShadow = 'none'
}
</script>

<template>
  <div class="ImageGridList">
    <div class="ImageGridList-content">
      <!-- 标题区域 -->
      <div v-if="props.datas.configParamJson.enable && props.datas.configParamJson.title" class="header-section">
        <h3 class="grid-title">{{ props.datas.configParamJson.title }}</h3>
        <p v-if="props.datas.configParamJson.description" class="grid-description">
          {{ props.datas.configParamJson.description }}
        </p>
      </div>

      <!-- 图片网格 -->
      <div class="image-grid" :style="containerStyle">
        <div
          v-for="item in props.datas.configParamJson.gridItems"
          :key="item.id"
          class="grid-item"
          :style="getItemStyle(item)"
          @click="handleItemClick(item)"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <!-- 图片 -->
          <img
            :src="getFullUrl(item.imageUrl, PUBLIC_CDN_URL)"
            :alt="item.title"
            :style="imageStyle"
            class="grid-image"
            draggable="false"
          />

          <!-- 标题 -->
          <div v-if="styleJSON.showTitle && item.title" class="grid-item-title" :style="titleStyle">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.ImageGridList {
  position: relative;
  width: 100%;
}

.ImageGridList-content {
  width: 100%;
}

.header-section {
  padding: 16px;
  text-align: center;

  .grid-title {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .grid-description {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
}

.image-grid {
  min-height: 100px;
}

.grid-item {
  user-select: none;

  &:hover {
    transition: all 0.3s ease;
  }

  &:active {
    transform: scale(0.98);
  }
}

.grid-image {
  display: block;
  border: none;
}

.grid-item-title {
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 响应式设计
@media (max-width: 768px) {
  .image-grid {
    padding: 12px;
  }

  .header-section {
    padding: 12px;

    .grid-title {
      font-size: 16px;
    }

    .grid-description {
      font-size: 13px;
    }
  }
}
</style>
