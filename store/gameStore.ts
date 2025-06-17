// src/stores/counter.js
import { atom } from 'nanostores'
import service from '../service/index'

export const gameStore = atom({
  year: 2025,
  gameType: '2032', // 默认值 澳彩
  gameTypeCode: 'a6',
  numInfo: [],
  gameTypeList: [
    {
      value: '2032',
      label: '澳彩',
      code: '6'
    },
    {
      value: '1',
      label: '港彩',
      code: 'hk'
    },

    {
      value: '84',
      label: '台彩',
      code: 'tw'
    },
    {
      value: '3995',
      label: '新彩',
      code: 'xa6'
    },
    {
      value: '5',
      label: '新澳彩',
      code: 'xa'
    },
    {
      value: '6',
      label: '快乐8',
      code: 'kl8'
    }
  ]
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

export async function getGameTypeList() {
  const res = await service.kv().getGamePlatform().do()
  console.log('🚀 ~ getGameTypeList ~ res:', res)
  // if (res && res.length > 0) {
  //   gameStore.set({
  //     ...gameStore.get(),
  //     gameTypeList: res
  //   })
  // }
}

getNumInfo()
getGameTypeList()