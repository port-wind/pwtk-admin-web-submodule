<template>
  <div class="navbar-box">
    <!-- 模式1: 标准选项卡模式 -->
    <section v-if="datas.model === 's1'" class="navbar-box__mode-standard">
      <van-sticky v-if="datas.tabsAttr.sticky" :offset-top="datas.tabsAttr.offsetTop || 0">
        <van-tabs
          v-bind="computedTabsAttr"
          v-model="activeTab"
          @click-tab="handleTabClick"
          :class="['navbar-box__tabs', `navbar-box__tabs--${datas.model}`]"
        >
          <van-tab v-for="tab in validTabs" :name="tab.id" :key="tab.id" :title="tab.name" :disabled="tab.disabled" />
        </van-tabs>
      </van-sticky>
      <div v-else>
        <van-tabs
          v-bind="computedTabsAttr"
          v-model="activeTab"
          @click-tab="handleTabClick"
          :class="['navbar-box__tabs', `navbar-box__tabs--${datas.model}`]"
        >
          <van-tab v-for="tab in validTabs" :name="tab.id" :key="tab.id" :title="tab.name" :disabled="tab.disabled" />
        </van-tabs>
      </div>
    </section>

    <!-- 模式2: 胶囊式选项卡模式 -->
    <section v-else-if="datas.model === 's2'" class="navbar-box__mode-capsule">
      <van-sticky v-if="datas.tabsAttr.sticky" :offset-top="datas.tabsAttr.offsetTop || 0">
        <div class="navbar-box__capsule-wrapper">
          <div
            v-for="tab in validTabs"
            :key="tab.id"
            :class="[
              'navbar-box__capsule-item',
              { 'navbar-box__capsule-item--active': activeTab === tab.id },
              { 'navbar-box__capsule-item--disabled': tab.disabled }
            ]"
            @click="handleCapsuleClick(tab)"
          >
            {{ tab.name }}
          </div>
        </div>
      </van-sticky>
      <div v-else class="navbar-box__capsule-wrapper">
        <div
          v-for="tab in validTabs"
          :key="tab.id"
          :class="[
            'navbar-box__capsule-item',
            { 'navbar-box__capsule-item--active': activeTab === tab.id },
            { 'navbar-box__capsule-item--disabled': tab.disabled }
          ]"
          @click="handleCapsuleClick(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
    </section>

    <!-- 模式3: 按钮组模式 -->
    <section v-else-if="datas.model === 's3'" class="navbar-box__mode-button">
      <van-sticky v-if="datas.tabsAttr.sticky" :offset-top="datas.tabsAttr.offsetTop || 0">
        <div class="navbar-box__button-wrapper">
          <div
            v-for="tab in validTabs"
            :key="tab.id"
            :class="[
              'navbar-box__button-item',
              { 'navbar-box__button-item--active': activeTab === tab.id },
              { 'navbar-box__button-item--disabled': tab.disabled }
            ]"
            @click="handleButtonClick(tab)"
          >
            {{ tab.name }}
          </div>
        </div>
      </van-sticky>
      <div v-else class="navbar-box__button-wrapper">
        <div
          v-for="tab in validTabs"
          :key="tab.id"
          :class="[
            'navbar-box__button-item',
            { 'navbar-box__button-item--active': activeTab === tab.id },
            { 'navbar-box__button-item--disabled': tab.disabled }
          ]"
          @click="handleButtonClick(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
    </section>

    <!-- 未知模式处理 -->
    <section v-else class="navbar-box__mode-unknown">
      <div class="navbar-box__error">不支持的导航栏模式: {{ datas.model }}</div>
    </section>
  </div>
</template>

<script setup lang="ts" name="NavBarBox">
import { Tabs as VanTabs, Tab as VanTab, Sticky as VanSticky } from 'vant'
import type { IDatas } from './type'

const props = defineProps<{
  datas: IDatas
}>()

const activeTab = ref('')
const validTabs = computed(() => {
  return props.datas.configParamJson.itemData.filter((tab) => !tab.disabled)
})
const backgroundStyle = computed(() => {
  return { background: props.datas.configParamJson.bgColor }
})
const handleTabClick = (name: string) => {}
const handleButtonClick = (tab: any) => {}
const handleCapsuleClick = (tab: any) => {}
const computedTabsAttr = computed(() => {
  return {
    animated: props.datas.configParamJson.tabsAttr.animated,
    swipeable: props.datas.configParamJson.tabsAttr.swipeable,
    lineWidth: props.datas.configParamJson.tabsAttr.lineWidth,
    lineHeight: props.datas.configParamJson.tabsAttr.lineHeight
  }
})
</script>

<style lang="scss" scoped>
.navbar-box {
  width: 100%;

  &__error {
    padding: 1rem;
    text-align: center;
    color: #999;
    font-size: 0.875rem;
  }

  // 标准选项卡模式样式
  &__mode-standard {
    :deep(.van-tabs__wrap) {
      height: 2rem;

      .van-tabs__nav {
        background: v-bind('backgroundStyle.background');
        margin: 0;
        width: 100%;
      }

      .van-tabs__nav--line.van-tabs__nav--shrink,
      .van-tabs__nav--line.van-tabs__nav--complete {
        padding-left: 0;
        padding-right: 0;
      }

      .van-tab--grow {
        padding: 0 0.75rem;
      }

      .van-tab {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.875rem;
        transition: all 0.3s ease;

        &:hover:not(.van-tab--disabled) {
          color: rgba(255, 255, 255, 0.9);
        }

        &--disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .van-tab--active {
        color: #fff;
        font-weight: 500;
      }

      .van-tabs__line {
        background-color: #fff;
        height: 0.125rem;
        border-radius: 0.0625rem;
        transition: all 0.3s ease;
      }
    }
  }

  // 胶囊式选项卡模式样式
  &__mode-capsule {
    .navbar-box__capsule-wrapper {
      display: flex;
      gap: 0.5rem;
      padding: 0.75rem;
      background: v-bind('backgroundStyle.background');
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .navbar-box__capsule-item {
      flex-shrink: 0;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      background: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover:not(&--disabled) {
        background: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.9);
      }

      &--active {
        background: rgba(255, 255, 255, 0.9);
        color: var(--theme-color, #155bd4);
        font-weight: 500;
      }

      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  // 按钮组模式样式
  &__mode-button {
    .navbar-box__button-wrapper {
      display: flex;
      gap: 0.25rem;
      padding: 0.75rem;
      background: v-bind('backgroundStyle.background');
      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .navbar-box__button-item {
      flex-shrink: 0;
      padding: 0.625rem 1.25rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 0.25rem;
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover:not(&--disabled) {
        border-color: rgba(255, 255, 255, 0.5);
        color: rgba(255, 255, 255, 0.9);
      }

      &--active {
        background: rgba(255, 255, 255, 0.9);
        border-color: rgba(255, 255, 255, 0.9);
        color: var(--theme-color, #155bd4);
        font-weight: 500;
      }

      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .navbar-box {
    &__mode-capsule .navbar-box__capsule-item,
    &__mode-button .navbar-box__button-item {
      padding: 0.5rem 0.75rem;
      font-size: 0.8125rem;
    }
  }
}
</style>
