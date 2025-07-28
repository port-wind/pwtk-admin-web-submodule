<script setup lang="ts" name="IssueLine">
import { ref, computed, onMounted, reactive, watch } from 'vue'
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

// 🎮 游戏类型集成
const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)
const currentGame = computed(() => gameStoreData.value.currentGame)
const currentGameName = computed(() => currentGame.value?.gameTypeLongName || '未知游戏')

// 🔄 动态参数
const issueParams = reactive({
  gameType: gameType.value,
  size: Number(props.datas.configParamJson.size) || 10,
  forumId: String(props.datas.configParamJson.forumId) || '10'
})

const { getIssueNumber, getIssueResult, getLotteryPredictions, issueListItem } = useIssueList(issueParams)

// 容器样式
const containerStyle = computed(() => {
  return {
    borderRadius: `${styleHeader.value?.borderRadius || 0}px`,
    padding: `${styleHeader.value?.padding || 0}px`,
    backgroundColor: styleMain.value?.backgroundColor || '#f1f1f1'
  }
})

// 标题背景样式
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

// 标题文字样式
const headerTitleTextStyle = computed(() => {
  return {
    color: styleHeader.value?.titleColor || '#333333'
  }
})

// 副标题样式
const subTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.subTitleColor || '#333333'
  }
})

// 样式配置
const styleConfig = computed(() => ({
  listSpacing: styleMain.value?.listSpacing || 0,
  numberSpacing: styleMain.value?.itemSpacing || 0,
  borderRadius: styleMain.value?.borderRadius || 0,
  contentPaddingLeftRight: styleMain.value?.contentPaddingLeftRight || 0,
  contentPaddingTopBottom: styleMain.value?.contentPaddingTopBottom || 0,
  paddingLeftRight: styleMain.value?.paddingLeftRight || 0,
  paddingTopBottom: styleMain.value?.paddingTopBottom || 0,
  backgroundColor: styleMain.value?.backgroundColor || '#f1f1f1',
  itemBackgroundColor: styleMain.value?.itemBackgroundColor || '#f1f1f1',
  layout: styleMain.value?.layout || 'start',
  columnCount: styleMain.value?.columnCount || 1
}))

// 获取当前期数和往期期数
const getCurrentPreviousIssue = (issueListItem: IForumPost[]) => {
  const currentIssue = issueListItem[0]
  const previousIssues = issueListItem.slice(1)

  const predictions = getLotteryPredictions(currentIssue)
  console.log('🚀 ~ getCurrentPreviousIssue ~ predictions:', predictions)

  return {
    currentIssue,
    previousIssues
  }

  // const currentIssue = getIssueNumber(issue)
  // const previousIssues = getPreviousIssues(issue)
  // return {
  //   currentIssue,
  //   previousIssues
  // }
}

