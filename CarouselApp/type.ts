import type { ISetStyle } from '../componentProperties/index'

export interface IDatas extends ISetStyle<ICarouselApp> {}
export interface ICarouselApp {
  tabs: TabItem[]
}

export interface TabItem {
  title: string
  banner: string
  promoText: string
  amount: string
  bannerColor: string
  appIcon: string
  appName: string
  appSize: string
  category: string
  downloads: string
  rating: string
  screenshot: string
  androidDownload?: string
  iosDownload?: string
  webUrl?: string
  statusText: string
}
