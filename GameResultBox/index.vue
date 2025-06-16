<script setup lang="ts" name="GameResultBox">
import { ref, onMounted } from 'vue'
import { defineEmits } from 'vue'
// import { globalStore } from '@/store';
import GameResultModel1 from './GameResultModel1.vue'
// import GameResultModel2 from './GameResultModel2.vue'
import GameResultModel3 from './GameResultModel3.vue'
import type { IDatas } from './type'
import service from '../service/index'

export interface GameResultType {
  isLongName: boolean
  isIcon: boolean
  model: 's1' | 's2' | 's3'
  isNextIssue: boolean
  isHistory: boolean
  isIssue: boolean
  isGifAd: boolean
  showArray: string[]
  // nameType: string
  noTab: boolean
}

interface IProps {
  datas: IDatas
  tabsData: Record<string, any>
}

const props = defineProps<IProps>()
// console.log('🚀 ~ props:', props.datas.configParamJson)

// console.log('props', props);
// console.log('全局变量', window.globalVar); // 输出: This is a global variable
const emits = defineEmits(['update-issue'])
// const handleTabClick = (index: number) => {
//   emits('tab-click', index);
// };

const handleUpdateIssue = () => {
  emits('update-issue')
}
const rawTabsData = ref([])
const rawData = ref<GameResultType>({
  isLongName: false,
  isIcon: true,
  model: 's3',
  isNextIssue: false,
  isHistory: false,
  isIssue: true,
  isGifAd: false,
  showArray: ['2032', '1', '6', '5'],
  noTab: false
})
onMounted(async () => {
  console.log('props', props)

  // let tabsData = []
  try {
    const response = await service.kv().getGamePlatform().do()
    let instance = service.kv()
    if (response[0].data) {
      response[0].data.forEach((item: { gameTypeCode: string }) => {
        instance = instance.getGameIssueCurrent(item.gameTypeCode)
      })
    }
    const res = await instance.do()

    rawTabsData.value = response[0].data.map((item: any, index: number) => ({
      ...item,
      ...res[index]
    }))
    // globalStore.setKey("GameData", tabsData);
    // componentsData.value = [...componentsData.value];
    // console.log(' componentsData.value ', componentsData.value);
    // Set default values
  } catch (error) {
    console.error('请求失败:', error)
  }
})

