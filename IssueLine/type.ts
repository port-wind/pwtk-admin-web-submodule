import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<IssueLine> {}

export interface IssueLine {
  enable: boolean
  title: string
  titlePrefix: string
  subtitle: string
  size: number
  forumId: string
  frontExtend_Enable: boolean
  frontExtend_Content: string
  backendextend_Enable: boolean
  backendextend_Content: string
  dynamicTemplate: string
  dynamicActiveBg: string
  dynamicActiveText: string
  dynamicActiveTextAlign: string
  dynamicActiveFontSize: string
  dynamicActiveFontWeight: string
  dynamicNoResult: string
  styleHeader: IStyleHeader
  styleMain: IStyleMain
}

export interface IStyleMain {
  borderRadius: number
  contentPaddingLeftRight: number
  contentPaddingTopBottom: number
  paddingLeftRight: number
  paddingTopBottom: number
  listSpacing: number
  itemSpacing: number
  backgroundColor: string
  itemBackgroundColor: string
  layout: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  columnCount: number
}
// 期数目录标题样式
export interface IStyleHeader {
  borderRadius: number
  padding: number
  backgroundColor: string
  isGradient: boolean
  headerBgColor: string
  headerBg: string
  headerBg2: string
  subTitleColor: string
  titleColor: string
}
