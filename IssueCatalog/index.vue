<script setup lang="ts" name="IssueCatalog">
import { ref, computed, onMounted } from 'vue'
import type { IDatas } from './type'
import { useStore } from '@nanostores/vue'
import { useIssueList } from '../hooks/issueList'
import { gameStore } from '../store'
import { getGameName } from '../store/gameStore'
import type { IForumPost } from '../types/forum'

interface IProps {
  datas: IDatas
}

// Props定义
const props = defineProps<IProps>()
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

// 🎮 CRITICAL: gameType Store Integration
const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)
const currentGame = computed(() => gameStoreData.value.currentGame)
const currentGameName = computed(() => currentGame.value?.gameTypeLongName || '未知游戏')

// 🔄 Dynamic Parameters Based on Game Type
const issueParams = reactive({
  gameType: gameType.value,
  size: Number(props.datas.configParamJson.size) || 10,
  forumId: String(props.datas.configParamJson.forumId) || '10'
})

const { getIssueNumber, getIssueResult, issueListItem } = useIssueList(issueParams)

// style 样式
const containerStyle = computed(() => {
  return {
    borderRadius: `${styleHeader.value?.borderRadius || 0}px`,
    padding: `${styleHeader.value?.padding || 0}px`,
    backgroundColor: styleMain.value?.backgroundColor || '#f1f1f1'
  }
})

