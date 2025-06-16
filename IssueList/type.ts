import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<IssueList> {}
export interface IssueList {
  imageUrl: string
  title: string
  description: string
  link: string
  enable: boolean
  issueItems: IssueItem[]
  imageStyleJSON: ImageStyleJSON
}

export interface IssueItem {
  tags: string[]
  title: string
  status: string
  priority: string
  description: string
  createTime: string
  updateTime: string
}

// configParamJson 的结构
export interface ImageStyleJSON {
  enableHeight: boolean
  height?: number
  borderRadius?: number
}
