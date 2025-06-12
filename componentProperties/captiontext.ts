import type { IComponentProperty, ISetStyle } from './index'

// 标题文字组件配置类型
export interface CaptiontextConfigType {
  text: string
  name: string // 标题内容
  description: string // 描述内容
  wordSize: number // 标题大小
  descriptionSize: number // 描述大小
  wordWeight: number // 标题粗细
  positions: 'left' | 'center' // 显示位置
  descriptionWeight: number // 描述粗细
  wordColor: string // 标题颜色
  descriptionColor: string // 描述颜色
  backColor: string // 背景颜色
  borderBott: boolean // 底部分割线
  wordHeight: number // 框体高度
  more: {
    show: boolean // 是否显示查看更多
    type: number // 样式选择
    text: string // 自定义文字
    httpType: number // 链接类型
    http: string // 链接
  }
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<CaptiontextConfigType>>>()

componentProperties.set('captiontext', {
  component: 'captiontext',
  text: '标题文字',
  active: false,
  style: 'captiontextsstyle',
  setStyle: {
    componentId: '',
    sketchCodeList: [],
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '标题文字',
    componentType: 'captiontext',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '标题文字',
      name: '标题文字',
      description: '',
      wordSize: 16,
      descriptionSize: 12,
      wordWeight: 400,
      positions: 'left',
      descriptionWeight: 200,
      wordColor: 'rgba(50, 50, 51, 10)',
      descriptionColor: 'rgba(150, 151, 153, 10)',
      backColor: 'rgba(255, 255, 255, 10)',
      borderBott: false,
      wordHeight: 24,
      more: {
        show: false,
        type: 1,
        text: '查看更多',
        httpType: 10,
        http: ''
      }
    }
  }
})

export default componentProperties
