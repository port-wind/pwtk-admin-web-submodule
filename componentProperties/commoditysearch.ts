import type { IComponentProperty, ISetStyle } from './index'

// 商品搜索组件配置类型
export interface CommoditysearchConfigType {
  text: string
  heights: number // 搜索栏高度
  position: number // 显示位置
  sweep: boolean // 显示扫一扫
  borderRadius: number // 框体样式
  textPosition: number // 文本位置
  backgroundColor: string // 背景颜色
  borderColor: string // 框体颜色
  textColor: string // 字体颜色
  hotords: any[] // 热词
  conf: {
    text: string
    heights: number
    position: number
  }
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<CommoditysearchConfigType>>>()

componentProperties.set('commoditysearch', {
  component: 'commoditysearch',
  text: '商品搜索',
  active: false,
  style: 'commoditysearchstyle',
  setStyle: {
    componentId: '',
    sketchCodeList: [],
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '商品搜索',
    componentType: 'commoditysearch',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '商品搜索',
      heights: 28,
      position: 0,
      sweep: false,
      borderRadius: 0,
      textPosition: 0,
      backgroundColor: 'rgb(249, 249, 249)',
      borderColor: 'rgb(255, 255, 255)',
      textColor: 'rgb(150, 151, 153)',
      hotords: [],
      conf: {
        text: '商品搜索',
        heights: 28,
        position: 0
      }
    }
  }
})

export default componentProperties
