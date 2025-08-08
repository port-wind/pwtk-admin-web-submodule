<script setup lang="ts">
import { ref, computed } from 'vue'
import LotteryBallDisplayNoAdd1 from './LotteryBallDisplayNoAdd1.vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
  tabsData: Record<string, any>[]
}

const props = defineProps<IProps>()
const activeTab = ref('xa6')

const macauData = computed(() => {
  return props.tabsData.find((item) => item.gameType === '5')
})

const hkData = computed(() => {
  return props.tabsData.find((item) => item.gameType === '1')
})

const handleUpdate = () => {
  window.location.reload()
}

const getBallColorClass = (item: any) => {
  return {
    'ball-red': item.color === 'red',
    'ball-green': item.color === 'green',
    'ball-blue': item.color === 'blue'
  }
}
</script>

<template>
  <div class="lottery-result">
    <!-- 标签切换 -->
    <div class="tab-header">
      <div class="tab-item" :class="{ active: activeTab === 'xa6' }" @click="activeTab = 'xa6'">新澳门⑥彩资料</div>
      <div class="tab-item" :class="{ active: activeTab === 'hk6' }" @click="activeTab = 'hk6'">香港⑥彩资料</div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- 新澳门内容 -->
      <div v-show="activeTab === 'xa6'" class="lottery-content">
        <div class="header">
          <div class="title">
            新澳门⑥彩
            <span class="issue">{{ macauData?.currentIssue }}</span>
            期
          </div>
          <div class="action-buttons">
            <button class="btn btn-outline">搅珠记录</button>
            <button class="btn btn-primary" @click="handleUpdate">刷新</button>
            <button class="btn btn-live">直播</button>
          </div>
        </div>
        <div class="lottery-display">
          <div class="lottery-numbers">
            <LotteryBallDisplayNoAdd1 :noFiveElements="true" :currentResult="macauData?.currentResult" />
            <!-- <template v-for="(item, index) in macauData?.currentResult" :key="index">
              <div class="lottery-ball" :class="getBallColorClass(item)">
                <span class="number">{{ item.number }}</span>
                <span class="zodiac">{{ item.zodiac }}</span>
              </div>
            </template> -->
          </div>
        </div>
        <div class="footer">
          <span class="next-draw">下期({{ macauData?.nextIssue }})开奖: {{ macauData?.nextDrawTime }}</span>
        </div>
      </div>

      <!-- 香港内容 -->
      <div v-show="activeTab === 'hk6'" class="lottery-content">
        <div class="header">
          <div class="title">
            香港⑥彩
            <span class="issue">{{ hkData?.currentIssue }}</span>
            期
          </div>
          <div class="action-buttons">
            <button class="btn btn-outline">搅珠记录</button>
            <button class="btn btn-primary" @click="handleUpdate">刷新</button>
            <button class="btn btn-live">直播</button>
          </div>
        </div>
        <div class="lottery-display">
          <div class="lottery-numbers">
            <LotteryBallDisplayNoAdd1 :noFiveElements="true" :currentResult="hkData?.currentResult" />
          </div>
        </div>
        <div class="footer">
          <span class="next-draw">下期({{ hkData?.nextIssue }})开奖: {{ hkData?.nextDrawTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lottery-result {
  background: #f7f7f7;
  border-radius: 4px;
  overflow: hidden;
}

.tab-header {
  display: flex;
  background: #f5f5f5;

  .tab-item {
    font-family: 'Microsoft YaHei', Helvetica, sans-serif;
    flex: 1;
    text-align: center;
    padding: 4px;
    font-size: 18px;
    font-weight: bold;
    color: black;
    cursor: pointer;

    &.active {
      // color: #;
      background: #fff;
    }
  }
}

.content-area {
  padding: 0;

  .lottery-content {
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0;

      .title {
        font-family: 'Microsoft YaHei';
        font-size: 14px;
        color: #333;

        .issue {
          font-size: 16px;
          color: red;
        }
      }

      .action-buttons {
        display: flex;
        gap: 8px;

        .btn {
          height: 24px;
          padding: 0 8px;
          border-radius: 2px;
          font-size: 12px;
          border: none;
          cursor: pointer;

          &.btn-outline {
            border: 1px solid #ddd;
            background: #fff;
            color: #666;
          }

          &.btn-primary {
            background: #ff4d4f;
            color: #fff;
          }

          &.btn-live {
            background: #52c41a;
            color: #fff;
          }
        }
      }
    }

    .lottery-display {
      background: #fbfafb;
      border-bottom: 1px solid #e5e5e5;
      border-top: 1px solid #e5e5e5;
      .lottery-numbers {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;

        .lottery-ball {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 28px;

          .number {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: bold;
            font-size: 15px;
          }

          .zodiac {
            margin-top: 1px;
            font-size: 12px;
            color: #333;
          }

          &.ball-red .number {
            background: #f5222d;
          }

          &.ball-green .number {
            background: #52c41a;
          }

          &.ball-blue .number {
            background: #1890ff;
          }
        }

        .separator {
          color: #999;
          font-size: 18px;
          padding: 0 2px;
          font-weight: normal;
        }
      }
    }

    .footer {
      text-align: center;
      .next-draw {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
