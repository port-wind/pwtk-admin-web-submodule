<template>
  <div class="home-pop-notice-box">
    <div class="notice-container" :class="`style-${data.configParamJson?.style || 'default'}`">
      <div v-if="data.configParamJson?.showIcon" class="notice-icon">📢</div>

      <div class="notice-content">
        <div v-if="data.configParamJson?.title" class="notice-title">
          {{ data.configParamJson.title }}
        </div>

        <div class="notice-text">
          {{ data.configParamJson?.content || '这是一条重要公告信息，请注意查看！' }}
        </div>

        <div v-if="data.configParamJson?.showTime" class="notice-time">
          {{ formatTime }}
        </div>
      </div>

      <div v-if="data.configParamJson?.showClose" class="notice-close">✕</div>
    </div>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: {
    componentName: string
    componentType: string
    configParamJson: {
      model?: string
      title?: string
      content?: string
      style?: 'default' | 'warning' | 'info' | 'success'
      showIcon?: boolean
      showTime?: boolean
      showClose?: boolean
      autoClose?: boolean
      duration?: number
    }
  }
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  pageModel: 'websiteMode'
})

const formatTime = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(
    2,
    '0'
  )} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
})
</script>

<style lang="scss" scoped>
.home-pop-notice-box {
  position: relative;
  margin: 16px;

  .notice-container {
    display: flex;
    align-items: flex-start;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .notice-icon {
      font-size: 20px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .notice-content {
      flex: 1;

      .notice-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        line-height: 1.4;
      }

      .notice-text {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 8px;
      }

      .notice-time {
        font-size: 12px;
        opacity: 0.7;
      }
    }

    .notice-close {
      font-size: 16px;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
      flex-shrink: 0;
      margin-left: 12px;

      &:hover {
        opacity: 1;
      }
    }

    // 默认样式
    &.style-default {
      background: #f8f9fa;
      border-left: 4px solid #6c757d;
      color: #495057;

      .notice-icon {
        color: #6c757d;
      }
    }

    // 警告样式
    &.style-warning {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      color: #856404;

      .notice-icon {
        color: #ffc107;
      }
    }

    // 信息样式
    &.style-info {
      background: #d1ecf1;
      border-left: 4px solid #17a2b8;
      color: #0c5460;

      .notice-icon {
        color: #17a2b8;
      }
    }

    // 成功样式
    &.style-success {
      background: #d4edda;
      border-left: 4px solid #28a745;
      color: #155724;

      .notice-icon {
        color: #28a745;
      }
    }
  }
}

// 弹窗动画效果
@keyframes slideInDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutUp {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.home-pop-notice-box {
  animation: slideInDown 0.3s ease-out;
}

// 响应式设计
@media (max-width: 768px) {
  .home-pop-notice-box {
    margin: 8px;

    .notice-container {
      padding: 12px;

      .notice-content {
        .notice-title {
          font-size: 14px;
        }

        .notice-text {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
