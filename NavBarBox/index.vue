<template>
  <div class="nav-bar-box">
    <div class="nav-container" :class="`model-${datas.configParamJson?.model || 's1'}`">
      <div v-if="datas.configParamJson?.title" class="nav-title">
        {{ datas.configParamJson.title }}
      </div>

      <div class="nav-items">
        <div v-for="(item, index) in navItems" :key="index" class="nav-item" :class="{ active: index === 0 }">
          <div class="nav-item-content">
            <div class="nav-item-name">{{ item.name }}</div>
            <div v-if="item.badge" class="nav-item-badge">{{ item.badge }}</div>
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
  datas: {
    componentName: string
    componentType: string
    configParamJson: {
      model?: string
      title?: string
      itemData?: Array<{ id: string; name: string; badge?: string }>
      tabsAttr?: any
    }
  }
  pageModel?: 'websiteMode' | 'templateMode' | 'componentMode'
}

const props = withDefaults(defineProps<Props>(), {
  pageModel: 'websiteMode'
})

const navItems = computed(() => {
  return (
    props.datas.configParamJson?.itemData || [
      { id: '1', name: '首页', badge: '' },
      { id: '2', name: '分类', badge: 'New' },
      { id: '3', name: '发现', badge: '' },
      { id: '4', name: '我的', badge: '3' }
    ]
  )
})
</script>

<style lang="scss" scoped>
.nav-bar-box {
  position: relative;
  background: #fff;
  border-bottom: 1px solid #eee;

  .nav-container {
    padding: 12px 16px;

    .nav-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
      text-align: center;
    }

    .nav-items {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .nav-item {
        flex: 1;
        text-align: center;
        padding: 8px 4px;
        cursor: pointer;
        transition: all 0.2s;

        .nav-item-content {
          position: relative;
          display: inline-block;

          .nav-item-name {
            font-size: 14px;
            color: #666;
            transition: color 0.2s;
          }

          .nav-item-badge {
            position: absolute;
            top: -8px;
            right: -12px;
            background: #ff4757;
            color: #fff;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            min-width: 16px;
            height: 16px;
            line-height: 12px;
            text-align: center;
          }
        }

        &.active .nav-item-name {
          color: #3498db;
          font-weight: 600;
        }

        &:hover .nav-item-name {
          color: #3498db;
        }
      }
    }

    // 模式1：简洁风格
    &.model-s1 {
      .nav-items .nav-item {
        border-radius: 8px;

        &.active {
          background: #f8f9fa;
        }
      }
    }

    // 模式2：卡片风格
    &.model-s2 {
      .nav-items {
        gap: 8px;

        .nav-item {
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #eee;

          &.active {
            background: #3498db;
            border-color: #3498db;

            .nav-item-name {
              color: #fff;
            }
          }
        }
      }
    }

    // 模式3：底部线条风格
    &.model-s3 {
      .nav-items .nav-item {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #3498db;
          transition: width 0.2s;
        }

        &.active::after {
          width: 60%;
        }
      }
    }

    // 模式4：圆形风格
    &.model-s4 {
      .nav-items .nav-item {
        .nav-item-content {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        &.active .nav-item-content {
          background: #3498db;
          border-color: #3498db;

          .nav-item-name {
            color: #fff;
          }
        }
      }
    }

    // 模式5：渐变风格
    &.model-s5 {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;

      .nav-title {
        color: #fff;
      }

      .nav-items .nav-item {
        .nav-item-name {
          color: rgba(255, 255, 255, 0.8);
        }

        &.active .nav-item-name {
          color: #fff;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>
