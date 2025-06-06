<template>
  <div class="swipe-box">
    <div class="swipe-container">
      <!-- 模式 1: 单张轮播 -->
      <van-swipe
        v-if="config.model === 's1'"
        class="swipe-carousel"
        :autoplay="config.otherAttrs?.autoplay ?? 3000"
        :duration="config.otherAttrs?.duration ?? 500"
        :show-indicators="config.otherAttrs?.showIndicators ?? true"
        :indicator-color="config.otherAttrs?.indicatorColor"
        :loop="config.otherAttrs?.loop ?? true"
        :touchable="config.otherAttrs?.touchable ?? true"
      >
        <van-swipe-item 
          v-for="(item, index) in displayData" 
          :key="index"
          class="swipe-item"
        >
          <div class="swipe-image-container" @click="handleItemClick(item)">
            <img 
              :src="getFullImageUrl(item.image)" 
              :alt="item.alt || `轮播图${index + 1}`"
              draggable="false"
              class="swipe-image"
            />
            <div v-if="item.title" class="swipe-title">
              {{ item.title }}
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      
      <!-- 模式 2: 分组轮播 -->
      <van-swipe
        v-else-if="config.model === 's2'"
        class="swipe-carousel swipe-group"
        :autoplay="config.otherAttrs?.autoplay ?? 3000"
        :duration="config.otherAttrs?.duration ?? 500"
        :show-indicators="config.otherAttrs?.showIndicators ?? true"
        :indicator-color="config.otherAttrs?.indicatorColor"
        :loop="config.otherAttrs?.loop ?? true"
        :touchable="config.otherAttrs?.touchable ?? true"
      >
        <van-swipe-item 
          v-for="(group, groupIndex) in groupedData" 
          :key="groupIndex"
          class="swipe-item"
        >
          <div class="swipe-grid">
            <div 
              v-for="(item, itemIndex) in group" 
              :key="itemIndex"
              class="grid-item"
              @click="handleItemClick(item)"
            >
              <img 
                :src="getFullImageUrl(item.image)" 
                :alt="item.alt || `图片${item.index}`"
                draggable="false"
                class="grid-image"
              />
              <div v-if="item.title" class="grid-title">
                {{ item.title }}
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      
      <!-- 模式 3: 垂直轮播 -->
      <van-swipe
        v-else-if="config.model === 's3'"
        class="swipe-carousel swipe-vertical"
        :autoplay="config.otherAttrs?.autoplay ?? 3000"
        :duration="config.otherAttrs?.duration ?? 500"
        :show-indicators="config.otherAttrs?.showIndicators ?? true"
        :vertical="true"
        :loop="config.otherAttrs?.loop ?? true"
        :touchable="config.otherAttrs?.touchable ?? true"
      >
        <van-swipe-item 
          v-for="(item, index) in displayData" 
          :key="index"
          class="swipe-item"
        >
          <div class="swipe-image-container" @click="handleItemClick(item)">
            <img 
              :src="getFullImageUrl(item.image)" 
              :alt="item.alt || `轮播图${index + 1}`"
              draggable="false"
              class="swipe-image"
            />
            <div v-if="item.title" class="swipe-title">
              {{ item.title }}
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    
    <!-- 插槽：用于拖拽时的删除操作 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SwipeConfig, SwipeItem } from './type'

interface Props {
  datas?: SwipeConfig
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  datas: () => ({
    model: 's1',
    groupSize: 4,
    total: 6,
    swipeData: [],
    otherAttrs: {}
  }),
  pageModel: 'websiteMode'
})

// 配置处理
const config = computed(() => {
  let configParamJson = {}
  
  if (props.datas?.configParamJson) {
    try {
      if (typeof props.datas.configParamJson === 'string') {
        configParamJson = JSON.parse(props.datas.configParamJson)
      } else {
        configParamJson = props.datas.configParamJson
      }
    } catch (error) {
      console.error('SwipeBox: JSON 解析错误', error)
    }
  }
  
  return {
    model: configParamJson.model || props.datas?.model || 's1',
    groupSize: configParamJson.groupSize || props.datas?.groupSize || 4,
    total: configParamJson.total || props.datas?.total || 6,
    swipeData: configParamJson.swipeData || props.datas?.swipeData || [],
    otherAttrs: {
      autoplay: 3000,
      duration: 500,
      showIndicators: true,
      indicatorColor: '#1989fa',
      loop: true,
      touchable: true,
      ...props.datas?.otherAttrs,
      ...configParamJson.otherAttrs
    }
  }
})

// 获取显示数据
const displayData = computed(() => {
  const data = config.value.swipeData || []
  
  // 如果没有数据，生成默认数据
  if (data.length === 0) {
    return Array.from({ length: Math.min(config.value.total, 6) }, (_, index) => ({
      index: index + 1,
      image: 'https://via.placeholder.com/300x150?text=Image+' + (index + 1),
      link: '',
      alt: `默认图片${index + 1}`,
      title: `轮播图${index + 1}`
    }))
  }
  
  return data.slice(0, config.value.total)
})

// 分组数据（用于模式2）
const groupedData = computed(() => {
  const data = displayData.value
  const groupSize = config.value.groupSize
  const groups: SwipeItem[][] = []
  
  for (let i = 0; i < data.length; i += groupSize) {
    groups.push(data.slice(i, i + groupSize))
  }
  
  return groups
})

// 获取完整图片URL
const getFullImageUrl = (path: string) => {
  if (!path) return 'https://via.placeholder.com/300x150?text=No+Image'
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${import.meta.env.VITE_FILE_URL || ''}/${path}`
}

// 处理点击事件
const handleItemClick = (item: SwipeItem) => {
  if (item.link) {
    if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
      window.open(item.link, '_blank')
    } else {
      window.location.href = item.link
    }
  }
}
</script>

<style lang="scss" scoped>
.swipe-box {
  position: relative;
  width: 100%;
}

.swipe-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.swipe-carousel {
  width: 100%;
  
  &.swipe-vertical {
    height: 200px;
  }
}

.swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.swipe-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
}

.swipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
}

.swipe-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 20px 12px 12px;
  font-size: 14px;
  text-align: center;
}

// 分组模式样式
.swipe-group .swipe-item {
  padding: 10px;
}

.swipe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
}

.grid-item {
  position: relative;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.grid-image {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.grid-title {
  padding: 8px;
  font-size: 12px;
  text-align: center;
  color: #333;
  background-color: white;
}

// 自定义指示器样式
:deep(.van-swipe__indicator) {
  background-color: rgba(255, 255, 255, 0.4);
  
  &.van-swipe__indicator--active {
    background-color: #1989fa;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .swipe-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  
  .grid-image {
    height: 60px;
  }
  
  .grid-title {
    padding: 6px;
    font-size: 11px;
  }
  
  .swipe-title {
    font-size: 12px;
    padding: 15px 10px 10px;
  }
}

@media (max-width: 480px) {
  .swipe-container {
    border-radius: 4px;
  }
  
  .swipe-grid {
    gap: 4px;
  }
  
  .grid-image {
    height: 50px;
  }
}
</style>