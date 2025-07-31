import { useStore } from '@nanostores/vue'
import { computed, ref, watch } from 'vue'
import { gameStore, setGameType } from '../store'

/**
 * 🎮 GameType Fields Composable
 * 处理动态彩种字段的生成、初始化和管理
 */
export function useMultiGameType(datas: any) {
  const activeTab = ref<string>('')
  const gameStoreData = useStore(gameStore)
  const gameType = computed(() => gameStoreData.value.gameType)
  const selectedGameTypes = ref(datas.value.configParamJson.selectedGameTypes)
  const activeGameType = computed(() => {
    console.log('activeGameType computed', selectedGameTypes.value)
    return selectedGameTypes.value.find(item => item.active)
  })
  const showComponent = computed(() => {
    console.log(activeGameType.value, gameType.value)
    return !!activeGameType.value && activeGameType.value.gameType === gameType.value
  })

  const handleActiveGameType = (g: string) => {
    const newSelectedGameTypes = selectedGameTypes.value.map((item: any) => {
      if (item.gameType === g) {
        item.active = true
      } else {
        item.active = false
      }
      return item
    })
    setSelectedGameTypes(newSelectedGameTypes)
    console.log('list updated', newSelectedGameTypes)
  }
  const handleTabClick = (g: any) => {
    handleActiveGameType(g)
    setGameType(activeTab.value)
  }
  const setSelectedGameTypes = (gameTypes: any) => {
    datas.value.configParamJson.selectedGameTypes = gameTypes
  }
  // 当activeTab为空且有selectedGameTypes时，设置第一个为活跃状态
  watch(
    selectedGameTypes,
    newGameTypes => {
      if (newGameTypes.length > 0 && !activeTab.value) {
        activeTab.value = newGameTypes[0].gameType
        handleTabClick(activeTab.value)
      }
      // 如果当前activeTab不在新的游戏类型列表中，设置为第一个
      if (newGameTypes.length > 0 && !newGameTypes.find(gt => gt.gameType === activeTab.value)) {
        activeTab.value = newGameTypes[0].gameType
        handleTabClick(activeTab.value)
      }
    },
    { immediate: true }
  )
  watch(gameType, newGameType => {
    console.log('gameType changed', newGameType)
    handleActiveGameType(newGameType)
  })
  return {
    activeGameType,
    activeTab,
    selectedGameTypes,
    showComponent,
    setSelectedGameTypes,
    handleActiveGameType,
    handleTabClick,
  }
}
