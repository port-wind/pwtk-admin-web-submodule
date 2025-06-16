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
  showStatus: boolean
  showPriority: boolean
  showTime: boolean
  showAssignee: boolean
  showTags: boolean
  maxDisplayCount: number
  layout: 'list' | 'card' | 'timeline'
  showIcon: boolean
}

export interface IssueItem {
  id: string
  tags: string[]
  title: string
  status: string
  priority: string
  description: string
  createTime: string
  updateTime: string
  assignee: string
  link: string
}

// configParamJson 的结构
export interface ImageStyleJSON {
  enableHeight: boolean
  height?: number
  borderRadius?: number
  maxHeight: number
  enableMaxHeight: boolean
}
