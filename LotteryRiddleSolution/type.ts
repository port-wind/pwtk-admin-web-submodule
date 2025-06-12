import type { ISetStyle } from '../componentProperties/index'

/**
 * 列表中的单条解特信息
 */
export interface RiddleItem {
  issue: string // 期数
  title: string // 标题, e.g., "谜语解特"
  result: string // 开奖结果, e.g., "开? 00准"
  resultColor: 'red' | 'green' | 'blue' // 结果文本颜色
  riddle: string // 谜语内容
  answerPrefix: string // 谜底前缀, e.g., "本期谜底："
  answerZodiacs: string[] // 谜底生肖数组
  highlightZodiacs: string[] // 需要高亮的生肖
  hintPrefix: string // 提示前缀, e.g., "送："
  hintText: string // 提示文本, e.g., "大数"
  highlightHint: boolean // 是否高亮提示文本
}

/**
 * 组件的 configParamJson 的最终结构
 */
export interface LotteryRiddleSolution {
  mainTitle: string
  subTitle: string
  items: RiddleItem[]
}

// 组件在 WebVision 中的完整数据结构
export interface IDatas extends ISetStyle<LotteryRiddleSolution> {} 