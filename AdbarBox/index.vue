<template>
  <div class="adbar-box">
    <div class="adbar-container">
      <div v-if="data.configParamJson?.showTitle && data.configParamJson?.title" class="adbar-title">
        {{ data.configParamJson.title }}
      </div>
      <div class="adbar-content" :class="`layout-${data.configParamJson?.layout || 'horizontal'}`">
        <div v-for="(item, index) in mockAds" :key="index" class="adbar-item">
          <img :src="item.image" :alt="item.title" draggable="false" />
          <div v-if="data.configParamJson?.showText" class="adbar-text">
            <div class="adbar-item-title">{{ item.title }}</div>
            <div class="adbar-item-desc">{{ item.description }}</div>
          </div>
        </div>
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
      model?: string
      title?: string
      showTitle?: boolean
      showText?: boolean
      layout?: 'horizontal' | 'vertical' | 'grid'
      adCount?: number
    }
  }
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  pageModel: 'websiteMode',
})

// 模拟推广广告数据
const mockAds = computed(() => {
  const count = props.data.configParamJson?.adCount || 3
  return Array.from({ length: count }, (_, index) => ({
    title: `推广广告 ${index + 1}`,
    description: `这是推广广告的描述内容 ${index + 1}`,
    image: '../../../assets/images/imgs.png',
  }))
})
</script>

<style lang="scss" scoped>
.adbar-box {
  position: relative;
  padding: 16px;
  background: #fff;

  .adbar-container {
    .adbar-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
      text-align: center;
    }

    .adbar-content {
      &.layout-horizontal {
        display: flex;
        gap: 16px;
        overflow-x: auto;

        .adbar-item {
          flex: 0 0 auto;
          min-width: 200px;
        }
      }

      &.layout-vertical {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .adbar-item {
          display: flex;
          gap: 12px;
          align-items: center;
        }
      }

      &.layout-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
      }

      .adbar-item {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        img {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .adbar-text {
          padding: 12px;

          .adbar-item-title {
            font-size: 16px;
            font-weight: 600;
            color: #333;
            margin-bottom: 4px;
          }

          .adbar-item-desc {
            font-size: 14px;
            color: #666;
            line-height: 1.4;
          }
        }
      }
    }

    .adbar-content.layout-vertical .adbar-item {
      img {
        width: 120px;
        height: 80px;
        flex-shrink: 0;
      }

      .adbar-text {
        flex: 1;
      }
    }
  }
}
</style>
