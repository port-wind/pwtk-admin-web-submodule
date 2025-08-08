<!-- HighLightText 组件 -->
<template>
  <div class="highlight-text-container">
    <div v-html="parseTemplate()"></div>
    <slot name="deles"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore, setGameType } from '../store'
import { getGameName } from '../store/gameStore'
import type { IForumPost } from '../types/forum'
import { setComponentMapValue } from '../store/editorStore'
import type { IDatas } from './type'
import { useIssueList, type IUseIssueListParams } from '../hooks/issueList'

interface Props {
  datas: IDatas
}

// Props定义
const props = defineProps<Props>()

// 🎮 游戏类型集成
const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)
const currentGame = computed(() => gameStoreData.value.currentGame)
const currentGameName = computed(() => currentGame.value?.gameTypeLongName || '未知游戏')

// 🔄 动态参数
const issueParams = reactive<IUseIssueListParams>({
  page: props.datas.configParamJson.page || 1,
  size: Number(props.datas.configParamJson.size) || 10,
  gameType: gameType.value,
  forumId: String(props.datas.configParamJson.forumId),
  isAll: props.datas.configParamJson.isAll,
  issueGroup: props.datas.configParamJson.issueGroup || 1
})

const { getIssueNumber, getIssueResult, getLotteryPredictions, issueListItem } = useIssueList(issueParams)

const issueInfo = (issueListItem: IForumPost[]) => {
  const currentPredictions = getLotteryPredictions(issueListItem[0])

  const currentKeys = currentPredictions?.[0]?.predict
  const currentResult = currentKeys
    .map((key, index) => {
      return currentPredictions?.[0]?.rule?.options?.[key]?.[0]
    })
    .join('')

  const currentHitIndex = currentPredictions[0].hitDetail.split('').findIndex((item) => item === '1')
  const currentResultKey = currentPredictions[0].predict[currentHitIndex]

  if (!currentResultKey) {
    return [currentResult, null]
  } else {
    const currentHitResult =
      currentPredictions?.[0]?.rule?.options && currentPredictions?.[0]?.rule?.options?.[currentResultKey]?.[0]
    // 开奖生肖信息， 和中了的生肖。
    return [currentResult, currentHitResult]
  }
}

