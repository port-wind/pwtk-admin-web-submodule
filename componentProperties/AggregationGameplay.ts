import type { AggregationGameplay } from '../AggregationGameplay/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<AggregationGameplay>>>()

componentProperties.set('AggregationGameplay', {
  component: 'AggregationGameplay',
  text: '聚合玩法',
  active: false,
  style: 'AggregationGameplayStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '聚合玩法',
    componentType: 'AggregationGameplay',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '聚合玩法',
      subtitle: '这是一个聚合玩法',
      content: '这里是内容区域，您可以在此处添加任何文本内容。',
      enable: true,
      styleHeader: {
        backgroundColor: '#f8f9fa',
        isGradient: true,
        headerBgColor: '#4a90e2',
        headerBg: '#4a90e2',
        headerBg2: '#5aa5f0',
        subTitleColor: '#ffffff',
        titleColor: '#ffffff'
      },
      styleMain: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 400,
        textColor: '#333333'
      }
    }
  }
})

export default componentProperties