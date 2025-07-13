import type { ISetStyle } from '../componentProperties/index'
export interface IDatas extends ISetStyle<AdBarConfigType> {}

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
  