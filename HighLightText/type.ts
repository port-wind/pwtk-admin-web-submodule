import type { ISetStyle } from '../componentProperties/index'
export interface IDatas extends ISetStyle<HighLightTextConfig> {}

export interface HighLightTextConfig {
  // 高亮样式类型
  highlightType: 'background' | 'underline' | 'marker' | 'gradient'
  // 文本内容
  text: string
  // 字体大小
  fontSize: number
  // 字体粗细
  fontWeight: 'normal' | 'bold' | 'bolder'
  // 文本颜色
  textColor: string
  // 高亮颜色
  highlightColor: string
  // 渐变色（当 highlightType 为 gradient 时使用）
  gradientColors?: {
    from: string
    to: string
  }
  // 动画效果
  animation?: 'none' | 'flash' | 'pulse'
  // 对齐方式
  textAlign: 'left' | 'center' | 'right'
  // 行高
  lineHeight: number
  // 内边距
  padding: {
    top: number
    right: number
    bottom: number
    left: number
  }
} 