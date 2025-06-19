<script setup lang="ts" name="TextLinkList">
import { computed } from 'vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}

const props = defineProps<IProps>()
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)
// 启用的链接项目
const enabledItems = computed(() => {
  return props.datas.configParamJson.links?.filter((item) => item.enabled) || []
})

// 处理项目点击
const handleItemClick = (item: any) => {
  if (item.link) {
    // 判断是否为外部链接
    if (item.link.startsWith('http://') || item.link.startsWith('https://')) {
      window.open(item.link, '_blank')
    } else {
      // 内部路由跳转
      window.location.href = item.link
    }
  }
}

// 处理鼠标悬停效果
const handleMouseEnter = (event: Event) => {
  const target = event.target as HTMLElement
  target.style.backgroundColor = props.datas.configParamJson.listStyleJSON.itemHoverColor
}

const handleMouseLeave = (event: Event) => {
  const target = event.target as HTMLElement
  target.style.backgroundColor = props.datas.configParamJson.listStyleJSON.itemBackgroundColor
}

const titleHeaderStyle = computed(() => {
  if (styleHeader.value.isGradient) {
    return {
      background: `linear-gradient(to right,  ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  } else {
    return {
      backgroundColor: styleHeader.value?.headerBgColor || '#4a90e2'
    }
  }
})

const mainTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.titleColor || '#333333'
  }
})

const subTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.subTitleColor || '#333333'
  }
})
</script>

<template>
  <div class="TextLinkList">
    <div class="text-link-list" v-if="datas.configParamJson.enable">
      <!-- 标题区域 -->
      <!-- 头部标题 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">{{ datas.configParamJson.title }}</h2>
        <span class="sub-title" :style="subTitleStyle">{{ datas.configParamJson.subtitle }}</span>
      </div>

      <div
        class="text-link-list__header"
        :style="{
          backgroundColor: datas.configParamJson.listStyleJSON.headerBackgroundColor,
          color: datas.configParamJson.listStyleJSON.headerTextColor,
          padding: `${datas.configParamJson.listStyleJSON.containerPadding}px`
        }"
      >
        <h2 class="text-link-list__title">{{ datas.configParamJson.title }}</h2>
      </div>

      <!-- 链接列表区域 -->
      <div
        class="text-link-list__content"
        :style="{
          padding: `${datas.configParamJson.listStyleJSON.containerPadding}px`
        }"
      >
        <div
          class="text-link-list__items"
          :style="{
            gap: `${datas.configParamJson.listStyleJSON.itemSpacing}px`,
            gridTemplateColumns: `repeat(${datas.configParamJson.listStyleJSON.itemsPerRow}, 1fr)`
          }"
        >
          <div
            v-for="item in enabledItems"
            :key="item.id"
            class="text-link-list__item"
            :style="{
              backgroundColor: datas.configParamJson.listStyleJSON.itemBackgroundColor,
              color: datas.configParamJson.listStyleJSON.itemTextColor,
              padding: `${datas.configParamJson.listStyleJSON.itemPadding}px`,
              borderRadius: `${datas.configParamJson.listStyleJSON.itemBorderRadius}px`,
              border: `${datas.configParamJson.listStyleJSON.itemBorderWidth}px solid ${datas.configParamJson.listStyleJSON.itemBorderColor}`
            }"
            @click="handleItemClick(item)"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style lang="scss" scoped>
.TextLinkList {
  position: relative;
}
.text-link-list {
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__header {
    text-align: center;
    border-bottom: 1px solid #e6e6e6;
  }

  &__title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  &__content {
    background: #fff;
    min-height: 120px;
  }

  &__items {
    display: grid;
    width: 100%;
  }

  &__item {
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .text-link-list {
    &__items {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    &__item {
      font-size: 12px;
    }
  }
}

@media (max-width: 480px) {
  .text-link-list {
    &__items {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }
}
</style>