// 解析模板
const parseTemplate = () => {
  let template = props.datas.configParamJson.dynamicTemplate || '<p>{{currentIssue}}</p>'

  console.log('issueListItem', issueListItem)

  // const componentKey = 'IssueLine'
  // const [currentIssue, currentHitResult] = issueInfo(issueListItem)
  // const [previousIssues, preHitResult] = issueListItem.length > 1 ? issueInfo(issueListItem.slice(1, 2)) : ['', '']

  // const predictions = getLotteryPredictions(issue)

  // CSS变量
  const cssVars = `
    <style>
      .IssueLine-content[data-id="${props.datas.componentId}"] {
        --active-bg: ${props.datas.configParamJson.dynamicActiveBg || '#ffeb3b'};
        --active-text:${props.datas.configParamJson.dynamicActiveText || '#000'};
        --active-text-align: ${props.datas.configParamJson.dynamicActiveTextAlign || 'center'};
        --active-font-size: ${props.datas.configParamJson.dynamicActiveFontSize || '1.4rem'};
        --active-font-weight: ${props.datas.configParamJson.dynamicActiveFontWeight || '600'};
        --noresult: ${props.datas.configParamJson.dynamicNoResult || '#00F'};
      }
    </style>
  `

  // // 获取期数
  // const issueNumber = getIssueNumber(issue)
  // template = template.replace(new RegExp(`{{issueNumber}}`, 'g'), issueNumber)
  // setComponentMapValue(componentKey, 'other', `issueNumber`, issueNumber)

  // Object.keys(issue).forEach((key) => {
  //   if (typeof issue[key] !== 'object') {
  //     template = template.replace(new RegExp(`{{${key}}}`, 'g'), issue[key])
  //     setComponentMapValue(componentKey, 'other', `${key}`, issue[key])
  //   }
  // })

  // // 获取结果
  // const result = getIssueResult(issue)
  // template = template.replace(
  //   new RegExp(`{{shengxiao}}`, 'g'),
  //   result.shengxiao ? result.shengxiao : '<span style="color: var(--noresult);">?00</span>'
  // )
  // setComponentMapValue(
  //   componentKey,
  //   'other',
  //   `shengxiao`,
  //   result.shengxiao ? result.shengxiao : '<span style="color: var(--noresult);">?00</span>'
  // )

  // template = template.replace(new RegExp(`{{num}}`, 'g'), result?.num?.toString() ? result?.num?.toString() : '?00')
  // setComponentMapValue(componentKey, 'other', `num`, result?.num?.toString() ? result?.num?.toString() : '?00')
  // if (result.size) {
  //   template = template.replace(new RegExp(`{{size}}`, 'g'), result.size ?? '?00')
  //   setComponentMapValue(componentKey, 'other', `size`, result.size ?? '?00')
  // }

  // // predicton 是一个对象， 我门要存key 和 vlaue
  // predictions.forEach((prediction, mainIndex) => {
  //   if (prediction.isHit === 'y') {
  //     const hitIndex = prediction.hitDetail.split('').findIndex((item) => item === '1')
  //     prediction.predict.forEach((predict, index) => {
  //       if (hitIndex === index) {
  //         template = template.replace(
  //           new RegExp(`{{${mainIndex}_predict${index}}}`, 'g'),
  //           `<span style="color: var(--active-text);">${predict}</span>`
  //         )
  //         setComponentMapValue(componentKey, 'predict', `${mainIndex}_predict${index}`, predict)
  //       } else {
  //         template = template.replace(/{{${mainIndex}_predict${index}}}/g, predict)
  //         setComponentMapValue(componentKey, 'predict', `${mainIndex}_predict${index}`, predict)
  //       }
  //     })
  //   } else {
  //     Object.keys(prediction).forEach((key, index) => {
  //       if (key === 'rule') {
  //         return
  //       }
  //       if (key === 'predict') {
  //         prediction[key].forEach((predict, index) => {
  //           template = template.replace(/{{${mainIndex}_predict${index}}}/g, predict)
  //           setComponentMapValue(componentKey, 'predict', `${mainIndex}_predict${index}`, predict)
  //         })
  //       } else {
  //         template = template.replace(/{{${mainIndex}_${key}}}/g, prediction[key])
  //         setComponentMapValue(componentKey, 'other', `${mainIndex}_${key}`, prediction[key])
  //       }
  //     })
  //   }
  // })

  // issue.title.split(' ').forEach((item, index) => {
  //   template = template.replace(new RegExp(`{{title${index}}}`, 'g'), item)
  //   setComponentMapValue(componentKey, 'other', `title${index}`, item)
  // })

  // template = template.replace(new RegExp(`{{currentIssue}}`, 'g'), currentIssue ?? '')
  // setComponentMapValue(componentKey, 'other', `currentIssue`, currentIssue ?? '')
  // template = template.replace(new RegExp(`{{currentHitResult}}`, 'g'), currentHitResult ?? '')
  // setComponentMapValue(componentKey, 'other', `currentHitResult`, currentHitResult ?? '')
  // template = template.replace(new RegExp(`{{previousIssues}}`, 'g'), previousIssues ?? '')
  // setComponentMapValue(componentKey, 'other', `previousIssues`, previousIssues ?? '')
  // template = template.replace(new RegExp(`{{preHitResult}}`, 'g'), preHitResult ?? '')
  // setComponentMapValue(componentKey, 'other', `preHitResult`, preHitResult ?? '')

  // // 去掉前后p标签，包括带属性的p标签
  // template = template.replace(new RegExp(`<p[^>]*>(.*?)<\/p>`, 'g'), '$1')
  return cssVars + template
}
</script>

<style lang="scss" scoped>
.highlight-text-container {
  position: relative;
}

.highlight-text {
  display: block;
  word-break: break-word;

  // 动画效果
  &--flash {
    animation: flash 2s infinite;
  }

  &--pulse {
    animation: pulse 2s infinite;
  }
}

@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
