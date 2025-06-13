import type { LotteryRiddleSolution } from '../LotteryRiddleSolution/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<LotteryRiddleSolution>>>()

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
      gameType: 'a6',
      year: 2025,
      getIssueNumber: 6
    },
  },
})

export default componentProperties
