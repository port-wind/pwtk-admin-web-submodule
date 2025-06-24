import type { IComponentProperty, ISetStyle } from './index'
import type { CaptionTextConfig } from '../CaptionText/type'

const componentProperties = new Map<String, IComponentProperty<ISetStyle<CaptionTextConfig>>>()

// 预设值
componentProperties.set('CaptionText', {
  component: 'CaptionText',
  text: '标题文字',
  active: false,
  style: 'CaptionTextStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '标题文字',
    componentType: 'CaptionText',
    componentSort: '',
    status: 'y',
    isView: 'y',
    memo: '标题文字组件',
    pageCode: '',
    configParamJson: {
      text: '标题文字',
      title: '',
      subtitle: '',
      enable: true,
      name: '标题文字',
      description: '这是一个标题文字组件的描述内容',
      wordSize: 16,
      descriptionSize: 12,
      wordWeight: 400,
      positions: 'left',
      descriptionWeight: 200,
      wordColor: '#323233',
      descriptionColor: '#969799',
      backColor: '#ffffff',
      borderBott: false,
      wordHeight: 24,
      more: {
        show: false,
        type: 1,
        text: '查看更多',
        httpType: 10,
        http: ''
      },
      styleHeader: {
        backgroundColor: '#4a90e2',
        isGradient: false,
        headerBgColor: '#4a90e2',
        headerBg: '#4a90e2',
        headerBg2: '#66bb6a',
        subTitleColor: '#ffffff',
        titleColor: '#ffffff'
      },
      styleMain: {
        containerPadding: 0,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        margin: 0,
        boxShadow: 'none'
      }
    }
  }
})

export default componentProperties