const tabsData = ref([
  {
    gameType: '2032',
    gameTypeShortName: '澳彩',
    gameTypeName: '澳彩',
    gameTypeLongName: '澳门六合彩',
    areaCode: 'MAC',
    classifier: 'official',
    sortNum: 6,
    gameTypeCode: 'a6',
    status: 'y',
    createTime: 1740632835000,
    updateTime: 1740632835000,
    currentCompleteIssue: 2025156,
    currentIssue: '2025156',
    currentPeriod: 156,
    currentResult: [
      { color: 'B', fiveElements: 'm', index: 1, num: 37, oddEven: 'o', shengxiao: '蛇', size: 'b' },
      { color: 'R', fiveElements: 'm', index: 2, num: 8, oddEven: 'e', shengxiao: '狗', size: 's' },
      { color: 'G', fiveElements: 's', index: 3, num: 44, oddEven: 'e', shengxiao: '狗', size: 'b' },
      { color: 'R', fiveElements: 't', index: 4, num: 19, oddEven: 'o', shengxiao: '猪', size: 's' },
      { color: 'B', fiveElements: 'j', index: 5, num: 41, oddEven: 'o', shengxiao: '牛', size: 'b' },
      { color: 'B', fiveElements: 'h', index: 6, num: 10, oddEven: 'e', shengxiao: '猴', size: 's' },
      { color: 'R', fiveElements: 'm', index: 7, num: 7, oddEven: 'o', shengxiao: '猪', size: 's' }
    ],
    currentYear: 2025,
    data: {
      beginTime: '2025-06-03 21:32:00',
      endTime: '2025-06-06 21:32:32',
      isMaintain: 0,
      issue: 2025157,
      lastIssue: 2025156,
      lotteryId: 2032,
      lotteryName: '澳門六合彩',
      originalDataList: [],
      pet: '蛇',
      serverTime: '2025-06-03 21:36:00'
    },
    lastIssue: 2025155,
    lastOpenCode: '37,08,44,19,41,10,07',
    lastResult: [
      { color: 'B', fiveElements: 'j', index: 1, num: 42, oddEven: 'e', shengxiao: '鼠', size: 'b' },
      { color: 'R', fiveElements: 'h', index: 2, num: 1, oddEven: 'o', shengxiao: '蛇', size: 's' },
      { color: 'G', fiveElements: 's', index: 3, num: 21, oddEven: 'o', shengxiao: '鸡', size: 's' },
      { color: 'B', fiveElements: 'm', index: 4, num: 15, oddEven: 'o', shengxiao: '兔', size: 's' },
      { color: 'B', fiveElements: 't', index: 5, num: 36, oddEven: 'e', shengxiao: '马', size: 'b' },
      { color: 'B', fiveElements: 'h', index: 6, num: 47, oddEven: 'o', shengxiao: '羊', size: 'b' },
      { color: 'G', fiveElements: 't', index: 7, num: 5, oddEven: 'o', shengxiao: '牛', size: 's' }
    ],
    lastYear: 2025,
    nextCompleteIssue: 2025157,
    nextOpenTime: '2025-06-06 21:32:32',
    nextPeriod: 157,
    nextShortIssue: '157',
    nextYear: 2025
  },
  {
    gameType: '1',
    gameTypeShortName: '港彩',
    gameTypeName: '港彩',
    gameTypeLongName: '香港六合彩',
    areaCode: 'HKG',
    classifier: 'official',
    sortNum: 4,
    gameTypeCode: 'hk6',
    status: 'y',
    createTime: 1740622859000,
    updateTime: 1740622859000,
    currentCompleteIssue: 62,
    currentIssue: '62',
    currentPeriod: 62,
    currentResult: [
      { color: 'G', fiveElements: 'h', index: 1, num: 39, oddEven: 'o', shengxiao: '兔', size: 'b' },
      { color: 'G', fiveElements: 's', index: 2, num: 22, oddEven: 'e', shengxiao: '猴', size: 's' },
      { color: 'R', fiveElements: 'h', index: 3, num: 18, oddEven: 'e', shengxiao: '鼠', size: 's' },
      { color: 'G', fiveElements: 'j', index: 4, num: 33, oddEven: 'o', shengxiao: '鸡', size: 'b' },
      { color: 'R', fiveElements: 'm', index: 5, num: 24, oddEven: 'e', shengxiao: '马', size: 's' },
      { color: 'G', fiveElements: 's', index: 6, num: 44, oddEven: 'e', shengxiao: '狗', size: 'b' },
      { color: 'B', fiveElements: 'j', index: 7, num: 3, oddEven: 'o', shengxiao: '兔', size: 's' }
    ],
    currentYear: 2025,
    data: {
      lotteryTime: '2025-06-07 21:30:00',
      nextLotteryNumber: '063',
      nextLotteryTimestamp: 1749299400000,
      originalDataList: ['39', '22', '18', '33', '24', '44', '03'],
      period: '062'
    },
    lastIssue: 62,
    lastResult: [
      { color: 'G', fiveElements: 'h', index: 1, num: 39, oddEven: 'o', shengxiao: '兔', size: 'b' },
      { color: 'G', fiveElements: 's', index: 2, num: 22, oddEven: 'e', shengxiao: '猴', size: 's' },
      { color: 'R', fiveElements: 'h', index: 3, num: 18, oddEven: 'e', shengxiao: '鼠', size: 's' },
      { color: 'G', fiveElements: 'j', index: 4, num: 33, oddEven: 'o', shengxiao: '鸡', size: 'b' },
      { color: 'R', fiveElements: 'm', index: 5, num: 24, oddEven: 'e', shengxiao: '马', size: 's' },
      { color: 'G', fiveElements: 's', index: 6, num: 44, oddEven: 'e', shengxiao: '狗', size: 'b' },
      { color: 'B', fiveElements: 'j', index: 7, num: 3, oddEven: 'o', shengxiao: '兔', size: 's' }
    ],
    lastYear: 2025,
    nextCompleteIssue: 63,
    nextIssue: '62',
    nextOpenTime: '2025-06-07 21:30:00',
    nextPeriod: 63,
    nextShortIssue: '063',
    nextYear: 2025
  },
  {
    gameType: '6',
    gameTypeShortName: '快乐8',
    gameTypeName: '快乐8',
    gameTypeLongName: '快乐8',
    areaCode: 'MAC1',
    classifier: 'official',
    sortNum: 3,
    gameTypeCode: 'kl8',
    status: 'y',
    createTime: 1740461165000,
    updateTime: 1740461165000,
    currentCompleteIssue: 2025146,
    currentIssue: '2025146',
    currentPeriod: 146,
    currentResult: [
      { color: 'G', fiveElements: 'h', index: 1, num: 17, oddEven: 'o', shengxiao: '牛', size: 's' },
      { color: 'R', fiveElements: 'j', index: 2, num: 12, oddEven: 'e', shengxiao: '马', size: 's' },
      { color: 'B', fiveElements: 'h', index: 3, num: 10, oddEven: 'e', shengxiao: '猴', size: 's' },
      { color: 'G', fiveElements: 'j', index: 4, num: 33, oddEven: 'o', shengxiao: '鸡', size: 'b' },
      { color: 'G', fiveElements: 't', index: 5, num: 28, oddEven: 'e', shengxiao: '虎', size: 'b' },
      { color: 'R', fiveElements: 'm', index: 6, num: 46, oddEven: 'e', shengxiao: '猴', size: 'b' },
      { color: 'G', fiveElements: 's', index: 7, num: 22, oddEven: 'e', shengxiao: '猴', size: 's' }
    ],
    currentYear: 2025,
    data: {
      lotteryTime: '2025-06-06 21:30:00',
      nextLotteryNumber: '147',
      nextLotteryTimestamp: 1749213000000,
      originalDataList: ['17', '12', '10', '33', '28', '46', '22'],
      period: '146'
    },
    lastIssue: 2025146,
    lastResult: [
      { color: 'G', fiveElements: 'h', index: 1, num: 17, oddEven: 'o', shengxiao: '牛', size: 's' },
      { color: 'R', fiveElements: 'j', index: 2, num: 12, oddEven: 'e', shengxiao: '马', size: 's' },
      { color: 'B', fiveElements: 'h', index: 3, num: 10, oddEven: 'e', shengxiao: '猴', size: 's' },
      { color: 'G', fiveElements: 'j', index: 4, num: 33, oddEven: 'o', shengxiao: '鸡', size: 'b' },
      { color: 'G', fiveElements: 't', index: 5, num: 28, oddEven: 'e', shengxiao: '虎', size: 'b' },
      { color: 'R', fiveElements: 'm', index: 6, num: 46, oddEven: 'e', shengxiao: '猴', size: 'b' },
      { color: 'G', fiveElements: 's', index: 7, num: 22, oddEven: 'e', shengxiao: '猴', size: 's' }
    ],
    lastYear: 2025,
    nextCompleteIssue: 2025147,
    nextIssue: '145',
    nextOpenTime: '2025-06-06 21:30:00',
    nextPeriod: 147,
    nextShortIssue: '147',
    nextYear: 2025
  },
  {
    gameType: '5',
    gameTypeShortName: '新澳彩',
    gameTypeName: '新澳彩',
    gameTypeLongName: '新澳门六合彩',
    areaCode: 'NMAC',
    classifier: 'official',
    sortNum: 2,
    gameTypeCode: 'xa6',
    status: 'y',
    createTime: 1740461173000,
    updateTime: 1740461173000,
    currentCompleteIssue: 2025156,
    currentIssue: '2025156',
    currentPeriod: 156,
    currentResult: [
      { color: 'B', fiveElements: 'm', index: 1, num: 15, oddEven: 'o', shengxiao: '兔', size: 's' },
      { color: 'R', fiveElements: 's', index: 2, num: 13, oddEven: 'o', shengxiao: '蛇', size: 's' },
      { color: 'G', fiveElements: 'm', index: 3, num: 38, oddEven: 'e', shengxiao: '龙', size: 'b' },
      { color: 'G', fiveElements: 'h', index: 4, num: 17, oddEven: 'o', shengxiao: '牛', size: 's' },
      { color: 'G', fiveElements: 't', index: 5, num: 28, oddEven: 'e', shengxiao: '虎', size: 'b' },
      { color: 'G', fiveElements: 'h', index: 6, num: 32, oddEven: 'e', shengxiao: '狗', size: 'b' },
      { color: 'R', fiveElements: 'h', index: 7, num: 18, oddEven: 'e', shengxiao: '鼠', size: 's' }
    ],
    currentYear: 2025,
    data: { originalDataList: [] },
    k: '2025156,15,13,38,17,28,32,18,2025157,06,06,五,21点32分',
    lastIssue: 2025156,
    lastResult: [
      { color: 'B', fiveElements: 'm', index: 1, num: 15, oddEven: 'o', shengxiao: '兔', size: 's' },
      { color: 'R', fiveElements: 's', index: 2, num: 13, oddEven: 'o', shengxiao: '蛇', size: 's' },
      { color: 'G', fiveElements: 'm', index: 3, num: 38, oddEven: 'e', shengxiao: '龙', size: 'b' },
      { color: 'G', fiveElements: 'h', index: 4, num: 17, oddEven: 'o', shengxiao: '牛', size: 's' },
      { color: 'G', fiveElements: 't', index: 5, num: 28, oddEven: 'e', shengxiao: '虎', size: 'b' },
      { color: 'G', fiveElements: 'h', index: 6, num: 32, oddEven: 'e', shengxiao: '狗', size: 'b' },
      { color: 'R', fiveElements: 'h', index: 7, num: 18, oddEven: 'e', shengxiao: '鼠', size: 's' }
    ],
    lastYear: 2025,
    nextCompleteIssue: 2025157,
    nextOpenTime: '2025-06-06 21:32:32',
    nextPeriod: 157,
    nextShortIssue: '157',
    nextYear: 2025
  }
])

