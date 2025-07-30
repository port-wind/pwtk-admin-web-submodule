import { computed, ref, watch } from 'vue'

/**
 * 🎮 GameType Fields Composable
 * 处理动态彩种字段的生成、初始化和管理
 */
export function useMultiGameType(datas: any) {
  const activeTab = ref<string>('')

  const selectedGameTypes = computed(() => datas.configParamJson.selectedGameTypes)
  const activeGameType = computed(() => {
    return selectedGameTypes.value.find((item) => item.active)
  })

  const handleTabClick = (_: any) => {
    selectedGameTypes.value.forEach((gt) => {
      if (gt.gameType === activeTab.value) {
        gt.active = true
      } else {
        gt.active = false
      }
    })
  }
  const handleActiveGameType = (gameType: string) => {
    selectedGameTypes.value.forEach((item) => {
      if (item.gameType === gameType) {
        item.active = true
      } else {
        item.active = false
      }
    })
  }
  // 当activeTab为空且有selectedGameTypes时，设置第一个为活跃状态
  watch(
    selectedGameTypes,
    (newGameTypes) => {
      if (newGameTypes.length > 0 && !activeTab.value) {
        activeTab.value = newGameTypes[0].gameType
        handleTabClick(activeTab.value)
      }
      // 如果当前activeTab不在新的游戏类型列表中，设置为第一个
      if (newGameTypes.length > 0 && !newGameTypes.find((gt) => gt.gameType === activeTab.value)) {
        activeTab.value = newGameTypes[0].gameType
        handleTabClick(activeTab.value)
      }
    },
    { immediate: true }
  )
  return {
    activeGameType,
    activeTab,
    selectedGameTypes,
    handleActiveGameType,
    handleTabClick
  }
}
