import type { IComponentProperty, ISetStyle } from './index'

// 开奖结果组件配置类型
export interface GameResultBoxConfigType {
  model: string
  isHistory: string
  isNextIssue: string
  isIssue: string
  isIcon: string
  isLongName: string
  showArray: string
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<GameResultBoxConfigType>>>()

componentProperties.set('GameResultBox', {
  component: 'GameResultBox',
  text: '开奖结果',
  active: false,
  style: 'GameResultBoxStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: [],
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '开奖结果模块',
    componentType: 'GameResultBox',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      model: '',
      isHistory: '',
      isNextIssue: '',
      isIssue: '',
      isIcon: '',
      isLongName: '',
      showArray: ''
    }
  }
})

export default componentProperties
