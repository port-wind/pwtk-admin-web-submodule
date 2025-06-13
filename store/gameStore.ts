// src/stores/counter.js
import { atom } from 'nanostores'
import service from '../service/index'

export const gameStore = atom({
  year: 2025,
  gameType: '2032', // 默认值 澳彩
  gameTypeCode: 'a6',
  numInfo: []
})

export function changeGameType(gameType: string, gameTypeCode: string) {
  gameStore.set({
    ...gameStore.get(),
    gameType,
    gameTypeCode
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
  console.log('🚀 ~ getNumInfo ~ res:', res)
  gameStore.set({
    ...gameStore.get(),
    numInfo: res.allNumInfo
  })
}

getNumInfo()
