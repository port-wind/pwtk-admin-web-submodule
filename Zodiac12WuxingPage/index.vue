<script setup lang="ts" name="Zodiac12WuxingPage">
import { computed } from 'vue'
import ZodiacGridArea from './components/ZodiacGridArea.vue'
import type { IDatas } from './type'

interface IProps {
  datas: IDatas
}
const props = defineProps<IProps>()

// 🎨 样式计算
const styleHeader = computed(() => props.datas.configParamJson.styleHeader)
const styleMain = computed(() => props.datas.configParamJson.styleMain)

const containerStyle = computed(() => ({
  backgroundColor: styleMain.value?.backgroundColor || '#f8f9fa',
  borderRadius: `${styleMain.value?.borderRadius || 8}px`,
  padding: `${styleMain.value?.padding || 16}px`
}))

const titleHeaderStyle = computed(() => {
  if (styleHeader.value?.isGradient) {
    return {
      background: `linear-gradient(to right, ${styleHeader.value.headerBg}, ${styleHeader.value.headerBg2})`
    }
  }
  return {
    backgroundColor: styleHeader.value?.headerBgColor || '#4A90E2'
  }
})

const mainTitleStyle = computed(() => ({
  color: styleHeader.value?.titleColor || '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 2px 0',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
}))

const subTitleStyle = computed(() => ({
  color: styleHeader.value?.subTitleColor || 'rgba(255, 255, 255, 0.9)',
  fontSize: '12px',
  margin: '0'
}))

const contentDescriptionStyle = computed(() => ({
  padding: '12px 16px',
  backgroundColor: '#f8f9fa',
  borderTop: '1px solid #e9ecef',
  fontSize: '13px',
  color: '#6c757d',
  textAlign: 'center' as const,
  lineHeight: '1.5'
}))

// 📱 导出配置供其他组件使用
defineExpose({
  config: computed(() => props.datas.configParamJson)
})
</script>

<template>
  <div class="Zodiac12WuxingPage">
    <div class="zodiac12wuxingpage-content" :style="containerStyle" v-if="datas.configParamJson.enable">
      <!-- 标题区域 -->
      <div class="title-header" :style="titleHeaderStyle">
        <h2 class="main-title" :style="mainTitleStyle">
          {{ datas.configParamJson.title || '2025蛇年（十二生肖号码对照）' }}
        </h2>
        <div v-if="datas.configParamJson.subtitle" class="sub-title" :style="subTitleStyle">
          {{ datas.configParamJson.subtitle }}
        </div>
      </div>

      <!-- 生肖网格区域 -->
      <ZodiacGridArea :config="datas.configParamJson" />

      <!-- 底部说明 -->
      <div v-if="datas.configParamJson.content" class="content-description" :style="contentDescriptionStyle">
        {{ datas.configParamJson.content }}
      </div>

      <!-- 未来可扩展区域：五行区域、其他功能区域等 -->
      <!-- <WuxingArea v-if="datas.configParamJson.showWuxing" :config="datas.configParamJson" /> -->
      <!-- <StatisticsArea v-if="datas.configParamJson.showStats" :config="datas.configParamJson" /> -->
    </div>

    <!-- 必需的删除按钮插槽 -->
    <slot name="deles" />
  </div>
</template>

<style scoped lang="scss">
.Zodiac12WuxingPage {
  position: relative;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;

  .zodiac12wuxingpage-content {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .title-header {
    padding: 12px 16px;
    text-align: center;
  }
}
</style>