// 解析模板
const parseTemplate = (issue: IForumPost) => {
  console.log('🚀 ~ parseTemplate 99999999 ~ issue:', issue)
  let template = props.datas.configParamJson.dynamicTemplate || ''

  let replaceKeys: string[] = []

  const predictions = getLotteryPredictions(issue)

  // CSS变量
  const cssVars = `
    <style>
      :root {
        --active-bg: ${props.datas.configParamJson.dynamicActiveBg || '#ffeb3b'};
        --active-text:${props.datas.configParamJson.dynamicActiveText || '#000'};
        --active-text-align: ${props.datas.configParamJson.dynamicActiveTextAlign || 'center'};
        --active-font-size: ${props.datas.configParamJson.dynamicActiveFontSize || '1.4rem'};
        --active-font-weight: ${props.datas.configParamJson.dynamicActiveFontWeight || '600'};
        --noresult: ${props.datas.configParamJson.dynamicNoResult || '#00F'};
      }
    </style>
  `

  // 获取期数
  const issueNumber = getIssueNumber(issue)
  template = template.replace(/{{issueNumber}}/g, issueNumber)
  replaceKeys.push('{{issueNumber}}')
  // 获取结果
  const result = getIssueResult(issue)
  template = template.replace(
    /{{shengxiao}}/g,
    result.shengxiao ? result.shengxiao : '<span style="color: var(--noresult);">?00</span>'
  )
  replaceKeys.push('{{shengxiao}}')
  template = template.replace(/{{num}}/g, result?.num?.toString() ? result?.num?.toString() : '?00')
  replaceKeys.push('{{num}}')
  if (result.size) {
    template = template.replace(/{{size}}/g, result.size ?? '?00')
    replaceKeys.push('{{size}}')
  }

  // predicton 是一个对象， 我门要存key 和 vlaue
  predictions.forEach((prediction, mainIndex) => {
    if (prediction.isHit === 'y') {
      const hitIndex = prediction.hitDetail.split('').findIndex((item) => item === '1')
      prediction.predict.forEach((predict, index) => {
        if (hitIndex === index) {
          template = template.replace(
            `{{${mainIndex}_predict${index}}}`,
            `<span style="color: var(--active-text);">${predict}</span>`
          )
          replaceKeys.push(`{{${mainIndex}_predict${index}}}`)
        } else {
          template = template.replace(`{{${mainIndex}_predict${index}}}`, predict)
          replaceKeys.push(`{{${mainIndex}_predict${index}}}`)
        }
      })
    } else {
      Object.keys(prediction).forEach((key) => {
        if (key === 'rule') {
          return
        }
        if (key === 'predict') {
          prediction[key].forEach((predict, index) => {
            template = template.replace(`{{${mainIndex}_predict${index}}}`, predict)
            replaceKeys.push(`{{${mainIndex}_predict${index}}}`)
          })
        } else {
          template = template.replace(`{{${mainIndex}_${key}}}`, prediction[key])
          replaceKeys.push(`{{${mainIndex}_${key}}}`)
        }
      })
    }
  })

  // 去掉前后p标签
  template = template.replace(/<p>(.*?)<\/p>/g, '$1')

  console.info('可以替换的字段有哪些', replaceKeys)

  return cssVars + template
}

watch(issueListItem, (newIssueListItem) => {
  console.log('🚀 ~ newIssueListItem:', newIssueListItem)
  // getCurrentPreviousIssue(newIssueListItem)
})

// 监听参数变化
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
  <div class="IssueLine">
    <div class="IssueLine-content" :style="containerStyle">
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
          backgroundColor: styleConfig.backgroundColor || 'currentColor',
          padding: `${styleConfig.contentPaddingTopBottom}px ${styleConfig.contentPaddingLeftRight}px`
        }"
      >
        <!-- Issue list -->
        <div
          class="issue-item-content"
          :style="{
            gap: styleConfig.listSpacing + 'px',
            gridTemplateColumns: `repeat(${styleConfig.columnCount}, 1fr)`
          }"
        >
          <div
            v-for="(issue, issueIndex) in issueListItem"
            :key="issue.postId"
            class="issue-item"
            :style="{
              borderRadius: Math.max(0, styleConfig.borderRadius) + 'px',
              padding: `${styleConfig.paddingTopBottom}px ${styleConfig.paddingLeftRight}px`,
              backgroundColor: styleConfig.itemBackgroundColor || '#f1f1f1'
            }"
          >
            <div class="issue-display">
              <div
                class="issue-display-content"
                :style="{
                  gap: styleConfig.numberSpacing + 'px',
                  justifyContent: styleConfig.layout || 'flex-start'
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
.IssueLine {
  position: relative;

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
      display: grid;
      width: 100%;
      font-variant: tabular-nums;
    }

    .issue-item {
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
}

// 响应式设计
@media (max-width: 768px) {
  .IssueLine {
    .issue-list .issue-item {
      padding: 6px 12px !important;

      .issue-display {
        gap: 2px !important;
        min-height: 1.2em;
      }
    }
  }
}
</style>
