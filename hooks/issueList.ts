import { ref, computed, watch } from 'vue'
import { getWebSitePost } from '../api'
import type { IForumPost } from '../types/forum'

/**
 * 期数列表 hooks 参数接口
 */
export interface IUseIssueListParams {
  gameType: string
  size: number
  forumId: string
  autoFetch?: boolean // 是否自动获取数据，默认为 true
}

/**
 * 处理后的预测数据接口
 */
export interface IProcessedPrediction {
  numbers: {
    number: string
    color: string
    isHighlight: boolean
  }[]
}

/**
 * 开奖结果信息接口
 */
export interface IResultInfo {
  shengxiao: string
  teNum: string
  result: string
}

/**
 * 处理后的期数数据接口
 */
export interface IProcessedIssueItem extends IForumPost {
  processedPredictions: IProcessedPrediction[]
  resultInfo: IResultInfo
}

/**
 * 期数列表数据管理 hooks
 * @param params 参数配置
 * @returns 期数列表相关的响应式数据和方法
 */
export function useIssueList(params: IUseIssueListParams) {
  // 响应式状态
  const issueListItem = ref<IForumPost[]>([])
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  /**
   * 处理彩票预测数据
   * @param predictions 预测数据数组
   * @returns 处理后的预测数据
   */
  const processLotteryData = (predictions: any[]): IProcessedPrediction[] => {
    if (!predictions || predictions.length === 0) return []

    return predictions.map((prediction) => {
      const { predict, hitDetail } = prediction
      if (!predict) return { numbers: [] }

      // 根据hitDetail判断哪些号码需要高亮
      const numbers = predict.map((number: string, index: number) => ({
        number,
        color: 'blue', // 默认颜色
        isHighlight: hitDetail[index] === '1' // hitDetail中"1"表示中奖需要高亮
      }))

      return { numbers }
    })
  }

  /**
   * 根据issue匹配获取开奖信息
   * @param issueNumber 期数号码
   * @returns 开奖结果信息
   */
  const getIssueResultInfo = (issueNumber: string): IResultInfo => {
    const matchedIssue = issueListItem.value.find((item) => item.postIssue === issueNumber)

    if (matchedIssue && matchedIssue.numInfo && matchedIssue.numInfo.length > 6) {
      const lastNumInfo = matchedIssue.numInfo[6] // 取最后一个元素（索引6）
      return {
        shengxiao: lastNumInfo.shengxiao || '',
        teNum: lastNumInfo.num?.toString() || '', // 特码号码
        result: matchedIssue.result || ''
      }
    }
    return { shengxiao: '', teNum: '', result: '' }
  }

  const getLotteryPredictions = (issue: IForumPost) => {
    //  code : "8152"
    // hitDetail : "0"
    // isHit : "n"
    // name : "七字"
    // predict : ['欲除豺虎论三略']
    // predictTitle : ""
    // return issue.lotteryPredictions || []
    const predictions = issue.lotteryPredictions || []
    return predictions.map((prediction) => {
      return {
        ...prediction,
        predict: prediction.predict.map((num: string) => num.padStart(2, '0'))
      }
    })
  }

  /**
   * 计算处理后的期数数据
   */
  const processedIssueList = computed<IProcessedIssueItem[]>(() => {
    return issueListItem.value.map((issue) => {
      const processedPredictions = processLotteryData(issue.lotteryPredictions || [])
      // 通过postIssue匹配获取开奖信息
      const resultInfo = getIssueResultInfo(issue.postIssue)

      return {
        ...issue,
        processedPredictions,
        resultInfo
      }
    })
  })

  /**
   * 从postIssue中提取期数
   * @param postIssue 原始期数字符串
   * @returns 提取后的期数
   */
  const extractIssueNumber = (postIssue: string): string => {
    if (!postIssue) return ''
    // 从postIssue字符串中提取后面的数字部分作为期数
    // 例如: "2025141" -> "141"
    const match = postIssue.match(/(\d+)$/)
    if (match) {
      const fullNumber = match[1]
      // 如果是7位数，取后3位；如果是其他位数，取后3位或全部
      return fullNumber.length >= 3 ? fullNumber.slice(-3) : fullNumber
    }
    return postIssue
  }

  const getIssueNumber = (issue: IForumPost) => {
    const postIssue = issue.postIssue
    if (!postIssue) return ''
    // 从postIssue字符串中提取后面的数字部分作为期数
    // 例如: "2025141" -> "141"
    const match = postIssue.match(/(\d+)$/)
    if (match) {
      const fullNumber = match[1]
      // 如果是7位数，取后3位；如果是其他位数，取后3位或全部
      return fullNumber.length >= 3 ? fullNumber.slice(-3) : fullNumber
    }
    return postIssue
  }

  const getIssueResult = (issue: IForumPost) => {
    const result = issue?.numInfo?.[issue.numInfo.length - 1]
    return result || {}
  }

  /**
   * 获取中奖号码
   * @param issue 期数数据
   * @returns 中奖号码
   */
  const getHitNumber = (issue: IProcessedIssueItem): string => {
    // 优先从numInfo获取特码（通常是第7个元素，即index为6）
    if (issue.numInfo && issue.numInfo.length > 6) {
      const specialNum = issue.numInfo[6] // 索引6对应第7个元素
      if (specialNum && specialNum.num) {
        return specialNum.num.toString().padStart(2, '0') // 确保是两位数格式
      }
    }

    // 备选方案：从预测数据中获取中奖号码
    if (issue.processedPredictions && issue.processedPredictions.length > 0) {
      for (const prediction of issue.processedPredictions) {
        if (prediction.numbers) {
          const hitNumber = prediction.numbers.find((num: any) => num.isHighlight)
          if (hitNumber) {
            return hitNumber.number.padStart(2, '0') // 返回中奖的号码
          }
        }
      }
    }
    return '00' // 如果没有中奖号码，返回00
  }

  /**
   * 获取数字颜色类名
   * @param color 颜色名称
   * @returns CSS类名
   */
  const getNumberColorClass = (color: string): string => {
    const colorMap = {
      red: 'number-red',
      blue: 'number-blue',
      green: 'number-green',
      black: 'number-black',
      yellow: 'number-yellow'
    }
    return colorMap[color as keyof typeof colorMap] || 'number-black'
  }

  /**
   * 获取期数列表数据
   * @param gameType 游戏类型
   * @param size 数据条数
   * @param forumId 论坛ID
   * @returns Promise<void>
   */
  const fetchIssueList = async (
    gameType: string = params.gameType,
    size: number = params.size,
    forumId: string = params.forumId
  ): Promise<void> => {
    try {
      isLoading.value = true
      hasError.value = false
      errorMessage.value = ''

      const res = await getWebSitePost({
        gameType: gameType,
        page: 1,
        size: size || 10,
        forumId: forumId,
        isAll: 'y'
      })

      if (res.success && res.data) {
        issueListItem.value = res.data.list || []
      } else {
        throw new Error(res.errMessage || '获取数据失败')
      }
    } catch (error) {
      hasError.value = true
      errorMessage.value = error instanceof Error ? error.message : '获取期数列表失败'
      console.error('fetchIssueList error:', error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 刷新数据
   * @param newGameType 新的游戏类型，如果不传则使用原有参数
   * @param newSize 新的数据条数，如果不传则使用原有参数
   * @param newForumId 新的论坛ID，如果不传则使用原有参数
   */
  const refreshData = (newGameType?: string, newSize?: number, newForumId?: string) => {
    fetchIssueList(newGameType || params.gameType, newSize || params.size, newForumId || params.forumId)
  }

  /**
   * 清空数据
   */
  const clearData = () => {
    issueListItem.value = []
    hasError.value = false
    errorMessage.value = ''
  }

  // 监听参数变化自动刷新数据
  watch(
    () => [params.gameType, params.size, params.forumId],
    ([newGameType, newSize, newForumId], [oldGameType, oldSize, oldForumId]) => {
      if (newGameType !== oldGameType || newSize !== oldSize || newForumId !== oldForumId) {
        fetchIssueList(String(newGameType), Number(newSize), String(newForumId))
      }
    },
    { deep: true }
  )

  // 如果开启自动获取，则立即获取数据
  if (params.autoFetch !== false) {
    fetchIssueList()
  }

  return {
    // 响应式数据
    issueListItem,
    processedIssueList,
    isLoading,
    hasError,
    errorMessage,

    // 方法
    fetchIssueList,
    refreshData,
    clearData,
    extractIssueNumber,
    getIssueResult,
    getIssueNumber,
    getHitNumber,
    getNumberColorClass,
    processLotteryData,
    getIssueResultInfo,
    getLotteryPredictions
  }
}
