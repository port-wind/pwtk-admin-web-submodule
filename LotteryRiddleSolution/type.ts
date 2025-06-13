import type { ISetStyle } from '../componentProperties/index'

/**
 * 组件的 configParamJson 的最终结构
 */
export interface LotteryRiddleSolution {
  mainTitle: string
  subTitle: string
  gameType: string
  year: number
  getIssueNumber: number
}

// 组件在 WebVision 中的完整数据结构
export interface IDatas extends ISetStyle<LotteryRiddleSolution> {}
