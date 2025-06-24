import type { ISetStyle } from '../componentProperties/index'

// 组件在 WebVision 中的完整数据结构
export interface IDatas extends ISetStyle<PictureADsConfigType> {}

// 图片广告组件配置类型
export interface PictureADsConfigType {
  text: string
  swiperType: number // 选择模板
  borderRadius: number // 图片倒角
  pageMargin: number // 页面边距
  imageMargin: number // 图片边距
  pagingType: number // 分页类型: 0/"bullets"/"fraction"/"progressbar"
  rowindividual: number // 一行个数
  imageList: any[] // 添加图片
}
