<template>
  <div class="notice-bar-box">
    <div class="notice-bar-content" :style="noticeBarStyle">
      <!-- 图标区域 -->
      <div v-if="config.icon" class="notice-icon">
        <img 
          :src="getFullImageUrl(config.icon)" 
          :alt="config.alt || '公告图标'"
          draggable="false"
        />
      </div>
      
      <!-- 文字内容区域 -->
      <div class="notice-text-container">
        <div 
          class="notice-text"
          :style="textStyle"
          ref="textRef"
        >
          {{ config.noticeText || '请填写公告内容' }}
        </div>
      </div>
      
      <!-- 关闭按钮 -->
      <div v-if="config.closable" class="notice-close" @click="handleClose">
        <van-icon name="cross" />
      </div>
    </div>
    
    <!-- 插槽：用于拖拽时的删除操作 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { NoticeBarConfig } from './type'

interface Props {
  datas?: NoticeBarConfig
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  datas: () => ({
    noticeText: '请填写内容，如果过长，将会在手机上滚动显示',
    icon: '',
    alt: '公告喇叭图片',
    backColor: 'rgb(255, 248, 233)',
    textColor: 'rgba(100, 101, 102)',
    closable: false,
    scrollable: true
  }),
  pageModel: 'websiteMode'
})

const textRef = ref<HTMLElement>()
const isVisible = ref(true)

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
      console.error('NoticeBarBox: JSON 解析错误', error)
    }
  }
  
  return {
    noticeText: configParamJson.noticeText || props.datas?.noticeText || '请填写内容，如果过长，将会在手机上滚动显示',
    icon: configParamJson.icon || props.datas?.icon || '',
    alt: configParamJson.alt || props.datas?.alt || '公告图标',
    backColor: configParamJson.backColor || props.datas?.backColor || 'rgb(255, 248, 233)',
    textColor: configParamJson.textColor || props.datas?.textColor || 'rgba(100, 101, 102)',
    closable: configParamJson.closable ?? props.datas?.closable ?? false,
    scrollable: configParamJson.scrollable ?? props.datas?.scrollable ?? true
  }
})

// 公告栏样式
const noticeBarStyle = computed(() => ({
  backgroundColor: config.value.backColor,
  display: isVisible.value ? 'flex' : 'none'
}))

// 文字样式
const textStyle = computed(() => ({
  color: config.value.textColor
}))

// 获取完整图片URL
const getFullImageUrl = (path: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  return `${import.meta.env.VITE_FILE_URL || ''}/${path}`
}

// 处理关闭
const handleClose = () => {
  isVisible.value = false
}

// 初始化滚动动画（如果文字过长）
onMounted(() => {
  if (!config.value.scrollable || !textRef.value) return
  
  const textElement = textRef.value
  const containerWidth = textElement.parentElement?.clientWidth || 0
  const textWidth = textElement.scrollWidth
  
  // 如果文字宽度超过容器宽度，启用滚动动画
  if (textWidth > containerWidth) {
    textElement.classList.add('scrolling')
  }
})
</script>

<style lang="scss" scoped>
.notice-bar-box {
  position: relative;
  width: 100%;
}

.notice-bar-content {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 40px;
  border-radius: 4px;
  background-color: rgb(255, 248, 233);
  border: 1px solid rgba(255, 193, 7, 0.2);
}

.notice-icon {
  flex-shrink: 0;
  margin-right: 8px;
  
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
}

.notice-text-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.notice-text {
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  color: rgba(100, 101, 102);
  transition: all 0.3s ease;
  
  &.scrolling {
    animation: scroll-left 15s linear infinite;
  }
}

.notice-close {
  flex-shrink: 0;
  margin-left: 8px;
  padding: 4px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .van-icon {
    font-size: 14px;
    color: rgba(100, 101, 102);
  }
}

// 滚动动画
@keyframes scroll-left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .notice-bar-content {
    padding: 6px 10px;
    min-height: 36px;
  }
  
  .notice-text {
    font-size: 13px;
  }
  
  .notice-icon img {
    width: 18px;
    height: 18px;
  }
}
</style>