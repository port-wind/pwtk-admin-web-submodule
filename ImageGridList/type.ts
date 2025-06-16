import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<ImageGridList> {}

export interface ImageGridList {
  title: string
  description: string
  gridItems: GridImageItem[]
  enable: boolean
  gridStyleJSON: GridStyleJSON
}

// 单个图片项的类型
export interface GridImageItem {
  id: string
  title: string
  imageUrl: string
  link: string
  enabled: boolean
}

// 样式配置类型
export interface GridStyleJSON {
  columnsPerRow: number // 每行显示的列数
  itemSpacing: number // 项目间距
  itemPadding: number // 项目内边距
  borderRadius: number // 圆角
  imageHeight: number // 图片高度
  titleFontSize: number // 标题字体大小
  titleColor: string // 标题颜色
  backgroundColor: string // 背景颜色
  borderColor: string // 边框颜色
  borderWidth: number // 边框宽度
  hoverEffect: boolean // 悬停效果
  showTitle: boolean // 是否显示标题
} 