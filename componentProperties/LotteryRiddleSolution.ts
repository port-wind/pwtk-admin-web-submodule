import type { LotteryRiddleSolution } from '../LotteryRiddleSolution/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<LotteryRiddleSolution>>>()

componentProperties.set('LotteryRiddleSolution', {
  component: 'LotteryRiddleSolution',
  text: '彩票谜语解答',
  active: true,
  style: 'LotteryRiddleSolutionStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '彩票谜语解答',
    componentType: 'LotteryRiddleSolution',
    componentSort: '',
    status: 'y',
    isView: 'y',
    memo: '彩票谜语解答组件',
    pageCode: '',
    configParamJson: {
      title: '彩票谜语解答',
      subtitle: '最新谜语',
      mainTitle: '彩票谜语解答',
      subTitle: '最新谜语',
      gameType: '',
      year: new Date().getFullYear(),
      enable: true,
      forumId: '',
      forumName: '',
      forumIcon: '',
      forumStatus: '',
      mainboardId: '',
      mainboardName: '',
      size: 20,
      links: [],
      listStyleJSON: {
        headerBackgroundColor: '#4caf50',
        headerTextColor: '#ffffff',
        itemSpacing: 8,
        itemPadding: 12,
        itemBorderRadius: 6,
        itemBackgroundColor: '#ffffff',
        itemTextColor: '#333333',
        itemBorderColor: '#e0e0e0',
        itemBorderWidth: 1,
        containerPadding: 16,
        riddleTextColor: '#2e7d32',
        answerTextColor: '#1976d2',
        resultTextColor: '#f44336'
      },
      styleHeader: {
        backgroundColor: '#4caf50',
        isGradient: true,
        headerBgColor: '#4caf50',
        headerBg: '#4caf50',
        headerBg2: '#66bb6a',
        subTitleColor: '#ffffff',
        titleColor: '#ffffff'
      },
      styleMain: {
        numberSize: 14,
        numberSpacing: 4,
        padding: 0,
        showPeriod: true,
        borderRadius: 8,
        showStatus: true,
        showResult: true,
        headerTextColor: '#ffffff'
      }
    }
  }
})

export default componentProperties
