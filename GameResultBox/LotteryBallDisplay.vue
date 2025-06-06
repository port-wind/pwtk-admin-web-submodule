<script setup lang="ts">
//   import { ref } from 'vue'
import IconText from './IconText.vue'
import { Icon } from 'vant'
const FiveElements = {
  j: '金',
  m: '木',
  s: '水',
  h: '火',
  t: '土'
}
type BackgroundType = '#07c160' | '#349cfc' | '#fc3434'
const ColorCode: { [key: string]: BackgroundType } = {
  R: '#fc3434',
  G: '#07c160',
  B: '#349cfc'
}

/**
 * 将数字转换为两位数的字符串，如果小于10则在前面补0
 * @param {number} num - 要转换的数字
 * @returns {string} - 转换后的字符串
 */
const padZero = (num: number): string => {
  console.log('🚀 ~ padZero ~ num:', num)
  return num < 10 ? `${num}` : `${num}`
}

const props = defineProps<{
  currentResult: any
  //金木水火土是否显示
  noFiveElements?: boolean
  sortType?: 'asc' | 'desc'
}>()

// console.log('props', props)
</script>

<template>
  <div class="tab-content-middle">
    <div class="tab-content-middle-left">
      <IconText
        v-for="(item, i) in currentResult.slice(0, -1).sort((a: any, b: any) => {
          if (props.sortType === 'asc') {
            return a.num - b.num;
          } else if (props.sortType === 'desc') {
            return b.num - a.num;
          }
          return 0;
        })"
        :key="i"
        :bgColor="ColorCode[item.color]"
        :number="padZero(item.num)"
        :description="
          noFiveElements
            ? item.shengxiao
            : item.shengxiao + '/' + FiveElements[item.fiveElements as keyof typeof FiveElements]
        "
      />
    </div>
    <div class="tab-content-middle-center">
      <Icon name="plus" />
    </div>
    <div class="tab-content-middle-right">
      <IconText
        :bgColor="ColorCode[currentResult[6].color]"
        :number="padZero(currentResult[6].num)"
        :description="
          noFiveElements
            ? currentResult[6].shengxiao
            : currentResult[6].shengxiao +
              '/' +
              FiveElements[currentResult[6].fiveElements as keyof typeof FiveElements]
        "
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
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
</style>
