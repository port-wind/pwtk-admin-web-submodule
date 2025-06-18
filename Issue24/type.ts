import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<Issue24> {}

export interface Issue24 {
  title: string
  subtitle: string
  enable: boolean
  size: number
  forumId: string
  styleJSON: Issue24StyleJSON
}
export interface Issue24StyleJSON {
  backgroundColor: string
  titleColor: string
  numberSize: number
  numberSpacing: number
  borderRadius: number
  padding: number
  showPeriod: boolean
  showStatus: boolean
  showResult: boolean
  isGradient: boolean
  headerBgColor: string
  headerBg: string
  headerBg2: string
  headerTextColor: string
}
