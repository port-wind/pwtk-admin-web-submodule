<script setup lang="ts" name="Issue24">
import { computed } from 'vue'
import type { IDatas } from './type'
import { getWebSitePost } from '../api'
import { gameStore } from '../store'
import { useStore } from '@nanostores/vue'

const gameStoreData = useStore(gameStore)

const IssueList = computed(() => gameStoreData.value.issueList)
console.log('🚀 ~ IssueList:', IssueList)

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

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
    margin: `0 ${styleJSON.value?.numberSpacing || 4}px`
  }
})

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

const fetchIssueList = async () => {
  const res = await getWebSitePost({
    page: 1,
    size: 10,
    gameType: '2032',
    forumId: 'haocai001'
  })
  console.log('🚀 ~ fetchIssueList ~ res:', res)
}

onMounted(() => {
  fetchIssueList()
})
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
        <div v-for="issue in datas.configParamJson.issueList" :key="issue.id" v-show="issue.enabled" class="issue-item">
          <!-- 期数和状态行 -->
          <div class="issue-header-row">
            <div class="period-info">
              <span v-if="styleJSON?.showPeriod" class="period">{{ issue.period }}:</span>
              <span class="draw-title">{{ issue.drawTitle }}</span>
            </div>
            <div class="status-info">
              <span v-if="styleJSON?.showStatus" class="status">{{ issue.status }}</span>
              <span v-if="styleJSON?.showResult" class="result">{{ issue.result }}</span>
            </div>
          </div>

          <!-- 号码行 -->
          <div class="numbers-rows">
            <!-- 分两行显示号码 -->
            <div class="number-row">
              <span
                v-for="(num, index) in issue.numbers.slice(0, 12)"
                :key="`${issue.id}-${index}`"
                :class="['number-item', getNumberColorClass(num.color), { highlight: num.isHighlight }]"
                :style="numberStyle"
              >
                {{ num.number }}
              </span>
            </div>
            <div class="number-row" v-if="issue.numbers.length > 12">
              <span
                v-for="(num, index) in issue.numbers.slice(12)"
                :key="`${issue.id}-${index + 12}`"
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
  padding: 16px;
  border-bottom: 1px solid #e8eaed;

  &:last-child {
    border-bottom: none;
  }
}

.issue-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.period-info {
  display: flex;
  align-items: center;
  gap: 8px;

  .period {
    font-weight: bold;
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
  gap: 8px;
}

.number-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.number-item {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  min-width: 24px;
  text-align: center;
  transition: all 0.2s ease;
  font-variant: tabular-nums;

  &.highlight {
    background-color: #ffeb3b !important;
    color: #333 !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &.number-red {
    color: #e74c3c;
    background-color: rgba(231, 76, 60, 0.1);
  }

  &.number-blue {
    color: #3498db;
    background-color: rgba(52, 152, 219, 0.1);
  }

  &.number-green {
    color: #27ae60;
    background-color: rgba(39, 174, 96, 0.1);
  }

  &.number-black {
    color: #2c3e50;
    background-color: rgba(44, 62, 80, 0.1);
  }

  &.number-yellow {
    color: #f39c12;
    background-color: rgba(243, 156, 18, 0.1);
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
