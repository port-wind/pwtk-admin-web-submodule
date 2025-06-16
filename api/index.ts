import axios from 'axios'
import http from './http'
import type { IAccountInfoData, IBaseResponse } from './type'

interface IGetLatestIssueParams {
  newspaperCode: string
  gameType: number
}

interface IGetLatestIssueResponse {
  issueId: number
  issue: number
  year: number
  name: string
  likeCount: number
  userLikeCount: number
  deviceLikeCount: number
  totalLikeCount: number
  favoriteCount: number
  likeStatus: string
  favoriteStatus: string
  seriesLikeStatus: string
  threadCount: number
  replyCount: number
  readCount: number
  seriesCode: string
  seriesName: string
  newspaperCode: string
  newspaperName: string
  gameType: number
  imgPath: string
  isColorful: string
  isTop: string
  isSelected: string
  isHot: string
  isBloom: string
  isRecommended: string
  commentFlag: string
  voteFlag: string
  isAllAnnotateContent: string
  annotateContent: string
  status: string
  page: number
  size: number
  createTime: string // Format: yyyy-MM-dd HH:mm:ss
  updateTime: string // Format: yyyy-MM-dd HH:mm:ss
  favoriteTime: string // Format: yyyy-MM-dd HH:mm:ss
  likeTime: string // Format: yyyy-MM-dd HH:mm:ss
  predictFlag: string
  gcFlag: string
  score: number
  issueLastNum: string
  seriesCount: number
}
// https://biz-client.pwtk.cc/biz-client/biz
// /newspaper/latestIssue
export const getLatestIssue = (data: IGetLatestIssueParams): Promise<IBaseResponse<IGetLatestIssueResponse>> => {
  return http.post('/newspaper/latestIssue', data)
}

// 查询个人信息接口
export const accountInfo = (): Promise<IBaseResponse<IAccountInfoData>> => {
  return http.get('/account/info')
}

// 获取类型接口
export const getSelectType = (data: any) => {
  return http.get('/dict/getDictByType', data)
}

// 用户编号模糊查询
export const getBlurquery = (data: any) => {
  return http.get('/user/queryBlurUserId', data)
}

// 获取ip地址
// Constants for cache configuration
const IP_CACHE_KEY = 'user_ip_data'
const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

// Generate unique IDs
export const generateUniqueIds = (count: number = 1) => {
  return http.post('/webgw/issueMapping/generateUniqueIds', { count })
}
