import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<IssueCatalog> {}

export interface IssueCatalog {
  title: string
  titlePrefix: string
  subtitle: string
  enable: boolean
  size: number
  forumId: string
  forumName: string
  mainboardName: string
  mainboardId: string
  forumIcon?: string
  forumStatus?: string
  styleHeader: IStyleHeader
  styleMain: IStyleMain
  // 🎮 动态彩种字段 - 支持基于 gameType 的动态配置
  [gameTypeId: string]: any
  playGameCode: EPlayGameCode // 根据游戏玩法配置模版
  dynamicTemplate: string
  dynamicActive: string
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

export interface IStyleMain {
  numberSize: number
  numberSpacing: number
  padding: number
  showPeriod: boolean
  borderRadius: number
  showStatus: boolean
  showResult: boolean
  headerTextColor: string
}
export interface IStyleHeader {
  backgroundColor: string
  isGradient: boolean
  headerBgColor: string
  headerBg: string
  headerBg2: string
  subTitleColor: string
  titleColor: string
}
