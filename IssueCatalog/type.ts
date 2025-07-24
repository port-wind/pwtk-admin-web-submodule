import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<IssueCatalog> {}

export interface IssueCatalog {
  title: string
  titlePrefix: string
  subtitle: string
  enable: boolean
  size: number
  forumName: string
  mainboardName: string
  // 主版块ID
  mainboardId: string
  // 论坛ID
  forumId: string

  forumIcon?: string
  forumStatus?: string
  styleHeader: IStyleHeader
  styleMain: IStyleMain
  // 🎮 动态彩种字段 - 支持基于 gameType 的动态配置
  [gameTypeId: string]: any
  playGameCode: number // 根据游戏玩法配置模版
  dynamicTemplate: string
  dynamicActiveBg: string // 竞猜预测命中时背景色
  dynamicActiveText: string // 竞猜预测命中时文字色
  dynamicNoResult: string // 未开奖时显示的文字

  frontExtend_Enable: boolean // 是否启用扩展期数列表
  frontExtend_Content: string // 扩展期数列表
  backendextend_Enable: boolean // 是否启用扩展期数列表
  backendextend_Content: string // 扩展期数列表
}

export enum EPlayGameCode {
  '24码',
  '胆大胆小',
  '三半波色',
  '杀两肖',
  '尾数大小',
  '平特二尾',
  '吃鱼吃虾',
  '买啥中啥',
  '三炮中特',
  '一句赢钱',
  '平特二肖',
  '绝杀区',
  '中特码段',
  '天地生肖',
  '合数单双',
  '无敌八尾',
  '复式平码',
  '一句解特码',
  '横扫黑庄',
  '六肖六码'
}

// 期数目录样式
export interface IStyleMain {
  borderRadius: number
  padding: number
  itemSpacing: number
  listSpacing: number
  backgroundColor: string
  itemBackgroundColor: string
  layout: 'left' | 'center' | 'right' | 'space-around' | 'space-between' | 'space-evenly'
  columnCount: number // 列数
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
