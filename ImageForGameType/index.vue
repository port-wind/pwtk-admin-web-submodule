<script setup lang="ts" name="ImageForGameType">
import { computed, ref, watch, onMounted, reactive } from 'vue'
import { useStore } from '@nanostores/vue'
import { Loading } from '@element-plus/icons-vue'
import { gameStore } from '../store/index'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 🎮 gameType Store 集成 - 动态组件必需
const gameStoreData = useStore(gameStore)
const gameType = computed(() => gameStoreData.value.gameType)
const currentGame = computed(() => gameStoreData.value.currentGame)
const currentGameName = computed(() => currentGame.value?.name || '未知游戏')

// 🔄 响应式参数对象，与配置同步
const componentParams = reactive({
  gameType: props.datas.configParamJson.gameType || gameType.value,
  size: props.datas.configParamJson.size || 10,
  forumId: props.datas.configParamJson.forumId || '10'
})

// 组件状态
const loading = ref(false)
const gameData = ref([])
const error = ref(null)

// 样式计算
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

const containerStyle = computed(() => ({
  backgroundColor: styleMain.value?.backgroundColor || '#ffffff',
  borderRadius: `${styleMain.value?.borderRadius || 0}px`,
  padding: `${styleMain.value?.padding || 16}px`,
  margin: `${styleMain.value?.margin || 0}px`
}))

const titleHeaderStyle = computed(() => {
  if (styleHeader.value?.isGradient) {
    return {
      background: `linear-gradient(to right, ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  }
  return {
    backgroundColor: styleHeader.value?.headerBgColor || '#4a90e2'
  }
})

const mainTitleStyle = computed(() => ({
  color: styleHeader.value?.titleColor || '#ffffff'
}))

const subTitleStyle = computed(() => ({
  color: styleHeader.value?.subTitleColor || '#ffffff'
}))

const contentStyle = computed(() => ({
  color: styleMain.value?.textColor || '#333333',
  fontSize: `${styleMain.value?.fontSize || 14}px`,
  fontWeight: styleMain.value?.fontWeight || 400,
  textAlign: styleMain.value?.textAlign || 'center',
  lineHeight: '1.5'
}))

// 🎮 游戏相关数据获取
const fetchGameData = async (gameType: string) => {
  if (!gameType) return
  
  loading.value = true
  error.value = null
  
  try {
    // TODO: 根据具体需求实现数据获取逻辑
    console.log(`🎮 获取游戏数据: ${gameType}`)
    
    // 模拟API调用
    // const response = await fetchSpecificGameData(gameType)
    // gameData.value = response.data || []
    
    // 临时数据
    gameData.value = [
      { id: 1, title: `${currentGameName.value}数据1`, content: '示例内容' },
      { id: 2, title: `${currentGameName.value}数据2`, content: '示例内容' }
    ]
  } catch (err) {
    error.value = err
    console.error('获取游戏数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 🎯 监听游戏类型变化 - 全局store变化
watch(gameType, (newGameType) => {
  if (newGameType) {
    componentParams.gameType = newGameType
    console.log(`🎮 全局游戏类型变化: ${newGameType}`)
    fetchGameData(newGameType)
  }
}, { immediate: true })

// 📊 监听组件配置变化
watch(
  () => [props.datas.configParamJson.gameType, props.datas.configParamJson.size, props.datas.configParamJson.forumId],
  ([newGameType, newSize, newForumId]) => {
    if (newGameType) componentParams.gameType = newGameType
    if (newSize) componentParams.size = Number(newSize)
    if (newForumId) componentParams.forumId = String(newForumId)
    
    // 当配置的gameType变化时，重新获取数据
    if (newGameType && newGameType !== componentParams.gameType) {
      fetchGameData(newGameType)
    }
  },
  { deep: true }
)

// 🎮 游戏切换监听
watch(currentGame, (newGame) => {
  if (newGame) {
    fetchGameData(newGame.type || gameType.value)
  }
})

onMounted(() => {
  if (gameType.value) {
    fetchGameData(gameType.value)
  }
})
</script>

<template>
  <div class="ImageForGameType">
    <div 
      class="imageforgametype-content" 
      :style="containerStyle"
      v-if="datas.configParamJson.enable"
    >
      <!-- 标题区域 - 支持动态游戏名称 -->
      <div v-if="datas.configParamJson.title" class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">
          {{ datas.configParamJson.title }} - {{ currentGameName }}
        </h2>
        <span v-if="datas.configParamJson.subtitle" class="sub-title" :style="subTitleStyle">
          {{ datas.configParamJson.subtitle }}
        </span>
      </div>
      
      <!-- 动态内容区域 -->
      <div class="content-area" :style="contentStyle">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span>正在加载{{ currentGameName }}数据...</span>
        </div>
        
        <!-- 数据展示 -->
        <div v-else-if="gameData && gameData.length > 0" class="game-data-list">
          <div 
            v-for="(item, index) in gameData" 
            :key="item.id || index"
            class="game-data-item"
          >
            <div class="item-title">{{ item.title }}</div>
            <div class="item-content">{{ item.content }}</div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div v-else class="empty-state">
          <el-empty :description="`暂无${currentGameName}数据`" />
        </div>
      </div>
    </div>
    
    <!-- 必需的删除按钮插槽 -->
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.ImageForGameType {
  position: relative;
  
  .imageforgametype-content {
    // 动态样式通过 computed 属性控制
  }
  
  .title-header {
    padding: 12px 16px;
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .main-title {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }
    
    .sub-title {
      font-size: 14px;
      opacity: 0.9;
    }
  }
  
  .content-area {
    padding: 16px;
    min-height: 120px;
    
    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 40px;
      color: #666;
    }
    
    .game-data-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .game-data-item {
        padding: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: #4a90e2;
          box-shadow: 0 2px 8px rgba(74, 144, 226, 0.1);
        }
        
        .item-title {
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }
        
        .item-content {
          color: #666;
          font-size: 14px;
        }
      }
    }
    
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
    }
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    .title-header {
      padding: 8px 12px;
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
    
    .content-area {
      padding: 12px;
      
      .game-data-item {
        padding: 8px;
      }
    }
  }
}
</style>