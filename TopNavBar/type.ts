import type { ISetStyle } from '../componentProperties'

export interface IDatas extends ISetStyle<TopNavBar> {
  // configParamJson: CustomBarType
}

export interface TopNavBar {
  title?: string
  logo: string
  homeUrl?: string
}
