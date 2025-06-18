import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<Issue24> {}

export interface Issue24 {
  title: string
  subtitle: string
  enable: boolean
  size: number
  forumId: string
  styleHeader: IStyleHeader
  styleMain: IStyleMain
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
