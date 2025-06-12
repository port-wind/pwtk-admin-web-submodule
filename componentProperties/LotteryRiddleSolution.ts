import type { LotteryRiddleSolution } from '@/views/WebVision/components/componentsbiz/LotteryRiddleSolution/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<
  string,
  IComponentProperty<ISetStyle<LotteryRiddleSolution>>
>()

componentProperties.set('LotteryRiddleSolution', {
  component: 'LotteryRiddleSolution',
  text: '谜语解特',
  active: false,
  style: 'LotteryRiddleSolutionStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '谜语解特',
    componentType: 'LotteryRiddleSolution',
    componentSort: '0',
    status: 'y',
    isView: 'y',
    memo: '',
    pageCode: '',
    configParamJson: {
      mainTitle: '澳门好彩',
      subTitle: '谜语解特',
      items: [
        {
          issue: '163期',
          title: '谜语解特',
          result: '开? 00准',
          resultColor: 'red',
          riddle: '看见八钱散发打,七九相连三一走',
          answerPrefix: '本期谜底：',
          answerZodiacs: ['虎', '牛', '龙', '猪', '猴'],
          highlightZodiacs: [],
          hintPrefix: '送：',
          hintText: '大数',
          highlightHint: false
        },
        {
          issue: '162期',
          title: '谜语解特',
          result: '开马48准',
          resultColor: 'red',
          riddle: '船到桥头自会直,摇头不算点头算',
          answerPrefix: '本期谜底：',
          answerZodiacs: ['鼠', '猪', '猴', '蛇', '鸡'],
          highlightZodiacs: [],
          hintPrefix: '送：',
          hintText: '大数',
          highlightHint: true
        },
        {
          issue: '160期',
          title: '谜语解特',
          result: '开鼠18准',
          resultColor: 'red',
          riddle: '四头连旺暴今期,得饶人处且饶人',
          answerPrefix: '本期谜底：',
          answerZodiacs: ['猪', '龙', '猴', '狗', '鼠'],
          highlightZodiacs: ['鼠'],
          hintPrefix: '送：',
          hintText: '大数',
          highlightHint: true
        },
        {
          issue: '159期',
          title: '谜语解特',
          result: '开蛇25准',
          resultColor: 'red',
          riddle: '一唱雄鸡天下白,白手起家从零起',
          answerPrefix: '本期谜底：',
          answerZodiacs: ['猴', '兔', '狗', '蛇', '龙'],
          highlightZodiacs: ['蛇', '龙'],
          hintPrefix: '送：',
          hintText: '大数',
          highlightHint: true
        },
        {
          issue: '158期',
          title: '谜语解特',
          result: '开龙02准',
          resultColor: 'red',
          riddle: '真金不怕火来烧,不见棺材不落泪',
          answerPrefix: '本期谜底：',
          answerZodiacs: ['龙', '牛', '猪', '鼠', '蛇'],
          highlightZodiacs: ['龙', '蛇'],
          hintPrefix: '送：',
          hintText: '小数',
          highlightHint: true
        }
      ]
    }
  }
})

export default componentProperties 