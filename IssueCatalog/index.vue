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
    borderRadius: `${styleMain.value?.borderRadius || 0}px`,
    padding: `${styleMain.value?.padding || 0}px`
  }
})

const titleHeaderStyle = computed(() => {
  if (styleHeader.value.isGradient) {
    return {
      background: `linear-gradient(to right,  ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  }
  return {
    backgroundColor: styleHeader.value?.headerBgColor || '#4a90e2'
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

// 🎨 Style Configuration from Right Panel
const styleConfig = computed(() => ({
  numberSize: props.datas.configParamJson.styleMain?.numberSize || 14,
  numberSpacing: props.datas.configParamJson.styleMain?.numberSpacing || 4,
  borderRadius: props.datas.configParamJson.styleMain?.borderRadius || 8,
  padding: props.datas.configParamJson.styleMain?.padding || 0,
  showPeriod: props.datas.configParamJson.styleMain?.showPeriod !== false,
  showStatus: props.datas.configParamJson.styleMain?.showStatus !== false,
  showResult: props.datas.configParamJson.styleMain?.showResult !== false
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
      }
    </style>
  `

  // 获取当前期数
  const issueNumber = getIssueNumber(issue)
  template = template.replace(/{{issueNumber}}/g, issueNumber)

  // 获取当前期数的结果
  const result = getIssueResult(issue)

  template = template.replace(/{{shengxiao}}/g, result.shengxiao ? result.shengxiao : '?00')
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
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">
          {{ datas.configParamJson.titlePrefix }}
          {{ getGameName(gameStoreData.gameType) }}
          {{ datas.configParamJson.title }}
        </h2>
        <span class="sub-title" :style="subTitleStyle">{{ datas.configParamJson.subtitle }}</span>
      </div>
      <!-- 期数列表 -->
      <div
        class="issue-list"
        v-if="datas.configParamJson.enable"
        :style="{
          borderRadius: styleConfig.borderRadius + 'px',
          padding: styleConfig.padding + 'px'
        }"
      >
        <!-- Issue list -->
        <div class="issue-item">
          <div
            v-for="(issue, issueIndex) in issueListItem"
            :key="issue.postId"
            class="issue-item"
            :style="{
              borderRadius: Math.max(0, styleConfig.borderRadius - 2) + 'px',
              padding: Math.max(0, styleConfig.padding + 8) + 'px'
            }"
          >
            <div class="issue-display" :style="{ gap: styleConfig.numberSpacing + 'px' }">
              <div class="issue-display-content" v-html="parseTemplate(issue)"></div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!issueListItem?.length" class="empty-state">
          <span>暂无{{ currentGameName }}数据</span>
        </div>
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
</style>
