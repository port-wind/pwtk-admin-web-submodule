import type { IComponentProperty, ISetStyle } from './index'

// 图片广告组件配置类型
export interface PictureadsConfigType {
  text: string
  swiperType: number // 选择模板
  borderRadius: number // 图片倒角
  pageMargin: number // 页面边距
  imageMargin: number // 图片边距
  pagingType: number // 分页类型: 0/"bullets"/"fraction"/"progressbar"
  rowindividual: number // 一行个数
  imageList: any[] // 添加图片
}

const componentProperties = new Map<String, IComponentProperty<ISetStyle<PictureadsConfigType>>>()

componentProperties.set('pictureads', {
  component: 'pictureads',
  text: '图片广告',
  active: false,
  style: 'pictureadsstyle',
  setStyle: {
    componentId: '',
    sketchCodeList: [],
    templateId: '',
    pageRenderingSeq: 0,
    websiteId: '',
    componentRef: '',
    componentName: '图片广告',
    componentType: 'pictureads',
    componentSort: '',
    status: '',
    isView: '',
    memo: '',
    pageCode: '',
    configParamJson: {
      text: '图片广告',
      swiperType: 0,
      borderRadius: 0,
      pageMargin: 0,
      imageMargin: 0,
      pagingType: 0,
      rowindividual: 2,
      imageList: []
    }
  }
})

export default componentProperties
