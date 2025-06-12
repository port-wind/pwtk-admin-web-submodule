import type { ISetStyle } from "@/views/WebVision/const/componentProperties/index"

export interface IDatas extends ISetStyle<TopNavBar> {
  // configParamJson: CustomBarType
}

export interface TopNavBar {
  model: 's1' | 's2' | 's3'
  title?: string
  itemData: ItemData[]
  logo: string
}

export interface ItemData {
  link: string
  text: string
  content?: string
}
