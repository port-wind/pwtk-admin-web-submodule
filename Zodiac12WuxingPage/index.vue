<script setup lang="ts" name="Zodiac12WuxingPage">
import { useStore } from '@nanostores/vue'

import { computed, reactive, onMounted } from 'vue'
import type { IDatas } from './type'
import { gameStore, getShengXiaoToNumber, getWuXingToNumber, getPlayTypes } from '../store/gameStore'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()
const gameStoreData = useStore(gameStore)
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
const killMap = {
  蛇: '猪',
  龙: '狗',
  兔: '鸡',
  虎: '猴',
  牛: '羊',
  鼠: '马',
  猪: '蛇',
  狗: '龙',
  鸡: '兔',
  猴: '虎',
  羊: '牛',
  马: '鼠'
}

// 生肖图片映射
const zodiacImageMap = {
  蛇: 'she.gif',
  龙: 'long.gif',
  兔: 'tu.gif',
  虎: 'hu.gif',
  牛: 'niu.gif',
  鼠: 'shu.gif',
  猪: 'zhu.gif',
  狗: 'gou.gif',
  鸡: 'ji.gif',
  猴: 'hou.gif',
  羊: 'yang.gif',
  马: 'ma.gif'
}

// 生肖数据映射 - 初始化为空数组，在onMounted中从mockData加载
const zodiacList = reactive<ZodiacItem[]>([])

// 五行颜色映射
const wuxingColorMap = {
  金: '#ffcc00',
  木: '#33cc33',
  水: '#3399ff',
  火: '#ff6600',
  土: '#cc9900'
}

// 五行数据 - 初始化为空数组，在onMounted中从gameStore加载
const wuxingList = reactive<WuxingItem[]>([])

// 波色颜色映射
const waveColorMap = {
  红波: '#ff0000',
  蓝波: '#3366ff',
  绿波: '#009933'
}

// 波色数据 - 初始化为空数组，在onMounted中从gameStore加载
const waveColorList = reactive<WaveColorItem[]>([])

// 合数单双颜色映射
const oddEvenColorMap = {
  合数单: '#3366ff',
  合数双: '#3366ff'
}

// 合数单双数据 - 初始化为空数组，在onMounted中从gameStore加载
const oddEvenList = reactive<OddEvenItem[]>([])

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

// 波色名称到CSS类名的映射
const waveColorToCssClassMap = {
  红波: 'red',
  蓝波: 'blue',
  绿波: 'green'
}

// Vue 3最佳实践：基于动态数据的响应式计算属性
const numberToColorClassMap = computed(() => {
  const map = new Map<string, string>()

  // 基于动态加载的waveColorList构建映射
  waveColorList.forEach((waveColor) => {
    const cssClass = waveColorToCssClassMap[waveColor.name as keyof typeof waveColorToCssClassMap]
    if (cssClass && waveColor.numbers) {
      waveColor.numbers.forEach((number) => {
        map.set(number, cssClass)
      })
    }
  })

  return map
})

