import type { HighLightTextConfig } from '../HighLightText/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<HighLightTextConfig>>>()

componentProperties.set('HighLightText', {
  component: 'HighLightText',
  text: '高亮文本',
  active: false,
  style: 'HighLightTextStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '高亮文本',
    componentType: 'HighLightText',
    componentSort: '',
    status: 'y',
    isView: 'y',
    memo: '支持多种高亮样式的文本组件',
    pageCode: '',
    configParamJson: {
      text: '这是一段高亮文本',
      highlightType: 'background',
      fontSize: 16,
      fontWeight: 400,
      textColor: '#333333',
      highlightColor: '#FFE58F',
      gradientColors: {
        from: '#FF9A9E',
        to: '#FAD0C4'
      },
      animation: 'none',
      textAlign: 'left',
      lineHeight: 1.5,
      padding: {
        top: 10,
        right: 15,
        bottom: 10,
        left: 15
      }
    }
  }
})

export default componentProperties 