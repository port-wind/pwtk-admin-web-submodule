import type { ISetStyle } from '../componentProperties/index'
export interface IDatas extends ISetStyle<NavBarBox> {}
export interface NavBarBox {
  itemData: Array<{
    id: string
    name: string
    disabled: boolean
  }>
  tabsAttr: {
    sticky: boolean
    offsetTop: number
  }
  bgColor: string
  model: 's1' | 's2' | 's3'
  scrollOffset: number
  onTabChange: (tab: any) => void
}


