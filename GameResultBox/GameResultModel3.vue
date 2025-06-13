<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import dayjs from 'dayjs'
import LotteryBallDisplayNoAdd3 from './LotteryBallDisplayNoAdd3.vue'
import { Image as VanImage } from 'vant'
import { type GameIconKeys } from './type'
import am from './assets/country/am.png'
import tw from './assets/country/tw-96.png'
import xg from './assets/country/xg.png'
import xjp from './assets/country/xjp-96.png'
console.log('🚀 ~ xjp:', xjp)
const display = import.meta.env.PUBLIC_DISPLAY
console.log('🚀 ~ display:', display)

const GAME_ICONS = {
  '3995': display ? xjp.src : xjp,
  '2032': display ? am.src : am,
  '1': display ? xg.src : xg,
  '84': display ? tw.src : tw,
  '5': display ? am.src : am,
  '6': display ? tw.src : tw
}

import { type GameResultType } from './index.vue'

interface IProps {
  data: GameResultType
  tabsData: Record<string, any>
}

const props = defineProps<IProps>()
console.log('🚀 ~ props1111111 data:', props.data)
console.log('🚀 ~ props1111111 tabsData:', props.tabsData)

// const props = defineProps({
//   data: {
//     type: Object as () => GameResultType,
//     required: true
//   },
//   tabsData: {
//     type: Object,
//     required: true
//   }
// })

const truncateString = (str: string): string => {
  let newStr = str.toString()
  if (newStr.length > 4) {
    return newStr.slice(4)
  }
  return newStr
}

// console.log("props", props);
// const GameData = ref([]);

// console.log("GAME_DATA_ALL", GameData);

const tabsData = computed(() => {
  const baseData = props.tabsData

  if (!props.data.showArray?.length) {
    return baseData
  }

  return baseData.filter((item: any) => props.data.showArray?.some((gameType) => gameType === item.gameType))
})

const nowTime = ref(dayjs().format('HH:mm:ss'))
// console.log('GAME_DATA_ALL', GAME_DATA_ALL);
// console.log('tabsData', tabsData.value);
// const selectedTab = ref(0);

const tabIndex = ref(0)
function selectTab(index: number) {
  // console.log('index', index);
  tabIndex.value = index
  // gameDataStore.set({
  //   tabIndex: index,
  //   gameType: props.tabsData[index].gameType,
  //   gameTypeCode: props.tabsData[index].gameTypeCode
  // })
  // console.log("gameDataStore", gameDataStore.get());
}

const currentTime = ref('')

onMounted(() => {
  const interval = setInterval(() => {
    nowTime.value = dayjs().format('HH:mm:ss')
  }, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

console.log('props.data', props.data)

// watch([() => props.tabIndex], ([newIndex]) => {
//   selectedTab.value = newIndex;
// });
</script>
<template>
  <div class="tabs">
    <div class="tab-headers" v-if="!data.noTab">
      <div
        v-for="(tab, index) in tabsData"
        :key="index"
        :class="['tab-header', { active: tabIndex === index }]"
        @click="selectTab(index)"
      >
        <h4>
          <van-image width="24" v-if="data.isIcon" :src="GAME_ICONS[tab.gameType as GameIconKeys]" />
          {{ data.isLongName ? tab.gameTypeLongName : tab.gameTypeShortName }}
        </h4>
      </div>
    </div>
    <div class="tab-content" v-if="tabsData[tabIndex]">
      <div class="tab-content-top">
        <div>
          <p>
            第
            <span>{{ truncateString(tabsData[tabIndex].currentIssue) }}</span>
            期开奖结果
          </p>
        </div>

        <div class="tab-content-top-time">
          <h5>{{ nowTime }}</h5>
        </div>
      </div>
      <LotteryBallDisplayNoAdd3 :currentResult="tabsData[tabIndex].currentResult" />
      <div class="tab-content-bottom">
        <p v-if="data.isNextIssue">{{ tabsData[tabIndex].nextIssue }}</p>
        <a v-if="data.isHistory" href="/lottery">历史记录</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: var(--theme-color);
}
.tabs {
  margin: 0.1rem 0;
  background-color: #eee;
  display: flex;
  flex-direction: column;
}
.tab-headers {
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
}
.tab-header {
  padding: 3px 0;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border-bottom: 2px solid transparent; */
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  background-color: #fff;
  flex: 1;
  h4 {
    display: flex;
    align-items: center;
    font-size: 1rem;
  }
  p {
    font-size: 0.75rem;
    line-height: normal;
  }
}
.active {
  /* border-bottom: 2px solid #000; */
  color: #fff;
  background: var(--theme-color);
  h4 {
    color: #fff;
  }
}

.tab-content {
  padding: 0.3rem;
  background-image: none;
  border: 0.02rem solid var(--theme-color);
  background-color: #f5f5f5;
  box-shadow: 0.04rem 0.04rem 0.1rem #eee;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .tab-content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    div > h5 {
      font-size: 1.2rem;
      background: var(--theme-color);
      color: #fff;
      padding: 0.1rem 0.5rem;
      border-radius: 5px;
    }
    div > p > span {
      color: var(--theme-color);
    }
    div > a > img {
      height: 1.5rem;
    }
  }
  .tab-content-middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab-content-middle-left {
      display: flex;
    }
    .tab-content-middle-center {
      display: flex;
      font-size: 1.3rem;
    }
    .tab-content-middle-right {
      display: flex;
    }
  }
  .tab-content-bottom {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    p {
      color: var(--theme-color);
    }
  }
}

.tab-content-top-time {
  color: var(--theme-color);
}
</style>