// 获取数字颜色类名 - 现在基于动态数据
const getNumberColorClass = (number: string): string => {
  return numberToColorClassMap.value.get(number) || ''
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

// 计算样式
const containerStyle = computed(() => ({
  backgroundColor: props.datas.configParamJson.styleMain?.backgroundColor || '#edeff0',
  padding: `0px`
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

// 加载生肖数据的函数
const loadZodiacData = () => {
  try {
    // 从gameStore的playRules加载生肖数据
    const shengXiaoToNumber = getShengXiaoToNumber()

    if (shengXiaoToNumber && Object.keys(shengXiaoToNumber).length > 0) {
      // 按照playRules中shengXiaoToNumber的键顺序构建zodiacList - Vue 3最佳实践
      const newZodiacData = Object.keys(shengXiaoToNumber).map((zodiacName) => ({
        name: zodiacName,
        image: zodiacImageMap[zodiacName as keyof typeof zodiacImageMap] || `${zodiacName}.gif`,
        clash: killMap[zodiacName as keyof typeof killMap] || '',
        numbers: shengXiaoToNumber[zodiacName]
      }))

      // Vue 3 最佳实践：直接替换数组内容
      Object.assign(zodiacList, newZodiacData)

      console.log('Zodiac data loaded from gameStore playRules:', zodiacList)
    } else {
      console.warn('playRules.shengXiaoToNumber not found, using default data')
      // 如果playRules不存在，使用默认数据作为fallback
      const defaultZodiacData = [
        { name: '蛇', image: 'she.gif', clash: killMap['蛇'], numbers: ['01', '13', '25', '37', '49'] },
        { name: '龙', image: 'long.gif', clash: killMap['龙'], numbers: ['02', '14', '26', '38'] },
        { name: '兔', image: 'tu.gif', clash: killMap['兔'], numbers: ['03', '15', '27', '39'] },
        { name: '虎', image: 'hu.gif', clash: killMap['虎'], numbers: ['04', '16', '28', '40'] },
        { name: '牛', image: 'niu.gif', clash: killMap['牛'], numbers: ['05', '17', '29', '41'] },
        { name: '鼠', image: 'shu.gif', clash: killMap['鼠'], numbers: ['06', '18', '30', '42'] },
        { name: '猪', image: 'zhu.gif', clash: killMap['猪'], numbers: ['07', '19', '31', '43'] },
        { name: '狗', image: 'gou.gif', clash: killMap['狗'], numbers: ['08', '20', '32', '44'] },
        { name: '鸡', image: 'ji.gif', clash: killMap['鸡'], numbers: ['09', '21', '33', '45'] },
        { name: '猴', image: 'hou.gif', clash: killMap['猴'], numbers: ['10', '22', '34', '46'] },
        { name: '羊', image: 'yang.gif', clash: killMap['羊'], numbers: ['11', '23', '35', '47'] },
        { name: '马', image: 'ma.gif', clash: killMap['马'], numbers: ['12', '24', '36', '48'] }
      ]

      Object.assign(zodiacList, defaultZodiacData)
    }
  } catch (error) {
    console.error('Error loading zodiac data:', error)
  }
}

// 加载五行数据的函数
const loadWuxingData = () => {
  try {
    // 从gameStore的playRules加载五行数据
    const wuXingToNumber = getWuXingToNumber()

    if (wuXingToNumber && Object.keys(wuXingToNumber).length > 0) {
      // 按照playRules中wuXingToNumber的键顺序构建wuxingList - Vue 3最佳实践
      const newWuxingData = Object.keys(wuXingToNumber).map((wuxingName) => ({
        name: wuxingName,
        color: wuxingColorMap[wuxingName as keyof typeof wuxingColorMap] || '#333333',
        numbers: wuXingToNumber[wuxingName]
      }))

      // Vue 3 最佳实践：直接替换数组内容
      Object.assign(wuxingList, newWuxingData)

      console.log('Wuxing data loaded from gameStore playRules:', wuxingList)
    } else {
      console.warn('playRules.wuXingToNumber not found, using default data')
      // 如果playRules不存在，使用默认数据作为fallback
      const defaultWuxingData = [
        { name: '金1', color: '#ffcc00', numbers: ['03', '04', '11', '12', '25', '26', '33', '34', '41', '42'] },
        { name: '木', color: '#33cc33', numbers: ['07', '08', '15', '16', '23', '24', '37', '38', '45', '46'] },
        { name: '水', color: '#3399ff', numbers: ['13', '14', '21', '22', '29', '30', '43', '44'] },
        {
          name: '火',
          color: '#ff6600',
          numbers: ['01', '02', '09', '10', '17', '18', '31', '32', '39', '40', '47', '48']
        },
        { name: '土', color: '#cc9900', numbers: ['05', '06', '19', '20', '27', '28', '35', '36', '49'] }
      ]

      Object.assign(wuxingList, defaultWuxingData)
    }
  } catch (error) {
    console.error('Error loading wuxing data:', error)
  }
}

// 加载波色数据的函数
const loadWaveColorData = () => {
  try {
    // 从gameStore的playTypes加载波色数据 (code: '8007')
    const playTypes = getPlayTypes()
    const waveColorData = playTypes.find((item) => item.code === '8007')?.options || {}

    if (waveColorData && Object.keys(waveColorData).length > 0) {
      // 按照playTypes中波色数据的键顺序构建waveColorList - Vue 3最佳实践
      const newWaveColorData = Object.keys(waveColorData).map((waveColorName) => ({
        name: waveColorName,
        color: waveColorMap[waveColorName as keyof typeof waveColorMap] || '#333333',
        numbers: waveColorData[waveColorName]
      }))

      // Vue 3 最佳实践：直接替换数组内容
      Object.assign(waveColorList, newWaveColorData)

      console.log('Wave color data loaded from gameStore playTypes:', waveColorList)
    } else {
      console.warn('playTypes code 8007 not found, using default data')
      // 如果playTypes不存在，使用默认数据作为fallback
      const defaultWaveColorData = [
        {
          name: '红波',
          color: '#ff0000',
          numbers: [
            '01',
            '02',
            '07',
            '08',
            '12',
            '13',
            '18',
            '19',
            '23',
            '24',
            '29',
            '30',
            '34',
            '35',
            '40',
            '45',
            '46'
          ]
        },
        {
          name: '蓝波',
          color: '#3366ff',
          numbers: ['03', '04', '09', '10', '14', '15', '20', '25', '26', '31', '36', '37', '41', '42', '47', '48']
        },
        {
          name: '绿波',
          color: '#009933',
          numbers: ['05', '06', '11', '16', '17', '21', '22', '27', '28', '32', '33', '38', '39', '43', '44', '49']
        }
      ]

      Object.assign(waveColorList, defaultWaveColorData)
    }
  } catch (error) {
    console.error('Error loading wave color data:', error)
  }
}

// 加载合数单双数据的函数
const loadOddEvenData = () => {
  try {
    // 从gameStore的playTypes加载合数单双数据 (code: '8018')
    const playTypes = getPlayTypes()
    const oddEvenData = playTypes.find((item) => item.code === '8018')?.options || {}

    if (oddEvenData && Object.keys(oddEvenData).length > 0) {
      // 按照playTypes中合数单双数据的键顺序构建oddEvenList - Vue 3最佳实践
      const newOddEvenData = Object.keys(oddEvenData).map((oddEvenName) => ({
        name: oddEvenName,
        color: oddEvenColorMap[oddEvenName as keyof typeof oddEvenColorMap] || '#3366ff',
        numbers: oddEvenData[oddEvenName]
      }))

      // Vue 3 最佳实践：直接替换数组内容
      Object.assign(oddEvenList, newOddEvenData)

      console.log('Odd even data loaded from gameStore playTypes:', oddEvenList)
    } else {
      console.warn('playTypes code 8018 not found, using default data')
      // 如果playTypes不存在，使用默认数据作为fallback
      const defaultOddEvenData = [
        {
          name: '合数单',
          color: '#3366ff',
          numbers: [
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
          ]
        },
        {
          name: '合数双',
          color: '#3366ff',
          numbers: [
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
      ]

      Object.assign(oddEvenList, defaultOddEvenData)
    }
  } catch (error) {
    console.error('Error loading odd even data:', error)
  }
}

onMounted(async () => {
  try {
    console.log('gameStoreData:', gameStoreData.value)

    // 加载生肖数据
    loadZodiacData()

    // 加载五行数据
    loadWuxingData()

    // 加载波色数据
    loadWaveColorData()

    // 加载合数单双数据
    loadOddEvenData()
  } catch (error) {
    console.error('Error in onMounted:', error)
  }
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
          <table class="data-table">
            <tbody>
              <tr>
                <th class="text-center">2025蛇年（十二生肖号码对照）</th>
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
                            alt="zodiac.name"
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
          <table class="data-table two-column">
            <colgroup>
              <col class="narrow-col" />
              <col class="wide-col" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" class="text-center">五行对照</th>
              </tr>
              <tr v-for="wuxing in wuxingList" :key="wuxing.name">
                <td class="text-center">
                  <span class="wuxing-label" :style="{ color: wuxing.color }">{{ wuxing.name }}</span>
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
          <table class="data-table two-column">
            <colgroup>
              <col class="narrow-col" />
              <col class="wide-col" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" class="text-center">波色</th>
              </tr>
              <tr v-for="wave in waveColorList" :key="wave.name">
                <td class="text-center">
                  <span class="wave-label" :style="{ color: wave.color }">{{ wave.name }}</span>
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
          <table class="data-table two-column">
            <colgroup>
              <col class="narrow-col" />
              <col class="wide-col" />
            </colgroup>
            <tbody>
              <tr>
                <th colspan="2" class="text-center">合数单双</th>
              </tr>
              <tr v-for="item in oddEvenList" :key="item.name">
                <td class="text-center">
                  <span class="odd-even-label" :style="{ color: `${item.color} !important` }">{{ item.name }}</span>
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
          <table class="data-table attributes-table">
            <colgroup>
              <col class="full-width" />
            </colgroup>
            <tbody>
              <tr>
                <th class="text-center">生肖属性</th>
              </tr>
              <tr v-for="attribute in zodiacAttributesList" :key="attribute.label">
                <td class="text-center">
                  <template v-if="attribute.label === '琴棋书画'">
                    <span class="attribute-label" :style="{ color: '#3366ff' }">琴</span>
                    ：兔蛇鸡
                    <span class="attribute-label" :style="{ color: '#3366ff' }">棋</span>
                    ：鼠牛狗
                    <span class="attribute-label" :style="{ color: '#3366ff' }">书</span>
                    ：虎龙马
                    <span class="attribute-label" :style="{ color: '#3366ff' }">画</span>
                    ：羊猴猪
                  </template>
                  <template v-else>
                    <span class="attribute-label" :style="{ color: '#3366ff' }">{{ attribute.label }}：</span>
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

// 现代化表格样式
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  color: rgb(229 35 5);
  word-break: break-word;
  margin-bottom: 16px;
  border: 0;

  // 列宽定义
  &.two-column {
    .narrow-col {
      width: 50px;
    }

    .wide-col {
      width: auto;
    }
  }

  &.attributes-table {
    .full-width {
      width: 100%;
    }
  }

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
  }

  span {
    height: 18px;
    line-height: 18px;
    margin: 0 2px;
    padding: 0 3px;
    font-size: 16px;
    color: #000;
    display: inline-block;
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

// 文本对齐工具类
.text-center {
  text-align: center;
}

// 专用标签样式
.wuxing-label,
.wave-label,
.odd-even-label,
.attribute-label {
  font-weight: bold;
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
