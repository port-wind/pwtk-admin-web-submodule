<script setup lang="ts">
// ! CSR
import { ref, onMounted, onUnmounted, computed } from 'vue'
import dayjs from 'dayjs'
import LotteryBallDisplayNoAdd from './LotteryBallDisplayNoAdd.vue'
import { changeGameType } from '../store/index'
import { Button as VanButton, Image as VanImage } from 'vant'
import type { GameIconKeys, IDatas } from './type'

import { gameStore } from '../store/index'
import { useStore } from '@nanostores/vue'

const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)
const currentGame = computed(() => gameStoreData.value.currentGame)
const gameTypeList = computed(() => gameStoreData.value.gameTypeList)

import am from '../assets/country/am.png'
import tw from '../assets/country/tw-96.png'
import xg from '../assets/country/xg.png'
import xjp from '../assets/country/xjp-96.png'
import kl8 from '../assets/country/kl8.png'
import type { IGameType } from '../store/gameStore'

const display = import.meta.env.PUBLIC_DISPLAY

interface IProps {
  datas: IDatas
  tabsData: Record<string, any>
}

const props = defineProps<IProps>()

// 彩种图标 特殊处理 display 为 true 时，使用 src 属性，否则使用图片路径
const GAME_ICONS = {
  '3995': display ? xjp.src : xjp,
  '2032': display ? am.src : am,
  '1': display ? xg.src : xg,
  '84': display ? tw.src : tw,
  '5': display ? am.src : am,
  '6': display ? kl8.src : kl8
}

const truncateString = (str: string): string => {
  let newStr = str.toString()
  if (newStr.length > 4) {
    return newStr.slice(4)
  }
  return newStr
}

const emits = defineEmits(['update-issue'])
// const GAME_DATA_ALL = JSON.parse(utils.getSession(constants.sessionStorageKeys.GAME_DATA_ALL) || '[]');

// const tabsData = ref<GAME_DATA_ALL[]>(GAME_DATA_ALL);

const tabsData = computed(() => {
  const baseData = props.tabsData

  if (!props.datas.configParamJson.showArray?.length) {
    return baseData
  }

  return baseData.filter((item: any) =>
    props.datas.configParamJson.showArray?.some((gameType) => gameType === item.gameType)
  )
})
// console.log('GAME_DATA_ALL', GAME_DATA_ALL);
// console.log('tabsData', tabsData.value);
// const selectedTab = ref(0);
const tabIndex = ref(0)

function selectGameType(currentGame: IGameType, index) {
  tabIndex.value = index
  changeGameType(currentGame.gameType, currentGame.gameTypeCode)
}

function selectTab(index: number) {
  // console.log('index', index);
  tabIndex.value = index
  changeGameType(props.tabsData[index].gameType, props.tabsData[index].gameTypeCode)
  // gameDataStore.set({
  //   tabIndex: index,
  //   gameType: props.tabsData[index].gameType,
  //   gameTypeCode: props.tabsData[index].gameTypeCode
  // })
  // window.myGlobalProxy.tabIndex = index;
  // window.myGlobalProxy.gameType = tabsData.value[index].gameType;
  // window.myGlobalProxy.gameTypeCode = tabsData.value[index].gameTypeCode;
  // console.log('window.myGlobalProxy', window.myGlobalProxy);
  // utils.setSession(constants.sessionStorageKeys.TAB_INDEX, index);
  // utils.setSession(constants.sessionStorageKeys.GAME_TYPE_CODE, tabsData.value[index].gameTypeCode);
  // utils.setSession(constants.sessionStorageKeys.GAME_TYPE, tabsData.value[index].gameType);
}

const handleUpdate = () => {
  // TODO: 刷新 后面补上这个功能
  // emits('update-issue')
  // window.location.reload();
}

function getGameOpenTime(tab: IGameType) {
  const baseData = props.tabsData
  const dd = baseData.find((item: any) =>
    props.datas.configParamJson.showArray?.some((gameType) => gameType === item.gameType)
  )
  return dayjs(dd.currentOpenTime).format('MM月DD日')
}
</script>

<template>
  <div class="tabs">
    <div class="tab-headers">
      <div
        v-if="tabsData.length > 0"
        v-for="(tab, index) in gameTypeList"
        :key="tab.gameType"
        :class="['tab-header', { active: currentGame?.gameType === tab.gameType }]"
        @click="selectGameType(tab, index)"
      >
        <h4>
          <van-image
            width="24"
            v-if="props.datas.configParamJson.isIcon"
            :src="GAME_ICONS[tab.gameType as GameIconKeys]"
          />
          {{ props.datas.configParamJson.isLongName ? tab.gameTypeLongName : tab.gameTypeShortName }}
        </h4>
        <p v-if="props.datas.configParamJson.isOpenTime">
          {{ getGameOpenTime(tab) }}
        </p>
      </div>
    </div>
    <div class="tab-content" v-if="tabsData[tabIndex]">
      <div class="tab-content-top">
        <div class="tab-content-top-p" v-if="props.datas.configParamJson.isIssue">
          <p>
            {{ tabsData[tabIndex].gameTypeShortName }}
            <br />
            <span>{{ truncateString(tabsData[tabIndex].currentIssue) }}</span>
            期
          </p>
          <van-button type="danger" size="mini" @click="handleUpdate">刷新</van-button>
        </div>
        <LotteryBallDisplayNoAdd :currentResult="tabsData[tabIndex].currentResult" />
      </div>
      <div class="tab-content-bottom">
        <p v-if="props.datas.configParamJson.isNextIssue">{{ tabsData[tabIndex].nextIssue }}</p>
        <a v-if="props.datas.configParamJson.isHistory" href="/lottery">历史记录</a>
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

  // background-color: #eee;

  display: flex;
  flex-direction: column;
}
.tab-headers {
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  overflow: hidden;
  // background-color: var(--theme-color);
  border-top-right-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
}
.tab-header {
  padding: 3px 0;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  /* border-bottom: 2px solid transparent; */

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
  padding: 0 0.2rem;
  background-image: none;
  border: 0.02rem solid var(--theme-color);
  background-color: #fff;
  box-shadow: 0.04rem 0.04rem 0.1rem #eee;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .tab-content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    // img {
    //   height: 1.5rem;
    // }
    .tab-content-top-p {
      flex: 1;
      font-size: 0.8rem;
      text-align: center;
    }
    p > span {
      color: var(--theme-color);
    }
  }
  .tab-content-middle {
    flex: 6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-content-middle-left {
      display: flex;
      column-gap: 5px;
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
</style>
