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
  if (res && res.length > 0) {
    gameStore.set({
      ...gameStore.get(),
      numInfo: res[0]
    })
  }
}

getNumInfo()
