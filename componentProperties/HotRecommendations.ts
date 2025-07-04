import type { HotRecommendations } from '../HotRecommendations/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<HotRecommendations>>>()

componentProperties.set('HotRecommendations', {
  component: 'HotRecommendations',
  text: '热门推荐',
  active: false,
  style: 'HotRecommendationsStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '热门推荐',
    componentType: 'HotRecommendations',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '热门推荐',
      subtitle: '这是一个热门推荐',
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