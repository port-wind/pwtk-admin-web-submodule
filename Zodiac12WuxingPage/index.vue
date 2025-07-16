<script setup lang="ts" name="Zodiac12WuxingPage">
import { computed, onMounted } from 'vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 类型定义
interface ZodiacItem {
  name: string
  image: string
  clash: string
  numbers: string[]
}

interface WuxingItem {
  name: string
  color: string
  numbers: string[]
}

interface WaveColorItem {
  name: string
  color: string
  numbers: string[]
}

interface OddEvenItem {
  name: string
  color: string
  numbers: string[]
}

interface AttributeItem {
  label: string
  animals: string
}

// 生肖数据映射
const zodiacList: ZodiacItem[] = [
  { name: '蛇', image: 'she.gif', clash: '猪', numbers: [] },
  { name: '龙', image: 'long.gif', clash: '狗', numbers: [] },
  { name: '兔', image: 'tu.gif', clash: '鸡', numbers: [] },
  { name: '虎', image: 'hu.gif', clash: '猴', numbers: [] },
  { name: '牛', image: 'niu.gif', clash: '羊', numbers: [] },
  { name: '鼠', image: 'shu.gif', clash: '马', numbers: [] },
  { name: '猪', image: 'zhu.gif', clash: '蛇', numbers: [] },
  { name: '狗', image: 'gou.gif', clash: '龙', numbers: [] },
  { name: '鸡', image: 'ji.gif', clash: '兔', numbers: [] },
  { name: '猴', image: 'hou.gif', clash: '虎', numbers: [] },
  { name: '羊', image: 'yang.gif', clash: '牛', numbers: [] },
  { name: '马', image: 'ma.gif', clash: '鼠', numbers: [] }
]

// 五行数据
const wuxingList: WuxingItem[] = [
  { name: '金', color: '#ffcc00', numbers: [] },
  { name: '木', color: '#33cc33', numbers: [] },
  { name: '水', color: '#3399ff', numbers: [] },
  { name: '火', color: '#ff6600', numbers: [] },
  { name: '土', color: '#cc9900', numbers: [] }
]

// 波色数据
const waveColorList: WaveColorItem[] = [
  { name: '红波', color: '#ff0000', numbers: [] },
  { name: '蓝波', color: '#3366ff', numbers: [] },
  { name: '绿波', color: '#009933', numbers: [] }
]

// 合数单双数据
const oddEvenList: OddEvenItem[] = [
  { name: '合数单', color: '#3366ff', numbers: [] },
  { name: '合数双', color: '#3366ff', numbers: [] }
]

// 生肖属性数据
const zodiacAttributesList: AttributeItem[] = [
  { label: '家禽', animals: '牛、马、羊、鸡、狗、猪' },
  { label: '野兽', animals: '鼠、虎、兔、龙、蛇、猴' },
  { label: '吉美', animals: '兔、龙、蛇、马、羊、鸡' },
  { label: '凶丑', animals: '鼠、牛、虎、猴、狗、猪' },
  { label: '阴性', animals: '鼠、龙、蛇、马、狗、猪' },
  { label: '阳性', animals: '牛、虎、兔、羊、猴、鸡' },
  { label: '单笔', animals: '鼠、龙、马、蛇、鸡、猪' },
  { label: '双笔', animals: '虎、猴、狗、兔、羊、牛' },
  { label: '天肖', animals: '兔、马、猴、猪、牛、龙' },
  { label: '地肖', animals: '蛇、羊、鸡、狗、鼠、虎' },
  { label: '白边', animals: '鼠、牛、虎、鸡、狗、猪' },
  { label: '黑中', animals: '兔、龙、蛇、马、羊、猴' },
  { label: '女肖', animals: '兔、蛇、羊、鸡、猪（五宫肖）' },
  { label: '男肖', animals: '鼠、牛、虎、龙、马、猴、狗' },
  { label: '三合', animals: '鼠龙猴、牛蛇鸡、虎马狗、兔羊猪' },
  { label: '六合', animals: '鼠牛、龙鸡、虎猪、蛇猴、兔狗、马羊' },
  { label: '琴棋书画', animals: '琴：兔蛇鸡　棋：鼠牛狗　书：虎龙马　画：羊猴猪' },
  { label: '五福肖', animals: '鼠、虎、兔、蛇、猴[龙]' },
  { label: '红肖', animals: '马、兔、鼠、鸡' },
  { label: '蓝肖', animals: '蛇、虎、猪、猴' },
  { label: '绿肖', animals: '羊、龙、牛、狗' }
]

// 获取数字颜色类名
const getNumberColorClass = (number: string): string => {
  const num = parseInt(number, 10)
  // 红波
  const redNumbers = [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
  // 蓝波
  const blueNumbers = [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
  // 绿波
  const greenNumbers = [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]

  if (redNumbers.includes(num)) return 'red'
  if (blueNumbers.includes(num)) return 'blue'
  if (greenNumbers.includes(num)) return 'green'
  return ''
}

// 获取图片路径
const getImagePath = (imageName: string) => {
  try {
    return new URL(`./shengxiao/${imageName}`, import.meta.url).href
  } catch (error) {
    console.error('Error loading image:', imageName, error)
    return ''
  }
}

// 图片加载错误处理
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.style.display = 'none'
  }
}

