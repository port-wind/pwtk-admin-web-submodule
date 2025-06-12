import type { IComponentProperty, ISetStyle } from './index'

// 富文本组件配置类型
export interface RichtextConfigType {
  text: string
  myValue: string // 富文本内容
  backColor: string // 背景颜色
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<RichtextConfigType>>>()

componentProperties.set('richtext', {
  component: 'richtext',
  text: '富文本',
  active: false,
  style: 'richtextstyle',
  setStyle: {
    componentId: '',
    sketchCodeList: [],
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '富文本',
    componentType: 'richtext',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '富文本',
      myValue: '',
      backColor: 'rgb(249, 249, 249)'
    }
  }
})

export default componentProperties
