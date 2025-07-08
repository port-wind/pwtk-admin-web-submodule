import type { ImageForGameTypeConfig } from '../ImageForGameType/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<ImageForGameTypeConfig>>>()

componentProperties.set('ImageForGameType', {
  component: 'ImageForGameType',
  text: '彩种图片框',
  active: false,
  style: 'ImageForGameTypeStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '彩种图片框',
    componentType: 'ImageForGameType',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      title: '彩种图片框',
      subtitle: '这是一个彩种图片框',
      content: '这里是内容区域，您可以在此处添加任何文本内容。',
      enable: true,
      showGameType: false,
      gameType: '2032',
      gameTypeCode: 'a6',
      forumId: '10',
      size: 10,
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