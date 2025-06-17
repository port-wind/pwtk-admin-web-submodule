<script setup lang="ts" name="LotteryRiddleSolution">
import type { IDatas } from './type'
import service from '../service/index'
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore } from '../store/index'
import { debounce } from 'lodash-es' // 引入防抖函数

interface IProps {
  datas: IDatas
}
const props = withDefaults(defineProps<IProps>(), {})
const gameStoreData = useStore(gameStore)

const gameTypeCode = computed(() => gameStoreData.value.gameTypeCode)
const year = computed(() => gameStoreData.value.year)

const getIssueNumber = computed(() => props.datas?.configParamJson?.getIssueNumber || 5)

// 用于存储合并后的数据
const mergedList = ref<any[]>([])
const isLoading = ref(false) // 添加加载状态

const fetchData = async () => {
  // 确保有必要的参数才执行请求
  if (!gameTypeCode.value || !year.value) {
    console.warn('gameType or year is not available')
    return
  }

  if (isLoading.value) {
    console.log('正在加载中，跳过重复请求')
    return
  }

  isLoading.value = true
  try {
    const res2: any[] = await service.kv().getRecentYearsIssueList(gameTypeCode.value).getRequest()
    const res3: any[] = await service.kv().getGameResultHistory(gameTypeCode.value, String(year.value)).getRequest()
    console.log('🚀 ~ fetchData ~ res3:', res3)

    // 1. 找到当前 year 的 issues
    const yearItem = res2.find((item: any) => item.year === year.value)
    const res2List: any[] = yearItem?.issues?.slice(0, getIssueNumber.value) || []

    // 2. res3.data 直接用
    const res3List = res3[1] || []

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
  } catch (error) {
    console.error('fetchData error:', error)
  } finally {
    isLoading.value = false
  }
}

// 创建防抖函数
const debouncedFetchData = debounce(fetchData, 300) // 300ms 防抖

onMounted(() => {
  fetchData()
})

// 监听关键参数变化，重新获取数据
watch(
  gameTypeCode,
  (newVal, oldVal) => {
    // 避免相同值的重复请求
    if (newVal === oldVal) {
      console.log('gameTypeCode 值未发生变化，跳过请求')
      return
    }

    console.log('🚀 ~ gameTypeCode ~ newVal:', gameStoreData.value)
    // 使用防抖函数，避免频繁切换
    debouncedFetchData()
  },
  { immediate: false }
)

const isHighlighted = (zodiac: string, item: any) => {
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
  // 164 ≤丈夫双泪不轻弹,带着铃铛去做贼≥
  // 163 ≤看见八钱散发打,七九相连三一走≥
  // 162 ≤船到桥头自会直,摇头不算点头算≥
  // 160 ≤四头连旺暴今期,得饶人处且饶人≥
  // 159 ≤一唱雄鸡天下白,白手起家從零起≥
  // 158 ≤真金不怕火来烧,不见棺材不落泪≥

  switch (String(item.issue)) {
    case year.value + '164':
      return '≤丈夫双泪不轻弹,带着铃铛去做贼≥'
    case year.value + '163':
      return '≤看见八钱散发打,七九相连三一走≥'
    case year.value + '162':
      return '≤船到桥头自会直,摇头不算点头算≥'
    case year.value + '160':
      return '≤四头连旺暴今期,得饶人处且饶人≥'
    case year.value + '159':
      return '≤一唱雄鸡天下白,白手起家從零起≥'
    case year.value + '158':
      return '≤真金不怕火来烧,不见棺材不落泪≥'
    default:
      return ''
  }
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
  <div class="LotteryRiddleSolution">
    <div class="solution-wrapper">
      <div class="header">
        <span class="main-title">{{ datas.configParamJson.mainTitle }}</span>
        <span class="sub-title">【{{ datas.configParamJson.subTitle }}】</span>
      </div>
      <div class="content-extends">
        {{ mergedList }}
        <div v-for="(item, index) in mergedList" :key="index" class="item">
          <div class="item-header">
            <span>{{ item.issueShort || item.issue }}期: {{ datas.configParamJson.subTitle }}</span>
            <span v-if="item.type === 'next'" class="result-text">
              开
              <span class="red">? 00</span>
              准
            </span>
            <span v-else-if="item.result" :class="`result-text`">
              开
              <span class="red">{{ getZodiacFromTeNum(item) }}{{ item.result.split(',')[6] }}</span>
              准
            </span>
          </div>
          <div class="riddle-text">≤{{ getRiddleText(item) }}≥</div>
          <div class="answer-text">
            <!--  -->
            本期谜底：（{{ getZodiacFromTeNum(item) }}）送：{{ getSizeText(item.totalSize) }}
          </div>
        </div>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.LotteryRiddleSolution {
  position: relative;
}

.solution-wrapper {
  border: 1px solid #4caf50;
  // border-radius: 8px;
  overflow: hidden;
  font-family: 'SimSun', '宋体', sans-serif;
  position: relative;
}

.header {
  background-color: #4caf50;
  color: white;
  padding: 3px 15px;
  font-size: 20px;
  font-weight: bold;
}

.content {
  padding: 0 15px;
  background-color: #f0f9eb;
}

.content-extends {
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #c8e6c9;
}

.item {
  padding: 5px 10px;
  border-bottom: 1px dashed #c8e6c9;
  &:last-child {
    border-bottom: none;
  }
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;

  .result-text {
    font-weight: bold;
    .red {
      color: #f44336;
    }
  }
}

.riddle-text {
  color: green;
  font-size: 16px;
}

.answer-text {
  color: blue;
  font-size: 16px;
}

.highlight {
  background-color: yellow;
}
</style>
