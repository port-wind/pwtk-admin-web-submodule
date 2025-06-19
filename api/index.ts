import axios from 'axios'
import http from './http'
import type { IBaseResponse, IResponse } from './type'

interface IGetLatestIssueParams {
  newspaperCode: string
  gameType: number
}
interface IGetLatestIssuesParams {
  newspaperCodes: string[]
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

export const getLatestIssues = (data: IGetLatestIssuesParams): Promise<IBaseResponse<IGetLatestIssueResponse>> => {
  return http.post('/newspaper/latestIssues', data)
}

export interface IGetWebSitePostParams {
  page: number // Page number for pagination
  size: number // Number of items per page
  forumId: string // Forum ID
  gameType: string // Lottery or game type
  sortName?: string // Sorting field (optional)
  sortOrder?: 'ASC' | 'DESC' // Sorting order, either ascending or descending (optional)
}

export interface ILotteryPredictions {
  name: string // Prediction type name
  code: string // Prediction code
  predict: Array<string> // Prediction details
  hitDetail: string // Hit details ('1' for hit, '0' for not hit)
  isHit: string // Indicates if the prediction was a hit ('i' for pending, 'y' for hit, 'n' for not hit)
  predictTitle: string // Prediction title
}

export interface INumInfo {
  fiveElements: string // Five elements
  shengxiao: string // Chinese zodiac
  size: string // Size (s for small, b for big)
  color: string // Color (R for red, B for blue, G for green)
  num: number // Number
  index: number // Index
  oddEven: string // Odd or even (o for odd, e for even)
}

export interface IGetWebSitePostResponse {
  postId: string // Post or comment ID
  bbsId: string // BBS ID
  title: string // Post title
  postContent: string // Post or comment content
  likeCount: string // Number of likes
  threadCount: string // Number of replies
  postYear: string // Year of posting
  postIssue: string // Issue number of posting
  shortIssue: string // Short-term issue number
  postGameRef: string // Game reference for the post
  postGametypeRef: string // Game type reference for the post
  gameTypeName: string // Lottery/game type name
  gameTypeCode: string // Lottery/game type code
  isHot: string // Indicates if the post is hot (popular)
  isSelected: string // Indicates if the post is selected
  isTop: string // Indicates if the post is pinned/topped
  isRecommended: string // Indicates if the post is recommended
  isBloom: string // Indicates if the post is a blockbuster
  vipLevel: number // User level (0 or higher)
  avatar: string // User avatar
  nickname: string // User nickname
  attachments: object // Attachments associated with the post
  isLike: string // Indicates if the user has liked the post
  isDislike: string // Indicates if the user has disliked the post
  postUserId: string // ID of the user who posted
  predictFlag: string // Indicates if the post is a prediction post ('y' for yes, 'n' for no)
  postTime: string // Post time in format 'yyyy-MM-dd HH:mm:ss'
  forumId: string // Forum ID
  lotteryPredictions: ILotteryPredictions[]
  numInfo: INumInfo[] // Number information array
  num?: string // Special number (optional)
  result?: string // Result (optional)
}

export const getWebSitePost = (data: IGetWebSitePostParams): Promise<IResponse<IGetWebSitePostResponse>> => {
  return http.post('/bbsForumPost/webSitePost', data)
}
// // 查询个人信息接口
// export const accountInfo = (): Promise<IBaseResponse<IAccountInfoData>> => {
//   return http.get('/account/info')
// }

// // 获取类型接口
// export const getSelectType = (data: any) => {
//   return http.get('/dict/getDictByType', data)
// }

// // 用户编号模糊查询
// export const getBlurquery = (data: any) => {
//   return http.get('/user/queryBlurUserId', data)
// }

// // 获取ip地址
// // Constants for cache configuration
// const IP_CACHE_KEY = 'user_ip_data'
// const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

// // Generate unique IDs
// export const generateUniqueIds = (count: number = 1) => {
//   return http.post('/webgw/issueMapping/generateUniqueIds', { count })
// }