const headerTitleBgStyle = computed(() => {
  if (styleHeader.value.isGradient) {
    return {
      background: `linear-gradient(to right,  ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  }
  return {
    backgroundColor: styleHeader.value?.headerBgColor || '#4a90e2'
  }
})

const headerTitleTextStyle = computed(() => {
  return {
    color: styleHeader.value?.titleColor || '#333333'
  }
})

const subTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.subTitleColor || '#333333'
  }
})

// 🎨 Style Configuration from Right Panel
const styleConfig = computed(() => ({
  listSpacing: props.datas.configParamJson.styleMain?.listSpacing || 0,
  numberSpacing: props.datas.configParamJson.styleMain?.itemSpacing || 0,
  borderRadius: props.datas.configParamJson.styleMain?.borderRadius || 0,
  padding: props.datas.configParamJson.styleMain?.padding || 0,
  backgroundColor: props.datas.configParamJson.styleMain?.backgroundColor || '#f1f1f1',
  itemBackgroundColor: props.datas.configParamJson.styleMain?.itemBackgroundColor || '#f1f1f1',
  layout: props.datas.configParamJson.styleMain?.layout || 'start'
}))

// 解析模板并替换变量
const parseTemplate = (issue: IForumPost) => {
  let template = props.datas.configParamJson.dynamicTemplate || ''
  // 定义CSS变量
  const cssVars = `
    <style>
      :root {
        --active-bg: ${props.datas.configParamJson.dynamicActiveBg || '#ffeb3b'};
        --active-text:${props.datas.configParamJson.dynamicActiveText || '#000'};
        --noresult: ${props.datas.configParamJson.dynamicNoResult || '#00F'};
      }
    </style>
  `

  // 获取当前期数
  const issueNumber = getIssueNumber(issue)
  template = template.replace(/{{issueNumber}}/g, issueNumber)

  // 获取当前期数的结果
  const result = getIssueResult(issue)

  template = template.replace(
    /{{shengxiao}}/g,
    result.shengxiao ? result.shengxiao : '<span style="color: var(--noresult);">?00</span>'
  )
  template = template.replace(/{{num}}/g, result?.num?.toString() ? result?.num?.toString() : '')
  if (result.size) {
    template = template.replace(/{{size}}/g, result.size ?? '')
  }

  // 动态替换竞猜预测数据
  if (issue?.lotteryPredictions?.length) {
    // 遍历所有竞猜预测组
    issue.lotteryPredictions.forEach((prediction, lpIndex) => {
      let index = -1
      if (prediction.isHit && prediction.hitDetail) {
        const hitDetail = prediction.hitDetail
        index = hitDetail.split('').findIndex((item) => item === '1')
      }

      // 遍历每个预测组中的预测项
      if (prediction.predict?.length) {
        prediction.predict.forEach((predictItem, pIndex) => {
          if (index !== -1) {
            if (index === pIndex) {
              console.log('🚀 ~ prediction.predict.forEach ~ predictItem:', index, pIndex)
              predictItem = `<span style="background-color: var(--active-bg); color: var(--active-text);">${predictItem}</span>`
            }
          }

          const placeholder = `{{issue_lp${String(lpIndex).padStart(2, '0')}_p${String(pIndex).padStart(2, '0')}}}`
          template = template.replace(new RegExp(placeholder, 'g'), `<span>${predictItem}</span>` || '')
        })
      }
    })
  }

  // template 去掉前后p标签 中间的p标签保留
  template = template.replace(/<p>(.*?)<\/p>/g, '$1')

  return cssVars + template
}

watch(
  () => [props.datas.configParamJson.size, props.datas.configParamJson.forumId, gameType.value],
  ([newSize, newForumId, newGameType]) => {
    issueParams.size = Number(newSize) || 10
    issueParams.forumId = String(newForumId) || '10'
    issueParams.gameType = String(newGameType)
  }
)
</script>

<template>
  <div class="IssueCatalog">
    <div class="IssueCatalog-content" :style="containerStyle">
      <!-- 头部标题 -->
      <div class="title-header" :style="headerTitleBgStyle">
        <h2 class="main-title" :style="headerTitleTextStyle">
          {{ datas.configParamJson.titlePrefix }}
          {{ getGameName(gameStoreData.gameType) }}
          {{ datas.configParamJson.title }}
        </h2>
        <span class="sub-title" :style="subTitleStyle">{{ datas.configParamJson.subtitle }}</span>
      </div>
      <!-- 前置扩展 -->
      <div class="issue-list-extend" v-if="datas.configParamJson.frontExtend_Enable">
        <div v-html="datas.configParamJson.frontExtend_Content"></div>
      </div>
      <!-- 期数列表 -->
      <div
        class="issue-list"
        v-if="datas.configParamJson.enable"
        :style="{
          padding: styleConfig.padding + 'px',
          backgroundColor: styleConfig.backgroundColor || '#f1f1f1'
        }"
      >
        <!-- Issue list -->
        <div class="issue-item-content" :style="{ gap: styleConfig.listSpacing + 'px' }">
          <div
            v-for="(issue, issueIndex) in issueListItem"
            :key="issue.postId"
            class="issue-item"
            :style="{
              borderRadius: Math.max(0, styleConfig.borderRadius) + 'px',
              padding: Math.max(0, styleConfig.padding) + 'px',
              backgroundColor: styleConfig.itemBackgroundColor || '#f1f1f1'
            }"
          >
            <div class="issue-display">
              <div
                class="issue-display-content"
                :style="{
                  gap: styleConfig.numberSpacing + 'px',
                  justifyContent:
                    styleConfig.layout === 'left'
                      ? 'flex-start'
                      : styleConfig.layout === 'center'
                      ? 'center'
                      : 'flex-end'
                }"
                v-html="parseTemplate(issue)"
              ></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!issueListItem?.length" class="empty-state">
          <span>暂无{{ currentGameName }}数据</span>
        </div>
      </div>
      <!-- 后置扩展 -->
      <div class="issue-list-extend" v-if="datas.configParamJson.backendextend_Enable">
        <div v-html="datas.configParamJson.backendextend_Content"></div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style lang="scss" scoped>
.IssueCatalog {
  position: relative;
}

.title-header {
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .main-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .sub-title {
    font-size: 14px;
    opacity: 0.9;
  }
}

.issue-list {
  .issue-item-content {
    display: flex;
    flex-direction: column;
    // gap: 8px;
  }

  .issue-item {
    padding: 8px 16px;
    border-bottom: 1px solid #e9ecef;
    background-color: white;

    &:last-child {
      border-bottom: none;
    }

    .issue-display {
      display: flex;
      align-items: center;
      line-height: 1.5;
      color: #333;
      min-height: 1.5em;

      .issue-display-content {
        width: 100%;
        display: flex;
      }

      .period {
        color: #333;
        font-weight: 500;
        flex-shrink: 0;
      }

      .prediction-content {
        color: #1976d2;
        font-weight: 600;
        flex-shrink: 0;

        .animal {
          color: inherit;

          &.hit-highlight {
            background-color: #ffeb3b !important;
            color: #333 !important;
            border-radius: 3px !important;
            padding: 1px 2px !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
          }
        }
      }

      .result {
        color: #333;
        font-weight: 500;
        margin-left: auto;
        flex-shrink: 0;
      }

      .status {
        color: #4caf50;
        font-weight: bold;
        flex-shrink: 0;
      }
    }
  }
}

.empty-state {
  padding: 40px 20px;
  text-align: center;
  color: #999;
  font-size: 14px;
  background-color: #f8f9fa;
}

// Responsive design
@media (max-width: 768px) {
  .sweep-black-bank {
    .issue-list .issue-item {
      // Reduce padding on mobile
      padding: 6px 12px !important;

      .issue-display {
        // Reduce spacing on mobile
        gap: 2px !important;

        // Note: font-size is controlled by inline styles from styleConfig
        // Mobile responsive sizing should be handled by the configuration
        min-height: 1.2em;
      }
    }
  }
}
</style>
