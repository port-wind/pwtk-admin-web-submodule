// src/stores/counter.js
import { atom } from 'nanostores'

export const gameStore = atom({
  year: 2025,
  gameType: '2032', // 默认值 澳彩
  gameTypeCode: 'a6'
})

export function changeGameType(gameType: string, gameTypeCode: string) {
  gameStore.value.gameType = gameType
  gameStore.value.gameTypeCode = gameTypeCode
}

export function changeYear(year: number) {
  gameStore.value.year = year
}
