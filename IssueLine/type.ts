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
  backgroundColor: string
  contentPaddingLeftRight: number
  contentPaddingTopBottom: number
  paddingLeftRight: number
  paddingTopBottom: number
  itemBackgroundColor: string
  borderRadius: number
  listSpacing: number
  itemSpacing: number
  layout: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  columnCount: number
}
export interface IStyleHeader {
  borderRadius: number
  padding: number
  headerBgColor: string
  headerBg: string
  headerBg2: string
  isGradient: boolean
  titleColor: string
  subTitleColor: string
}