// 初始化数据
const initializeData = () => {
  // 这里应该从API获取数据，现在用模拟数据
  const mockShengXiaoData = {
    蛇: ['01', '13', '25', '37', '49'],
    龙: ['02', '14', '26', '38'],
    兔: ['03', '15', '27', '39'],
    虎: ['04', '16', '28', '40'],
    牛: ['05', '17', '29', '41'],
    鼠: ['06', '18', '30', '42'],
    猪: ['07', '19', '31', '43'],
    狗: ['08', '20', '32', '44'],
    鸡: ['09', '21', '33', '45'],
    猴: ['10', '22', '34', '46'],
    羊: ['11', '23', '35', '47'],
    马: ['12', '24', '36', '48']
  }

  const mockWuxingData = {
    金: ['03', '04', '11', '12', '25', '26', '33', '34', '41', '42'],
    木: ['07', '08', '15', '16', '23', '24', '37', '38', '45', '46'],
    水: ['13', '14', '21', '22', '29', '30', '43', '44'],
    火: ['01', '02', '09', '10', '17', '18', '31', '32', '39', '40', '47', '48'],
    土: ['05', '06', '19', '20', '27', '28', '35', '36', '49']
  }

  const mockWaveData = {
    红波: ['01', '02', '07', '08', '12', '13', '18', '19', '23', '24', '29', '30', '34', '35', '40', '45', '46'],
    蓝波: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48'],
    绿波: ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49']
  }

  const mockOddEvenData = {
    合数单: [
      '01',
      '03',
      '05',
      '07',
      '09',
      '10',
      '12',
      '14',
      '16',
      '18',
      '21',
      '23',
      '25',
      '27',
      '29',
      '30',
      '32',
      '34',
      '36',
      '38',
      '41',
      '43',
      '45',
      '47',
      '49'
    ],
    合数双: [
      '02',
      '04',
      '06',
      '08',
      '11',
      '13',
      '15',
      '17',
      '19',
      '20',
      '22',
      '24',
      '26',
      '28',
      '31',
      '33',
      '35',
      '37',
      '39',
      '40',
      '42',
      '44',
      '46',
      '48'
    ]
  }

  // 填充生肖数据
  zodiacList.forEach((zodiac) => {
    zodiac.numbers = mockShengXiaoData[zodiac.name as keyof typeof mockShengXiaoData] || []
  })

  // 填充五行数据
  wuxingList.forEach((wuxing) => {
    wuxing.numbers = mockWuxingData[wuxing.name as keyof typeof mockWuxingData] || []
  })

  // 填充波色数据
  waveColorList.forEach((wave) => {
    wave.numbers = mockWaveData[wave.name as keyof typeof mockWaveData] || []
  })

  // 填充合数单双数据
  oddEvenList.forEach((item) => {
    item.numbers = mockOddEvenData[item.name as keyof typeof mockOddEvenData] || []
  })
}

// 计算样式
const containerStyle = computed(() => ({
  backgroundColor: props.datas.configParamJson.styleMain?.backgroundColor || '#edeff0',
  padding: `${props.datas.configParamJson.styleMain?.padding || 8}px`
}))

const headerStyle = computed(() => {
  const header = props.datas.configParamJson.styleHeader
  if (header?.isGradient) {
    return {
      background: `linear-gradient(to right, ${header.headerBg || '#d11717'}, ${header.headerBg2 || '#d12525'})`
    }
  }
  return {
    backgroundColor: header?.headerBgColor || '#d11717'
  }
})

onMounted(() => {
  initializeData()
})
</script>

