// src/stores/counter.js
import { atom } from 'nanostores'
import service from '../service/index'

interface IGameStore {
  year: number
  gameType: string
  gameTypeCode: string
  currentGame: IGameType | null
  gameTypeList: IGameType[]
  numInfo: any[]
  issueList: any[]
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
  numInfo: [],
  gameTypeList: [],
  issueList: [] //https://ocs.ai4funs.com/pwtk/gr/a6/history/2025
})

export function changeGameType(_gameType: string) {
  const obj = gameStore.get().gameTypeList.find((item) => item.gameType === _gameType)
  if (obj) {
    gameStore.set({
      ...gameStore.get(),
      gameType: obj.gameType,
      gameTypeCode: obj.gameTypeCode,
      currentGame: obj
    })
  }
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
  console.log('🚀 ~ getIssueList ~ res:', res)
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
  }
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
