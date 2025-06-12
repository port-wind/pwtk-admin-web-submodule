import type { ISetStyle } from '@/views/WebVision/const/componentProperties/index'

export interface IDatas extends ISetStyle<TopNavBar> {
  // configParamJson: CustomBarType
}

export interface TopNavBar {
  title?: string
  logo: string
}
