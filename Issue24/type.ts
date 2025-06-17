import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<Issue24> {}

export interface Issue24 {
  title: string
  subtitle: string
  enable: boolean
  styleJSON: Issue24StyleJSON
  issueList: IssueItem[]
}

export interface IssueItem {
  id: string
  period: string // 期数，如："168期"
  drawTitle: string // 精选标题，如："精选24码"
  numbers: DrawNumber[] // 开奖号码列表
  status: string // 状态，如："开?"、"开龙26准"
  result: string // 结果，如："00准"
  enabled: boolean
}

export interface DrawNumber {
  number: string
  color: 'red' | 'blue' | 'green' | 'black' | 'yellow' // 号码颜色
  isHighlight?: boolean // 是否高亮显示
}

// configParamJson 的结构
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
