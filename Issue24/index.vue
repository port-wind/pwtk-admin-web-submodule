<script setup lang="ts" name="Issue24">
import { computed, ref, onMounted, watch } from 'vue'
import type { IDatas } from './type'
import { getWebSitePost, type IGetWebSitePostResponse } from '../api'
import { gameStore } from '../store'
import { useStore } from '@nanostores/vue'

const gameStoreData = useStore(gameStore)

const IssueList = computed(() => gameStoreData.value.issueList)

const gameType = computed(() => gameStoreData.value.gameType)
console.log('🚀 ~ IssueList:', IssueList)

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

const issueList = ref<IGetWebSitePostResponse[]>([])

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

// 计算处理后的期数数据
const processedIssueList = computed(() => {
  return issueList.value.map((issue) => {
    const processedPredictions = processLotteryData(issue.lotteryPredictions || [])
    return {
      ...issue,
      processedPredictions
    }
  })
})

const styleJSON = computed(() => props.datas.configParamJson.styleJSON)

const containerStyle = computed(() => {
  return {
    backgroundColor: styleJSON.value?.backgroundColor || '#f8f9fa',
    borderRadius: `${styleJSON.value?.borderRadius || 0}px`,
    padding: `${styleJSON.value?.padding || 0}px`
  }
})

const headerStyle = computed(() => {
  if (styleJSON.value.isGradient) {
    return {
      background: `linear-gradient(to right,  ${styleJSON.value.headerBg}, ${styleJSON.value.headerBg2})`,
      color: styleJSON.value?.headerTextColor || '#ffffff'
    }
  } else {
    return {
      backgroundColor: styleJSON.value?.headerBgColor || '#4a90e2',
      color: styleJSON.value?.headerTextColor || '#ffffff'
    }
  }
})

const titleStyle = computed(() => {
  return {
    color: styleJSON.value?.titleColor || '#333333'
  }
})

const numberStyle = computed(() => {
  return {
    fontSize: `${styleJSON.value?.numberSize || 14}px`,
    margin: `0 ${styleJSON.value?.numberSpacing || 0}px`
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

const fetchIssueList = async (gameType: string) => {
  const res = await getWebSitePost({
    page: 1,
    size: 10,
    gameType: gameType,
    forumId: 'haocai001'
  })
  issueList.value = res.data.list
}

onMounted(() => {
  fetchIssueList(gameType.value)
})

watch(
  () => gameType.value,
  (newVal, oldVal) => {
    console.log('🚀 ~ newVal:', newVal)
    fetchIssueList(newVal)
  }
)
</script>

<template>
  <div class="Issue24">
    <div class="Issue24-content" :style="containerStyle">
      <!-- 头部标题 -->
      <div class="issue-header" :style="headerStyle">
        <h2 class="main-title" :style="titleStyle">{{ datas.configParamJson.title }}</h2>
        <span class="sub-title">{{ datas.configParamJson.subtitle }}</span>
      </div>

      <!-- 开奖信息列表 -->
      <div class="issue-list" v-if="datas.configParamJson.enable">
        <div v-for="(issue, issueIndex) in processedIssueList" :key="issue.postId" class="issue-item">
          <!-- 期数和状态行 -->
          <div class="issue-header-row">
            <div class="period-info">
              <span v-if="styleJSON?.showPeriod" class="period">{{ extractIssueNumber(issue.postIssue) }}期:</span>
              <span class="draw-title">精选24码</span>
            </div>
            <div class="status-info">
              <span v-if="styleJSON?.showStatus" class="status">开?</span>
              <span v-if="styleJSON?.showResult" class="result">00准</span>
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

.issue-header {
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

.issue-header-row {
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
  gap: 8px;

  .status {
    font-size: 14px;
    color: #666;
  }

  .result {
    font-size: 14px;
    font-weight: bold;
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
  .issue-header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .status-info {
    align-self: flex-end;
  }

  .number-item {
    font-size: 12px;
    padding: 3px 6px;
    min-width: 20px;
  }
}
</style>
