<script setup lang="ts" name="Issue24">
import { computed, ref, onMounted, watch } from 'vue'
import type { IDatas } from './type'
import { getWebSitePost, type IGetWebSitePostResponse } from '../api'
import { gameStore } from '../store'
import { useStore } from '@nanostores/vue'

const gameStoreData = useStore(gameStore)

const IssueList = computed(() => gameStoreData.value.issueList)
const gameType = computed(() => gameStoreData.value.gameType)
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)
interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

const issueListItem = ref<IGetWebSitePostResponse[]>([])

// 处理彩票预测数据的函数
const processLotteryData = (predictions: any[]) => {
  if (!predictions || predictions.length === 0) return []

  return predictions.map((prediction) => {
    const { predict, hitDetail } = prediction
    if (!predict || !hitDetail) return { numbers: [] }

    // 根据hitDetail判断哪些号码需要高亮
    const numbers = predict.map((number: string, index: number) => ({
      number,
      color: 'blue', // 默认颜色
      isHighlight: hitDetail[index] === '1' // hitDetail中"1"表示中奖需要高亮
    }))

    return { numbers }
  })
}

// 根据issue匹配获取开奖信息
const getIssueResultInfo = (issueNumber: string) => {
  const matchedIssue = IssueList.value.find((item) => item.issue === issueNumber)

  if (matchedIssue && matchedIssue.numInfo && matchedIssue.numInfo.length > 6) {
    const lastNumInfo = matchedIssue.numInfo[6] // 取最后一个元素（索引6）
    return {
      shengxiao: lastNumInfo.shengxiao || '',
      teNum: matchedIssue.teNum || '', // 特码号码
      result: matchedIssue.result || ''
    }
  }
  return { shengxiao: '', teNum: '', result: '' }
}

// 计算处理后的期数数据
const processedIssueList = computed(() => {
  return issueListItem.value.map((issue) => {
    const processedPredictions = processLotteryData(issue.lotteryPredictions || [])
    // 通过postIssue匹配获取开奖信息
    const resultInfo = getIssueResultInfo(issue.postIssue)

    return {
      ...issue,
      processedPredictions,
      resultInfo
    }
  })
})

const containerStyle = computed(() => {
  return {
    // backgroundColor: styleMain.value?.backgroundColor || '#f8f9fa',
    borderRadius: `${styleMain.value?.borderRadius || 0}px`,
    padding: `${styleMain.value?.padding || 0}px`
  }
})

const numberStyle = computed(() => {
  return {
    fontSize: `${styleMain.value?.numberSize || 14}px`,
    margin: `0 ${styleMain.value?.numberSpacing || 0}px`
  }
})

// 从postIssue中提取期数，例如 "2025141" -> "141"
const extractIssueNumber = (postIssue: string) => {
  if (!postIssue) return ''
  // 从postIssue字符串中提取后面的数字部分作为期数
  // 例如: "2025141" -> "141"
  const match = postIssue.match(/(\d+)$/)
  if (match) {
    const fullNumber = match[1]
    // 如果是7位数，取后3位；如果是其他位数，取后3位或全部
    return fullNumber.length >= 3 ? fullNumber.slice(-3) : fullNumber
  }
  return postIssue
}

// 获取中奖号码
const getHitNumber = (issue: any) => {
  if (issue.processedPredictions && issue.processedPredictions.length > 0) {
    for (const prediction of issue.processedPredictions) {
      if (prediction.numbers) {
        const hitNumber = prediction.numbers.find((num: any) => num.isHighlight)
        if (hitNumber) {
          return hitNumber.number // 返回中奖的号码
        }
      }
    }
  }
  return '00' // 如果没有中奖号码，返回00
}

const getNumberColorClass = (color: string) => {
  const colorMap = {
    red: 'number-red',
    blue: 'number-blue',
    green: 'number-green',
    black: 'number-black',
    yellow: 'number-yellow'
  }
  return colorMap[color as keyof typeof colorMap] || 'number-black'
}

const fetchIssueList = async (gameType: string, size: number, forumId: string) => {
  const res = await getWebSitePost({
    gameType: gameType,
    page: 1,
    size: size || 10,
    forumId: forumId
  })
  issueListItem.value = res.data.list
}

