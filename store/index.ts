// // stores/globalStore.ts
// import { atom } from 'nanostores';
// import { map } from 'nanostores';
// // 定义对象的类型
// interface CounterState {
//   websiteId: string;
//   domain: string;
//   manageSiteId: string;
//   taskId: string;
// }

// // 定义全局状态
// export const website_store = atom<CounterState>({
//   // domain: 'bbs.pwtk.cc',
//   // manageSiteId: 'pw01tk01',
//   // websiteId: '1310634689215596485',
//   // taskId: '1317182061848560381',
//   domain: '',
//   manageSiteId: '',
//   websiteId: '',
//   taskId: '',
// });

// // 定义类型
// interface GlobalState {
//   website: {
//     websiteId: string;
//     domain: string;
//     manageSiteId: string;
//     taskId: string;
//   };
//   domain: {
//     domain: string;
//     taskId: string;
//     appDownloadUrl?: string;
//     areaCodes?: string[];
//     cdnUrl?: string;
//     createTime?: number;
//     descriptions?: string;
//     domainFrom?: string;
//     domainStatus?: 'y' | 'n'; // "y" 表示启用，"n" 表示禁用
//     domainType?: 'f' | 'p' | 'm'; // 示例类型，可根据实际含义调整
//     hasStatsCode?: 'y' | 'n';
//     icon?: string;
//     isAppDownloadHint?: 'y' | 'n';
//     isForceHttps?: 'y' | 'n';
//     isSupportSsl?: 'y' | 'n';
//     keyWords?: string;
//     landingPage?: string;
//     langCodes?: string[];
//     logo?: string;
//     memo?: string;
//     onlineServiceCode?: string;
//     opsManageCode?: string;
//     ownerUserId?: string;
//     promotionCode?: string;
//     websiteInnerName?: string;
//     websiteRef?: string;
//     websiteTitle?: string;
//   };
// }

// // 定义全局状态
// export const globalStore = map<GlobalState>({
//   website: {
//     // domain: 'bbs.pwtk.cc',
//     // manageSiteId: 'pw01tk01',
//     // websiteId: '1310634689215596485',
//     // taskId: '1317182061848560381',
//     domain: '',
//     manageSiteId: '',
//     websiteId: '',
//     taskId: '',
//   },
//   domain: {
//     domain: 'bbs.pwtk.cc',
//     taskId: '1317182061848560381',
//   },
// });
// stores/globalStore.ts
// src/stores/gameStore.ts
import { map } from 'nanostores'

// Define the shape of your game data
interface GameData {
  tabIndex: number
  gameType: string | null
  gameTypeCode: string | null
}

// Create a store for the game data
export const gameDataStore = map<GameData>({
  tabIndex: 0,
  gameType: '2032',
  gameTypeCode: 'a6',
})

export interface GlobalState {
  website: {
    websiteId: string
    domain: string
    manageSiteId: string
    taskId: string
  }
  domain: {
    domain: string
    taskId: string
    websiteId: string
    appDownloadUrl?: string
    areaCodes?: string[]
    cdnUrl?: string
    createTime?: number
    descriptions?: string
    domainFrom?: string
    domainStatus?: 'y' | 'n' // "y" 表示启用，"n" 表示禁用
    domainType?: 'f' | 'p' | 'm' // 示例类型，可根据实际含义调整
    hasStatsCode?: 'y' | 'n'
    icon?: string
    isAppDownloadHint?: 'y' | 'n'
    isForceHttps?: 'y' | 'n'
    isSupportSsl?: 'y' | 'n'
    keyWords?: string
    landingPage?: string
    langCodes?: string[]
    logo?: string
    memo?: string
    onlineServiceCode?: string
    opsManageCode?: string
    ownerUserId?: string
    promotionCode?: string
    websiteInnerName?: string
    websiteRef?: string
    websiteTitle?: string
    statsCodeInit?: string
    statsCodeJsUrl?: string
  }
  GameData: any[]
}

// 声明一个 map 类型的 globalStore
export const globalStore = map<GlobalState>({
  website: {
    websiteId: '',
    domain: '',
    manageSiteId: '',
    taskId: '',
  },
  domain: {
    domain: '',
    taskId: '',
    websiteId: '',
  },
  GameData: [],
})

// stores/globalStore.ts
