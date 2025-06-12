<script setup lang="ts" name="LotteryRiddleSolution">
import type { IDatas, RiddleItem } from './type'

interface IProps {
  datas: IDatas
}
const props = withDefaults(defineProps<IProps>(), {})

const isHighlighted = (zodiac: string, item: RiddleItem) => {
  return item.highlightZodiacs.includes(zodiac)
}
</script>

<template>
  <div class="solution-wrapper">
    <div class="header">
      <span class="main-title">{{ datas.configParamJson.mainTitle }}</span>
      <span class="sub-title">【{{ datas.configParamJson.subTitle }}】</span>
    </div>
    <div class="content">
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
    </div>
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
