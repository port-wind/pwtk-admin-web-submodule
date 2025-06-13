<script setup lang="ts" name="LotteryRiddleSolution">
import type { IDatas, RiddleItem } from './type'
import service from '../service/index'
import { onMounted, ref } from 'vue'

const gameType = 'a6'
const year = 2025

// 用于存储合并后的数据
const mergedList = ref<any[]>([])

const fetchData = async () => {
  const res = await service.kv().getAllNumInfo().do()
  const res2: any[] = await service.kv().getRecentYearsIssueList(gameType).getRequest()
  const res3: any = await service.kv().getGameResultHistory(gameType, String(year)).getRequest()
  console.log('🚀 ~ fetchData ~ res3:', res3)

  // 1. 找到当前 year 的 issues
  const yearItem = res2.find((item: any) => item.year === year)
  const res2List: any[] = yearItem?.issues?.slice(0, 5) || []

  // 2. res3.data 直接用
  const res3List: any[] = res3?.data || []

  // 3. 合并逻辑
  mergedList.value = res2List.map((item2: any) => {
    if (item2.type === 'next') {
      return item2
    } else {
      // 注意类型转换，res2的issue是数字，res3的issue是字符串
      const match = res3List.find((item3: any) => String(item3.issue) === String(item2.issue))
      return match ? { ...item2, ...match } : item2
    }
  })

  // mergedList.value 就是你要用的数据
  console.log('mergedList', mergedList.value)
}

onMounted(() => {
  fetchData()
})

interface IProps {
  datas: IDatas
}
const props = withDefaults(defineProps<IProps>(), {})

const isHighlighted = (zodiac: string, item: RiddleItem) => {
  return item.highlightZodiacs.includes(zodiac)
}

// 辅助函数
const getResultColor = (item: any) => {
  // 根据开奖颜色返回对应的样式类
  if (item.color === 'R') return 'red'
  if (item.color === 'G') return 'green'
  if (item.color === 'B') return 'blue'
  return 'red'
}

const getRiddleText = (item: any) => {
  // 这里可以根据实际业务逻辑生成谜语文本
  // 暂时返回一个示例文本
  return `看见人钱散发打，七九相连一二走`
}

const getZodiacFromTeNum = (item: any) => {
  // 从numInfo中找到特码对应的生肖
  if (!item.numInfo || !item.teNum) return ''

  const teNumStr = String(item.teNum).padStart(2, '0')
  const teNumInfo = item.numInfo.find((info: any) => info.num === teNumStr)

  return teNumInfo ? teNumInfo.shengxiao : ''
}

const getSizeText = (size: string) => {
  return size === 'b' ? '大数' : '小数'
}
</script>

<template>
  <div class="solution-wrapper">
    <div class="header">
      <span class="main-title">{{ datas.configParamJson.mainTitle }}</span>
      <span class="sub-title">【{{ datas.configParamJson.subTitle }}】</span>
    </div>
    <div class="content-extends">
      <div v-for="(item, index) in mergedList" :key="index" class="item">
        <div class="item-header">
          <span>{{ item.issueShort || item.issue }}期: {{ datas.configParamJson.subTitle }}</span>
          <span v-if="item.type === 'next'" class="result-text color-blue">开? 00准</span>
          <span v-else-if="item.result" :class="`result-text color-${getResultColor(item)}`">
            开{{ getZodiacFromTeNum(item) }}{{ item.result.split(',')[6] }}准
          </span>
        </div>
        <div v-if="item.type !== 'next'" class="riddle-text">≤{{ getRiddleText(item) }}≥</div>
        <div v-if="item.type !== 'next'" class="answer-text">
          本期谜底：（{{ getZodiacFromTeNum(item) }}）送：{{ getSizeText(item.totalSize) }}
        </div>
      </div>
    </div>
    <!-- <div class="content">
      <div v-for="(item, index) in datas.configParamJson.items" :key="index" class="item">
        <div class="item-header">
          <span>{{ item.issue }}: {{ item.title }}</span>
          <span :class="`result-text color-${item.resultColor}`">{{ item.result }}</span>
        </div>
        <div class="riddle-text">≤{{ item.riddle }}≥</div>
        <div class="answer-text">
          {{ item.answerPrefix }} (
          <template v-for="(z, i) in item.answerZodiacs" :key="i">
            <span :class="{ highlight: isHighlighted(z, item) }">{{ z }}</span>
            <span v-if="i < item.answerZodiacs.length - 1"></span>
          </template>
          ) {{ item.hintPrefix }}
          <span :class="{ highlight: item.highlightHint }">{{ item.hintText }}</span>
        </div>
      </div>
    </div> -->
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.solution-wrapper {
  border: 1px solid #4caf50;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'SimSun', '宋体', sans-serif;
  position: relative;
}

.header {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: bold;
}

.content {
  padding: 0 15px;
  background-color: #f0f9eb;
}

.content-extends {
  padding: 0 15px;
  background-color: #f0f9eb;
  border-bottom: 1px solid #c8e6c9;
}

.item {
  padding: 15px 0;
  border-bottom: 1px dashed #c8e6c9;
  &:last-child {
    border-bottom: none;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;

  .result-text {
    font-weight: bold;
    &.color-red {
      color: #f44336;
    }
    &.color-green {
      color: #4caf50;
    }
    &.color-blue {
      color: #2196f3;
    }
  }
}

.riddle-text {
  color: #0000ff;
  font-size: 16px;
  margin-bottom: 8px;
}

.answer-text {
  color: #333;
  font-size: 16px;
}

.highlight {
  background-color: yellow;
}
</style>
