// 组件属性配置主入口文件 - 替代原 componentProperties.ts
// 接口定义 - 从原 componentProperties.ts 迁移
export interface IComponentProperty<T> {
  component: string // component 中间组件名称
  text: string // pageBuilder 显示名称
  active: boolean // 是否可编辑/激活
  style: string // 右边该组件的控制台组件
  setStyle: T // 右边栏其他信息
}

export interface ISetStyle<V> {
  // 表数据
  componentId: string // component, template, website
  sketchCodeList: string | string[] // component - 修正为支持数组
  templateId: string // template
  pageRenderingSeq: number // template, website
  websiteId: string // website
  componentRef: string // website
  componentName: string
  componentType: string
  componentSort: string
  status: string
  isView: string
  memo: string
  pageCode: string
  configParamJson: V
  // 允许额外的属性
  [key: string]: any
}

// 导入分组件属性配置
import AdBarBoxProperties from './AdBarBox'
import CustomBarAdBoxProperties from './CustomBarAdBox'
import CaptiontextProperties from './captiontext'
import ListswitchingProperties from './Listswitching'
import PictureadsProperties from './pictureads'
import NoticeProperties from './notice'
import TabbarProperties from './tabbar'
import GraphicnavigationProperties from './graphicnavigation'
import RichtextProperties from './richtext'
import MagiccubeProperties from './magiccube'
import VideossProperties from './videoss'
import CustommoduleProperties from './custommodule'
import CustomBoxProperties from './CustomBox'
import SwipeBoxProperties from './SwipeBox'
import AuxiliarysegmentationProperties from './auxiliarysegmentation'
import CommoditysearchProperties from './commoditysearch'
import StoreinformationProperties from './storeinformation'
import EntertheshopProperties from './entertheshop'
import GameResultBoxProperties from './GameResultBox'
import HeaderBarBoxProperties from './HeaderBarBox'
import WebAdBoxProperties from './WebAdBox'
import NavBBSListBoxProperties from './NavBBSListBox'
import WebAdMoreBoxProperties from './WebAdMoreBox'
import InvestigateProperties from './Investigate'
import FollowProperties from './follow'
import FooterBarBoxProperties from './FooterBarBox'
import NavBarBoxProperties from './NavBarBox'
import PostDetailsBoxProperties from './PostDetailsBox'
import SuspensionProperties from './suspension'
import HomePopNoticeBoxProperties from './HomePopNoticeBox'
import NoticeBarBoxProperties from './NoticeBarBox'
import CommunitypowderProperties from './communitypowder'
import StorenotecardProperties from './Storenotecard'
import CrowdoperationProperties from './crowdoperation'
import PersonalizedrecommendationProperties from './personalizedrecommendation'
import OnlineserviceProperties from './onlineservice'
import TopNavBarProperties from './TopNavBar'
import ImageCardProperties from './ImageCard'
import LotteryResultProperties from './LotteryResult'
import InfoboxProperties from './Infobox'
import LotteryRiddleSolutionProperties from './LotteryRiddleSolution'

// 合并所有组件配置
const allComponentProperties = new Map()

// 合并分组件配置
AdBarBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

TopNavBarProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CustomBarAdBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CaptiontextProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

ListswitchingProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

PictureadsProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

NoticeProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

TabbarProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

GraphicnavigationProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

RichtextProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

MagiccubeProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

VideossProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CustommoduleProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CustomBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

SwipeBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

AuxiliarysegmentationProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CommoditysearchProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

StoreinformationProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

EntertheshopProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

GameResultBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

HeaderBarBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

WebAdBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

NavBBSListBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

WebAdMoreBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

InvestigateProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

FollowProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

FooterBarBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

NavBarBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

PostDetailsBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

SuspensionProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

HomePopNoticeBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

NoticeBarBoxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CommunitypowderProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

StorenotecardProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

CrowdoperationProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

PersonalizedrecommendationProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

OnlineserviceProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

ImageCardProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

LotteryResultProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

InfoboxProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

LotteryRiddleSolutionProperties.forEach((value, key) => {
  allComponentProperties.set(key, value)
})

// 🎉 所有组件配置合并完成！
// HeaderBarBoxProperties.forEach((value, key) => {
//   allComponentProperties.set(key, value)
// })

export default allComponentProperties

// 导出类型定义
export type { AdBarConfigType, AdBarItemType } from './AdBarBox'
export type { CustomBarType } from '../CustomBarAdBox/type'
export type { CaptiontextConfigType } from './captiontext'
export type { ListswitchingConfigType } from './Listswitching'
export type { PictureadsConfigType } from './pictureads'
export type { NoticeConfigType } from './notice'
export type { TabbarConfigType } from './tabbar'
export type { GraphicnavigationConfigType } from './graphicnavigation'
export type { RichtextConfigType } from './richtext'
export type { MagiccubeConfigType } from './magiccube'
export type { VideossConfigType } from './videoss'
export type { CustommoduleConfigType } from './custommodule'
export type { CustomBoxConfigType } from './CustomBox'
export type { SwipeBoxConfigType } from './SwipeBox'
export type { AuxiliarysegmentationConfigType } from './auxiliarysegmentation'
export type { CommoditysearchConfigType } from './commoditysearch'
export type { StoreinformationConfigType } from './storeinformation'
export type { EntertheshopConfigType } from './entertheshop'
export type { GameResultBoxConfigType } from './GameResultBox'
export type { HeaderBarBoxConfigType } from './HeaderBarBox'
export type { WebAdBoxConfigType } from './WebAdBox'
export type { NavBBSListBoxConfigType } from './NavBBSListBox'
export type { WebAdMoreBoxConfigType } from './WebAdMoreBox'
export type { InvestigateConfigType } from './Investigate'
export type { FollowConfigType } from './follow'
export type { FooterBarBoxConfigType } from './FooterBarBox'
export type { NavBarBoxConfigType } from './NavBarBox'
export type { PostDetailsBoxConfigType } from './PostDetailsBox'
export type { SuspensionConfigType } from './suspension'
export type { HomePopNoticeBoxConfigType } from './HomePopNoticeBox'
export type { NoticeBarBoxConfigType } from './NoticeBarBox'
export type { CommunitypowderConfigType } from './communitypowder'
export type { StorenotecardConfigType } from './Storenotecard'
export type { CrowdoperationConfigType } from './crowdoperation'
export type { PersonalizedrecommendationConfigType } from './personalizedrecommendation'
export type { OnlineserviceConfigType } from './onlineservice'

// 工具函数：获取组件配置
export const getComponentConfig = (componentName: string) => {
  return allComponentProperties.get(componentName)
}

// 工具函数：获取所有组件名称
export const getAllComponentNames = () => {
  return Array.from(allComponentProperties.keys())
}

// 工具函数：根据组件类型过滤
export const getComponentsByType = (componentType: string) => {
  const result = new Map()
  allComponentProperties.forEach((value, key) => {
    if (value.setStyle?.componentType === componentType) {
      result.set(key, value)
    }
  })
  return result
}
