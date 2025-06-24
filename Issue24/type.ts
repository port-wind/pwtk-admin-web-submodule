import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<Issue24> {}

export interface Issue24 {
  model: EModel // 24码风格  ”24“
  title: string
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
}

export enum EModel {
  '24码',
  '胆大胆小',
  '三半波色',
  '杀两肖',
  '尾数大小',
  '平特二尾',
  '吃鱼吃虾',
  '买啥中啥',
  '三炮中特',
  '一句赢钱'
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
