<script setup lang="ts" name="LotteryRiddleSolution">
import type { IDatas, ILinkItem, IRiddleItem } from './type'
import { useIssueList, type IProcessedIssueItem } from '../hooks/issueList'
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { useStore } from '@nanostores/vue'
import { gameStore } from '../store/index'
import service from '../service/index'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()
const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)

// 创建响应式参数对象
const issueParams = reactive({
  gameType: gameType.value,
  size: Number(props.datas.configParamJson.size),
  forumId: String(props.datas.configParamJson.forumId)
})

// 使用 hooks
const { processedIssueList, isLoading, hasError, extractIssueNumber, getHitNumber, getNumberColorClass } =
  useIssueList(issueParams)

// 监听 props 变化，更新响应式参数
watch(
  () => [props.datas.configParamJson.size, props.datas.configParamJson.forumId, gameType.value],
  ([newSize, newForumId], [oldSize, oldForumId]) => {
    console.log('🚀 ~ 参数变化:', [newSize, newForumId])
    issueParams.size = Number(newSize)
    issueParams.forumId = String(newForumId)
    issueParams.gameType = gameType.value
  }
)

watch(
  () => processedIssueList.value,
  (newVal) => {
    props.datas.configParamJson.links = newVal as ILinkItem[]
    // const tempLinks = props.datas.configParamJson.links
    // if (newVal.length > 0) {
    //   props.datas.configParamJson.links = newVal.map((item) => {
    //     const currentLink = tempLinks.find((link) => link.postId === item.postId)
    //     if (currentLink) {
    //       return {
    //         ...item,
    //         title: currentLink.title,
    //         _title: item.title,
    //         link: currentLink.link
    //       }
    //     } else {
    //       return {
    //         ...item,
    //         _title: item.title,
    //         link: '/detail/' + item.postUserId
    //       }
    //     }
    //   })
    // }
  },
  { immediate: true }
)

const gameTypeCode = computed(() => gameStoreData.value.gameTypeCode)
const year = computed(() => gameStoreData.value.year)

const getIssueNumber = computed(() => props.datas?.configParamJson?.getIssueNumber || 5)

// 样式计算属性
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

const titleHeaderStyle = computed(() => {
  if (styleHeader.value.isGradient) {
    return {
      background: `linear-gradient(to right, ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  } else {
    return {
      backgroundColor: styleHeader.value?.headerBgColor || '#4caf50'
    }
  }
})

const mainTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.titleColor || '#ffffff'
  }
})

const subTitleStyle = computed(() => {
  return {
    color: styleHeader.value?.subTitleColor || '#ffffff'
  }
})

const containerStyle = computed(() => {
  return {
    borderRadius: `${styleMain.value?.borderRadius || 0}px`,
    padding: `${styleMain.value?.padding || 0}px`
  }
})

const getRiddleText = (item: any) => {
  // 164 ≤丈夫双泪不轻弹,带着铃铛去做贼≥
  // 163 ≤看见八钱散发打,七九相连三一走≥
  // 162 ≤船到桥头自会直,摇头不算点头算≥
  // 160 ≤四头连旺暴今期,得饶人处且饶人≥
  // 159 ≤一唱雄鸡天下白,白手起家從零起≥
  // 158 ≤真金不怕火来烧,不见棺材不落泪≥

  switch (String(item.issue)) {
    case year.value + '164':
      return '丈夫双泪不轻弹,带着铃铛去做贼'
    case year.value + '163':
      return '看见八钱散发打,七九相连三一走'
    case year.value + '162':
      return '船到桥头自会直,摇头不算点头算'
    case year.value + '160':
      return '四头连旺暴今期,得饶人处且饶人'
    case year.value + '159':
      return '一唱雄鸡天下白,白手起家從零起'
    case year.value + '158':
      return '真金不怕火来烧,不见棺材不落泪'
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

const getSizeText = (size: string | undefined) => {
  if (!size) return ''
  return size === 'b' ? '大数' : '小数'
}
</script>

<template>
  <div class="LotteryRiddleSolution">
    <div class="lottery-riddle-solution" :style="containerStyle">
      <!-- 标题区域 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">
          {{ datas.configParamJson.title }}
        </h2>
        <span class="sub-title" :style="subTitleStyle">
          {{ datas.configParamJson.subtitle }}
        </span>
      </div>

      <!-- 内容区域 -->
      <div
        class="lottery-riddle-solution__content"
        :style="{
          padding: `${datas.configParamJson.listStyleJSON.containerPadding}px`
        }"
      >
        <div class="lottery-riddle-solution__items">
          {{ props.datas.configParamJson.links }}
          <div
            v-for="(item, index) in props.datas.configParamJson.links"
            :key="index"
            class="lottery-riddle-solution__item"
            :style="{
              backgroundColor: datas.configParamJson.listStyleJSON.itemBackgroundColor,
              color: datas.configParamJson.listStyleJSON.itemTextColor,
              padding: `${datas.configParamJson.listStyleJSON.itemPadding}px`,
              borderRadius: `${datas.configParamJson.listStyleJSON.itemBorderRadius}px`,
              border: `${datas.configParamJson.listStyleJSON.itemBorderWidth}px solid ${datas.configParamJson.listStyleJSON.itemBorderColor}`,
              marginBottom: `${datas.configParamJson.listStyleJSON.itemSpacing}px`
            }"
          >
            <div class="item-header">
              <span>
                {{ item.issueShort || item.issue }}期:
                {{ datas.configParamJson.subTitle || datas.configParamJson.subtitle }}
              </span>
              <span
                v-if="item.type === 'next'"
                class="result-text"
                :style="{ color: datas.configParamJson.listStyleJSON.resultTextColor }"
              >
                开
                <span class="result-number">? 00</span>
                准
              </span>
              <span
                v-else-if="item.result"
                class="result-text"
                :style="{ color: datas.configParamJson.listStyleJSON.resultTextColor }"
              >
                开
                <span class="result-number">{{ getZodiacFromTeNum(item) }}{{ item.result.split(',')[6] }}</span>
                准
              </span>
            </div>
            <div class="riddle-text" :style="{ color: datas.configParamJson.listStyleJSON.riddleTextColor }">
              ≤{{ getRiddleText(item) }}≥
            </div>
            <div class="answer-text" :style="{ color: datas.configParamJson.listStyleJSON.answerTextColor }">
              本期谜底：（{{ getZodiacFromTeNum(item) }}）送：{{ getSizeText(item.totalSize) }}
            </div>
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

.lottery-riddle-solution {
  overflow: hidden;
  font-family: 'SimSun', '宋体', sans-serif;
  position: relative;
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

.lottery-riddle-solution__content {
  background: #fff;
  min-height: 20px;
}

.lottery-riddle-solution__items {
  width: 100%;
}

.lottery-riddle-solution__item {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    margin-bottom: 8px;

    .result-text {
      font-weight: bold;

      .result-number {
        color: #f44336;
        font-weight: bold;
      }
    }
  }

  .riddle-text {
    font-size: 16px;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .answer-text {
    font-size: 16px;
    line-height: 1.4;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .lottery-riddle-solution__item {
    .item-header {
      font-size: 14px;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .riddle-text,
    .answer-text {
      font-size: 14px;
    }
  }
}

@media (max-width: 480px) {
  .title-header {
    padding: 8px 12px;

    .main-title {
      font-size: 16px;
    }

    .sub-title {
      font-size: 12px;
    }
  }

  .lottery-riddle-solution__item {
    .item-header {
      font-size: 13px;
    }

    .riddle-text,
    .answer-text {
      font-size: 13px;
    }
  }
}
</style>