// const data = ref({
//   model: 's1' as 's1' | 's2' | 's3',
//   isHistory: false,
//   isNextIssue: false,
//   isIssue: true,
//   isIcon: true,
//   isLongName: false,
//   isGifAd: false,
//   noTab: false,
//   showArray: ['2032', '1', '84', '5', '3995']
// })
</script>

<template>
  <div class="gameresultbox">
    <div class="gameresultbox-content">
      <div class="game-result" data-id="game-result">
        <!-- Model 1 的渲染内容 -->
        <GameResultModel1
          v-if="props.datas.configParamJson.model === 's1'"
          :tabsData="rawTabsData"
          :datas="props.datas"
        />

        <!-- Model 2 的渲染内容 -->
        <!-- <GameResultModel2
          v-else-if="props.datas.configParamJson.model === 's2'"
          :tabsData="props.tabsData"
          :data="props.data"
        /> -->

        <!-- Model 3 的渲染内容 -->
        <GameResultModel3
          v-if="props.datas.configParamJson.model === 's3'"
          :tabsData="rawTabsData"
          :datas="props.datas"
        />
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style lang="scss" scoped>
.gameresultbox {
  position: relative;
  --theme-color: #5e9525;
}

.gameresultbox-content {
  min-height: 50px;
}

.game-result {
  margin: 1px 0;
}
</style>
