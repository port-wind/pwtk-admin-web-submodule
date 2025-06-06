<script setup lang="ts">
// ! CSR
import { ref, inject, computed } from 'vue'
import { Button as VanButton, Image as VanImage } from 'vant'
// import tabGif from '@/assets/images/home_tab_imgs/gfkj.gif';
// import utils from '@/utils';
// import localStorageKeys from '@/constants/localStorageKeys';
// import { useStore } from 'nanostores/vue';
// import { gameDataStore } from '@/store'
// import type { GAME_DATA_ALL } from '@/types/GameType'
import dayjs from 'dayjs'
import LotteryBallDisplayNoAdd from './LotteryBallDisplayNoAdd.vue'
// import utils from '@/utils';
// import constants from '@/constants';
// import { globalStore } from "@/store";
import { GAME_ICONS, type GameIconKeys } from './type'

import { type GameResultType } from './index.vue'

const props = defineProps({
  data: {
    type: Object as () => GameResultType,
    required: true
  },
  tabsData: {
    type: Object,
    required: true
  }
})

// const game = ref(globalStore.get().game);

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

  if (!props.data?.showArray?.length) {
    return baseData
  }

  return baseData.filter((item: any) => props.data?.showArray?.some((gameType) => gameType === item.gameType))
})
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
  // window.myGlobalProxy.tabIndex = index;
  // window.myGlobalProxy.gameType = tabsData.value[index].gameType;
  // window.myGlobalProxy.gameTypeCode = tabsData.value[index].gameTypeCode;
  // console.log('window.myGlobalProxy', window.myGlobalProxy);
  // utils.setSession(constants.sessionStorageKeys.TAB_INDEX, index);
  // utils.setSession(constants.sessionStorageKeys.GAME_TYPE_CODE, tabsData.value[index].gameTypeCode);
  // utils.setSession(constants.sessionStorageKeys.GAME_TYPE, tabsData.value[index].gameType);
}

const handleUpdate = () => {
  emits('update-issue')
  // window.location.reload();
}
</script>

<template>
  <div class="tabs">
    <div class="tab-headers">
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
        <p>{{ dayjs(tab.currentOpenTime).format('MM月DD日') }}</p>
      </div>
    </div>
    <div class="tab-content" v-if="tabsData[tabIndex]">
      <div class="tab-content-top">
        <div class="tab-content-top-p" v-if="data.isIssue">
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
        <p v-if="data.isNextIssue">{{ tabsData[tabIndex].nextIssue }}</p>
        <a v-if="data.isHistory" href="/lottery">历史记录</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
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
  background: linear-gradient(var(--gradient-direction, 0deg), var(--second-color), var(--theme-color));
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