<template>
  <div class="sxsx p-all" :style="containerStyle" v-if="datas.configParamJson.enable">
    <div class="bg br-12">
      <div class="pb-head sxsx-head" :style="headerStyle">
        <div class="pb-tit sxsx-tit">
          {{ datas.configParamJson.title || '香港赛马会【2025生肖属性】' }}
        </div>
      </div>
      <div class="sxsx-content br-12">
        <div class="sx">
          <!-- 生肖号码对照表 -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <th style="text-align: center">2025蛇年（十二生肖号码对照）</th>
              </tr>
              <tr>
                <td>
                  <ul class="sx1 clearfix">
                    <li v-for="zodiac in zodiacList" :key="zodiac.name">
                      <dl>
                        <dt>
                          {{ zodiac.name }}
                          <img
                            :src="getImagePath(zodiac.image)"
                            width="40"
                            height="40"
                            draggable="false"
                            @error="handleImageError"
                          />
                          [冲 {{ zodiac.clash }}]
                        </dt>
                        <dd :class="zodiac.name === '蛇' ? 'tm01' : ''">
                          <span v-for="number in zodiac.numbers" :key="number" :class="getNumberColorClass(number)">
                            {{ number }}
                          </span>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 五行对照表 -->
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
              <col width="50" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" style="text-align: center">五行对照</th>
              </tr>
              <tr v-for="wuxing in wuxingList" :key="wuxing.name">
                <td align="center">
                  <font :color="wuxing.color">{{ wuxing.name }}</font>
                </td>
                <td class="a-left">
                  <span v-for="number in wuxing.numbers" :key="number" :class="getNumberColorClass(number)">
                    {{ number }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 波色表 -->
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
              <col width="50" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" style="text-align: center">波色</th>
              </tr>
              <tr v-for="wave in waveColorList" :key="wave.name">
                <td align="center">
                  <font :color="wave.color">{{ wave.name }}</font>
                </td>
                <td class="a-left">
                  <span v-for="number in wave.numbers" :key="number" :class="getNumberColorClass(number)">
                    {{ number }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 合数单双表 -->
          <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
              <col width="50" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" style="text-align: center">合数单双</th>
              </tr>
              <tr v-for="item in oddEvenList" :key="item.name">
                <td align="center">
                  <font :color="item.color">{{ item.name }}</font>
                </td>
                <td class="a-left">
                  <span v-for="number in item.numbers" :key="number" :class="getNumberColorClass(number)">
                    {{ number }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 生肖属性表 -->
          <table style="text-align: center" width="100%" cellspacing="0" cellpadding="0" border="0">
            <colgroup>
              <col width="100%" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr>
                <th style="text-align: center">生肖属性</th>
              </tr>
              <tr v-for="attribute in zodiacAttributesList" :key="attribute.label">
                <td>
                  <template v-if="attribute.label === '琴棋书画'">
                    <font color="#3366ff">琴</font>
                    ：兔蛇鸡
                    <font color="#3366ff">棋</font>
                    ：鼠牛狗
                    <font color="#3366ff">书</font>
                    ：虎龙马
                    <font color="#3366ff">画</font>
                    ：羊猴猪
                  </template>
                  <template v-else>
                    <font color="#3366ff">{{ attribute.label }}：</font>
                    {{ attribute.animals }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 必需的删除按钮插槽 -->
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
// 引入原有的CSS样式
.sxsx {
  &.p-all {
    padding: 0 8px 8px 8px;
  }
}

.bg {
  &.br-12 {
    border-radius: 12px;
    overflow: hidden;
  }
}

.pb-head {
  &.sxsx-head {
    padding: 8px 16px 8px 16px;
  }
}

.pb-tit {
  &.sxsx-tit {
    font-size: 22px;
    color: #fff;
    font-weight: 600;
    margin: 0;
    text-align: center;
  }
}

.sxsx-content {
  font-size: 20px;
  background: #fff;
}

.sx {
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    text-align: center;
    color: rgb(229 35 5);
    word-break: break-word;
    margin-bottom: 16px;

    th {
      background: #f5f5f5;
      padding: 12px 8px;
      font-size: 18px;
      font-weight: bold;
      border: 1px solid #e5e5e5;
    }

    td {
      padding: 6px 4px;
      line-height: 22px;
      border: 1px solid #e5e5e5;

      &.a-left {
        text-align: left;
        padding: 8px;
      }

      font {
        font-weight: bold;
      }
    }

    span {
      height: 18px;
      line-height: 18px;
      margin: 0 2px;
      padding: 0 3px;
      font-size: 12px;
      color: #000;
      display: inline-block;
      background-color: #f0f0f0;
      border-radius: 2px;

      &.red {
        background-color: #f00;
        color: #fff;
      }

      &.blue {
        background-color: #3366ff;
        color: #fff;
      }

      &.green {
        background-color: #009933;
        color: #fff;
      }
    }
  }
}

.sx1 {
  display: block;
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    float: left;
    width: 33.333333%;
    padding: 5px 0;
    text-align: center;

    @media (min-width: 320px) and (max-width: 359px) {
      width: 50%;
    }

    @media (min-width: 360px) and (max-width: 374px) {
      width: 50%;
    }

    @media (min-width: 768px) {
      width: 25%;
    }

    dl {
      margin: 0;
      padding: 0;

      dt {
        font-size: 14px;
        margin-bottom: 4px;

        img {
          vertical-align: middle;
          border: 0;
          width: 40px;
          height: 40px;
          display: block;
          margin: 4px auto;
        }
      }

      dd {
        margin: 0;
        padding: 0;

        &.tm01 span {
          @media (min-width: 375px) and (max-width: 392px) {
            margin: 0 1px;
            padding: 0 2px;
          }

          @media (min-width: 393px) and (max-width: 413px) {
            margin: 0 1px;
            padding: 0 2px;
          }
        }
      }
    }
  }
}

.clearfix:after {
  content: '.';
  display: block;
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}

.clearfix {
  /* IE6/7 clearfix hack - replaced with modern clearfix above */
}
</style>
