import type { TextLinkList } from '../TextLinkList/type'
import type { IComponentProperty, ISetStyle } from './index'

const componentProperties = new Map<string, IComponentProperty<ISetStyle<TextLinkList>>>()

componentProperties.set('TextLinkList', {
  component: 'TextLinkList',
  text: '图片卡片',
  active: false,
  style: 'TextLinkListStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '图片卡片',
    componentType: 'TextLinkList',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      enable: true,
      imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      title: '产品标题',
      description: '这里是产品描述',
      link: '',
      imageStyleJSON: {
        enableHeight: false,
        height: 200,
        borderRadius: 8
      }
    }
  }
})

export default componentProperties