onMounted(() => {
  fetchIssueList(gameType.value, props.datas.configParamJson.size, props.datas.configParamJson.forumId)
})

watch(
  () => [gameType.value, props.datas.configParamJson.size, props.datas.configParamJson.forumId],
  (newVal, oldVal) => {
    fetchIssueList(String(newVal[0]), Number(newVal[1]), String(newVal[2]))
  }
)

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
  <div class="Issue24">
    <div class="Issue24-content" :style="containerStyle">
      <!-- 头部标题 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">{{ datas.configParamJson.title }}</h2>
        <span class="sub-title" :style="subTitleStyle">{{ datas.configParamJson.subtitle }}</span>
      </div>

      <!-- 开奖信息列表 -->
      <div class="issue-list" v-if="datas.configParamJson.enable">
        <div v-for="(issue, issueIndex) in processedIssueList" :key="issue.postId" class="issue-item">
          <!-- 期数和状态行 -->
          <div class="title-header-row">
            <div class="period-info">
              <span v-if="styleMain?.showPeriod" class="period">{{ extractIssueNumber(issue.postIssue) }}期:</span>
              <span class="draw-title">精选24码</span>
            </div>
            <div class="status-info">
              <span>开</span>
              <span v-if="styleMain?.showStatus" class="status">{{ issue.resultInfo.shengxiao || '?' }}</span>
              <span v-if="styleMain?.showResult" class="result">{{ getHitNumber(issue) || '00' }}</span>
              <span>准</span>
            </div>
          </div>

          <!-- 预测号码显示 -->
          <div
            v-for="(prediction, predIndex) in issue.processedPredictions"
            :key="`pred-${issueIndex}-${predIndex}`"
            class="prediction-block"
          >
            <div class="numbers-rows">
              <!-- 分两行显示号码，每行12个 -->
              <div class="number-row">
                <span
                  v-for="(num, index) in prediction.numbers.slice(0, 12)"
                  :key="`${issue.postId}-${predIndex}-${index}`"
                  :class="['number-item', getNumberColorClass(num.color), { highlight: num.isHighlight }]"
                  :style="numberStyle"
                >
                  {{ num.number }}
                </span>
              </div>
              <div class="number-row" v-if="prediction.numbers.length > 12">
                <span
                  v-for="(num, index) in prediction.numbers.slice(12)"
                  :key="`${issue.postId}-${predIndex}-${index + 12}`"
                  :class="['number-item', getNumberColorClass(num.color), { highlight: num.isHighlight }]"
                  :style="numberStyle"
                >
                  {{ num.number }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.Issue24 {
  position: relative;
}

.Issue24-content {
  // border: 1px solid #e1e5e9;
  // font-family: 'Helvetica Neue', Arial, sans-serif;
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
  padding: 0;
}

.issue-item {
  padding: 10px;
  // padding: 16px;
  border-bottom: 1px solid #e8eaed;

  &:last-child {
    border-bottom: none;
  }
}

.prediction-block {
  margin-bottom: 16px;
  // padding: 12px;
  background-color: rgba(248, 249, 250, 0.5);
  border-radius: 8px;
  // border: 2px solid #ff4444;
  color: blue;
  &:last-child {
    margin-bottom: 0;
  }
}

.title-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.period-info {
  display: flex;
  align-items: center;
  gap: 8px;

  .period {
    font-size: 16px;
    color: #333;
  }

  .draw-title {
    font-size: 16px;
    color: #333;
  }
}

.status-info {
  display: flex;
  align-items: center;
  font-size: 14px;

  .status {
    color: #e74c3c;
  }
  .result {
    color: #e74c3c;
  }
}

.numbers-rows {
  display: flex;
  flex-direction: column;
  // gap: 8px;
}

.number-row {
  display: flex;
  // gap: 4px;
}

.number-item {
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  // min-width: 24px;
  text-align: center;
  transition: all 0.2s ease;
  font-variant: tabular-nums;

  &.highlight {
    background-color: #ffeb3b !important;
    color: #333 !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

@media (max-width: 768px) {
  .title-header-row {
    // flex-direction: column;
    align-items: flex-start;
    // gap: 8px;
  }

  .status-info {
    align-self: flex-end;
  }

  .number-item {
    font-size: 12px;
    padding: 0px;
    min-width: 20px;
  }
}
</style>
