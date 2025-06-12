import type { IComponentProperty, ISetStyle } from './index'

// AdBarBox 组件配置参数类型
export interface AdBarConfigType {
  model: 's1' | 's2' | 's3'
  total: number
  adData: AdBarItemType[]
  title?: string
  showTitle?: boolean
  showText?: boolean
  layout?: 'horizontal' | 'vertical'
  adCount?: number
}

// 广告项类型
export interface AdBarItemType {
  index: number
  img: string
  link: string
  name: string
  imgArr?: any // 用于上传组件的文件数组
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<AdBarConfigType>>>()

componentProperties.set('AdBarBox', {
  component: 'AdBarBox',
  text: '推广广告',
  active: false,
  style: 'AdBarBoxStyle',
  setStyle: {
    componentId: '',
    sketchCodeList: '',
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '推广广告模块',
    componentType: 'AdBarBox',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      model: 's1',
      total: 12,
      adData: [
        {
          index: 1,
          img: '',
          link: '',
          name: '广告位1'
        },
        {
          index: 2,
          img: '',
          link: '',
          name: '广告位2'
        },
        {
          index: 3,
          img: '',
          link: '',
          name: '广告位3'
        }
      ],
      title: '推广广告',
      showTitle: true,
      showText: true,
      layout: 'horizontal',
      adCount: 3
    }
  }
})

export default componentProperties
