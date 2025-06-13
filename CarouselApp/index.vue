<template>
  <div class="carousel-app">
    <div class="carousel-app-container">
      <!-- Tab导航 -->
      <div class="tab-nav">
        <div
          v-for="(tab, index) in datas.configParamJson.tabs"
          :key="index"
          :class="['tab-item', { active: activeTab === index }]"
          @click="switchTab(index)"
        >
          {{ tab.title }}
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="tab-content">
        <div
          v-for="(tab, index) in datas.configParamJson.tabs"
          :key="index"
          :class="['tab-pane', { active: activeTab === index }]"
        >
          <!-- 推广横幅 -->
          <div class="promo-banner" :style="{ backgroundColor: tab.bannerColor }">
            <div class="banner-content">
              <span class="promo-text">{{ tab.promoText }}</span>
              <span class="amount">{{ tab.amount }}</span>
            </div>
          </div>

          <!-- 应用推广卡片 -->
          <div class="app-card">
            <!-- 应用图标和信息 -->
            <div class="app-info">
              <div class="app-icon">
                <img
                  v-if="tab.appIcon"
                  :src="getFullUrl(tab.appIcon, PUBLIC_CDN_URL)"
                  :alt="tab.appName"
                  draggable="false"
                />
              </div>
              <div class="app-details">
                <h3 class="app-name">{{ tab.appName }}</h3>
                <div class="app-meta">
                  <span class="size">{{ tab.appSize }}</span>
                  <span class="category">{{ tab.category }}</span>
                </div>
                <div class="app-stats">
                  <span class="downloads">{{ tab.downloads }}</span>
                  <span class="rating">{{ tab.rating }}</span>
                </div>
              </div>
            </div>

            <!-- 应用截图 -->
            <div class="app-screenshot">
              <img
                v-if="tab.screenshot"
                :src="getFullUrl(tab.screenshot, PUBLIC_CDN_URL)"
                :alt="tab.appName + '截图'"
                draggable="false"
              />
            </div>

            <!-- 下载按钮 -->
            <div class="download-actions">
              <button
                v-if="tab.androidDownload"
                class="download-btn android"
                @click="handleDownload(tab.androidDownload, 'android')"
              >
                <van-icon name="plus" />
                Android下载
              </button>
              <button v-if="tab.iosDownload" class="download-btn ios" @click="handleDownload(tab.iosDownload, 'ios')">
                <van-icon name="plus" />
                iPhone下载
              </button>
              <button v-if="tab.webUrl" class="download-btn web" @click="handleDownload(tab.webUrl, 'web')">
                访问官网
              </button>
            </div>

            <!-- 状态指示 -->
            <div class="status-indicator">
              <span class="status-text">{{ tab.statusText }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="CarouselApp">
import { ref } from 'vue'
import type { IDatas } from './type'

const PUBLIC_CDN_URL = 'https://stt.pwtk.cc/'

const getFullUrl = (url: string, baseUrl: string): string => {
  return /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`
}

interface Props {
  datas: IDatas
}

const props = defineProps<Props>()

// 当前激活的tab
const activeTab = ref(0)

// 切换tab
const switchTab = (index: number) => {
  activeTab.value = index
}

// 处理下载点击
const handleDownload = (url: string, type: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped lang="scss">
.carousel-app {
  position: relative;
}

.carousel-app-container {
  min-height: 20px;
}

.tab-nav {
  display: flex;
  background: #f5f5f5;
  border-bottom: 1px solid #eee;

  .tab-item {
    flex: 1;
    padding: 12px 16px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    background: #f5f5f5;
    border-right: 1px solid #eee;
    transition: all 0.3s;

    &:last-child {
      border-right: none;
    }

    &.active {
      background: #fff;
      color: #333;
      font-weight: 600;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &:hover:not(.active) {
      background: #e8f4f8;
      color: #333;
    }
  }
}

.tab-content {
  .tab-pane {
    display: none;
    padding: 16px;

    &.active {
      display: block;
    }
  }
}

.promo-banner {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 16px;
  text-align: center;

  .banner-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .promo-text {
      color: #fff;
      font-size: 14px;
      font-weight: 500;
    }

    .amount {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.app-card {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}

.app-info {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  .app-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
    margin-right: 16px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .app-details {
    flex: 1;

    .app-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .app-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;

      span {
        font-size: 12px;
        color: #666;
      }
    }

    .app-stats {
      display: flex;
      gap: 16px;

      span {
        font-size: 12px;
        color: #666;
      }
    }
  }
}

.app-screenshot {
  padding: 0 16px;

  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
}

.download-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  justify-content: center;

  .download-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;

    &.android {
      background: #4caf50;
      color: #fff;

      &:hover {
        background: #45a049;
      }
    }

    &.ios {
      background: #007aff;
      color: #fff;

      &:hover {
        background: #0056b3;
      }
    }

    &.web {
      background: #28a745;
      color: #fff;

      &:hover {
        background: #218838;
      }
    }
  }
}

.status-indicator {
  text-align: center;
  padding: 8px 16px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;

  .status-text {
    font-size: 12px;
    color: #28a745;
    font-weight: 500;
  }
}
</style>
