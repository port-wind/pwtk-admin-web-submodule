<template>
  <div class="custom-barad-box">
    <div class="barad-container" :class="`mode-${data.configParamJson?.mode || 'banner'}`">
      <!-- 标题 -->
      <div v-if="data.configParamJson?.showTitle && data.configParamJson?.title" class="barad-title">
        {{ data.configParamJson.title }}
      </div>

      <!-- 广告内容 -->
      <div class="barad-content" :class="`layout-${data.configParamJson?.layout || 'horizontal'}`">
        <div v-for="(item, index) in mockAds" :key="index" class="barad-item">
          <div class="barad-image">
            <img :src="item.image" :alt="item.title" draggable="false" />
            <div v-if="data.configParamJson?.showBadge && item.badge" class="barad-badge">
              {{ item.badge }}
            </div>
          </div>

          <div v-if="data.configParamJson?.showContent" class="barad-info">
            <div class="barad-item-title">{{ item.title }}</div>
            <div v-if="data.configParamJson?.showDescription" class="barad-item-desc">
              {{ item.description }}
            </div>
            <div v-if="data.configParamJson?.showButton" class="barad-button">
              {{ data.configParamJson?.buttonText || '了解详情' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 更多链接 -->
      <div v-if="data.configParamJson?.showMore" class="barad-more">
        <span class="more-text">{{ data.configParamJson?.moreText || '查看更多' }}</span>
        <span class="more-arrow">→</span>
      </div>
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
      mode?: 'banner' | 'card' | 'list' | 'grid'
      layout?: 'horizontal' | 'vertical' | 'grid'
      title?: string
      showTitle?: boolean
      showContent?: boolean
      showDescription?: boolean
      showButton?: boolean
      showBadge?: boolean
      showMore?: boolean
      buttonText?: string
      moreText?: string
      adCount?: number
      autoPlay?: boolean
      interval?: number
    }
  }
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  pageModel: 'websiteMode',
})

// 模拟广告数据
const mockAds = computed(() => {
  const count = props.data.configParamJson?.adCount || 3
  return Array.from({ length: count }, (_, index) => ({
    title: `通用广告 ${index + 1}`,
    description: `这是通用广告的详细描述内容 ${index + 1}，展示产品或服务的特色。`,
    image: '@/assets/images/imgs.png',
    badge: index === 0 ? 'HOT' : index === 1 ? 'NEW' : '',
  }))
})
</script>

<style lang="scss" scoped>
.custom-barad-box {
  position: relative;
  padding: 16px;
  background: #fff;
  border-radius: 8px;

  .barad-container {
    .barad-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
      text-align: center;
      padding-bottom: 8px;
      border-bottom: 2px solid #f0f0f0;
    }

    .barad-content {
      // 横向布局
      &.layout-horizontal {
        display: flex;
        gap: 16px;
        overflow-x: auto;
        padding-bottom: 8px;

        .barad-item {
          flex: 0 0 auto;
          min-width: 280px;
        }
      }

      // 垂直布局
      &.layout-vertical {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .barad-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;

          .barad-image {
            flex-shrink: 0;
            width: 120px;
          }

          .barad-info {
            flex: 1;
          }
        }
      }

      // 网格布局
      &.layout-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }

      .barad-item {
        border: 1px solid #eee;
        border-radius: 12px;
        overflow: hidden;
        transition: all 0.3s ease;
        background: #fff;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          border-color: #3498db;
        }

        .barad-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .barad-badge {
            position: absolute;
            top: 8px;
            right: 8px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
          }

          &:hover img {
            transform: scale(1.05);
          }
        }

        .barad-info {
          padding: 16px;

          .barad-item-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            line-height: 1.4;
          }

          .barad-item-desc {
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            margin-bottom: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .barad-button {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 6px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              background: linear-gradient(135deg, #2980b9, #1abc9c);
              transform: translateY(-1px);
            }
          }
        }
      }
    }

    .barad-more {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-top: 20px;
      padding: 12px;
      border: 1px dashed #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: #3498db;
        background: #f8fbff;
      }

      .more-text {
        font-size: 14px;
        color: #666;
      }

      .more-arrow {
        font-size: 16px;
        color: #3498db;
        transition: transform 0.2s ease;
      }

      &:hover .more-arrow {
        transform: translateX(4px);
      }
    }

    // Banner模式
    &.mode-banner {
      .barad-content.layout-horizontal .barad-item {
        min-width: 100%;
      }
    }

    // 卡片模式
    &.mode-card {
      .barad-item {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }

    // 列表模式
    &.mode-list {
      .barad-content {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;

        .barad-item {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid #f0f0f0;

          &:last-child {
            border-bottom: none;
          }

          &:hover {
            transform: none;
            box-shadow: none;
            background: #f8f9fa;
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .custom-barad-box {
    padding: 12px;

    .barad-container {
      .barad-content {
        &.layout-horizontal {
          gap: 12px;

          .barad-item {
            min-width: 240px;
          }
        }

        &.layout-grid {
          grid-template-columns: 1fr;
        }

        .barad-item {
          .barad-image {
            height: 160px;
          }

          .barad-info {
            padding: 12px;

            .barad-item-title {
              font-size: 14px;
            }

            .barad-item-desc {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
</style>
