import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<IssueLine> {}

export interface IssueLine {
  enable: boolean
  title: string
  titlePrefix: string
  gameType: string
  subtitle: string
  size: number
  onlyShowCurrentIssue: boolean
  /** 是否查询全部帖子 ， false 只查询不同期的 帖子（是否中奖），目前没有确定*/
  isAll: 'y' | 'n'
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
  borderWidth: number
  borderStyle: string
  borderColor: string
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
  flexDirection: 'row' | 'column',
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
