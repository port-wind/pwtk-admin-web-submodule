<template>
  <div class="custom-bar-ad-box">
    <div class="mbox">
      <BoxTitle :data="datas" />
      <div v-if="datas.model === 's1'" class="color-bar">
        <template v-for="(item, index) in datas.itemData" :key="index">
          <div class="color-bar-ad" :style="{ backgroundColor: getRandomColor() }">
            <a :href="item.link">
              <h3>{{ item.text }}</h3>
            </a>
          </div>
        </template>
      </div>

      <div v-else-if="datas.model === 's2'">
        <template v-for="(item, index) in datas.itemData" :key="index">
          <div v-html="item.content"></div>
        </template>
      </div>

      <van-grid v-else class="button-bar" :column-num="2" :border="false" :gutter="10">
        <van-grid-item v-for="(item, index) in datas.itemData" :key="index">
          <a :href="item.link" class="button-bar-ad">
            <h3 :style="{ color: getRandomColor() }">{{ item.text }}</h3>
          </a>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 插槽：用于拖拽时的删除操作 -->
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="CustomBarAdBox">
import BoxTitle from './BoxTitle.vue'
import { Grid as VanGrid, GridItem as VanGridItem } from 'vant'

interface CustomBarType {
  model: 's1' | 's2' | 's3'
  title?: string
  itemData: ColorBarType[]
}

interface ColorBarType {
  link: string
  text: string
  content?: string
}

// 使用 ColorBarType 作为 props 的类型
const props = defineProps<{
  datas: CustomBarType
}>()

// 生成随机颜色的函数
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
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
