// src/stores/counter.js
import { atom } from 'nanostores'
import service from '../service/index'
import type { IGetBBsForumIdByIdData } from '@/api/bss/forumManagement/types'

interface IGameStore {
  year: number
  gameType: string
  gameTypeCode: string
  currentGame: IGameType | null
  gameTypeList: IGameType[]
  numInfo: any[]
  issueList: any[]
  forum: IGetBBsForumIdByIdData | null
  gameNameMap: Map<string, string>
}

export const gameStore = atom<IGameStore>({
  year: 2025,
  gameType: '2032', // 默认值 澳彩
  gameTypeCode: 'a6',
  currentGame: {
    areaCode: '',
    classifier: '',
    createTime: 0,
    gameType: '2032',
    gameTypeCode: 'a6',
    gameTypeLongName: '澳门六合彩',
    gameTypeName: '澳彩',
    gameTypeShortName: '澳彩',
    sortNum: 0,
    updateTime: 0,
    status: 'y'
  },
  gameNameMap: new Map<string, string>(),
  numInfo: [],
  gameTypeList: [],
  issueList: [], //https://ocs.ai4funs.com/pwtk/gr/a6/history/2025
  forum: null
})

export function changeGameType(game: IGameType) {
  gameStore.set({
    ...gameStore.get(),
    gameType: game.gameType,
    gameTypeCode: game.gameTypeCode,
    currentGame: game
  })
}

export function changeYear(year: number) {
  gameStore.set({
    ...gameStore.get(),
    year
  })
}

async function getNumInfo() {
  const res: any = await service.kv().getAllNumInfo().do()
  if (res && res.length > 0) {
    gameStore.set({
      ...gameStore.get(),
      numInfo: res[0]
    })
  }
}

async function getIssueList() {
  const { gameTypeCode, year } = gameStore.get()
  const res: any = await service.kv().getGameResultHistory(gameTypeCode, year.toString()).do()
  if (res && res.length > 0) {
    gameStore.set({
      ...gameStore.get(),
      issueList: res[0].data
    })
  }
}

export async function getGameTypeList() {
  const res = await service.kv().getGamePlatform().do()
  if (res && res.length > 0) {
    gameStore.set({
      ...gameStore.get(),
      gameTypeList: res[0].data
    })
    gameStore.get().gameTypeList.forEach((item) => {
      gameStore.get().gameNameMap.set(item.gameType, item.gameTypeLongName.replace('六合彩', ''))
    })
  }
}

export async function updateForum(forum: IGetBBsForumIdByIdData) {
  gameStore.set({
    ...gameStore.get(),
    forum
  })
  console.log(gameStore.get().forum)
}

export function getGameName(gameType: string) {
  return gameStore.get().gameNameMap.get(gameType)
}

getNumInfo()
getGameTypeList()
getIssueList()

export interface IGameType {
  areaCode: string
  classifier: string
  createTime: number
  gameType: string
  gameTypeCode: string
  gameTypeLongName: string
  gameTypeName: string
  gameTypeShortName: string
  sortNum: number
  status: string
  updateTime: number
}
