<template>
  <div class="PostDetailsBox">
    <div class="post-details-box-container">
      <StateManager :loading="isLoading" :error="isError">
        <div v-if="datas.configParamJson.model === 's1'">
          <!-- s3 模式的内容 -->
          <ModelThree v-if="bbs_content" :bbs_content="bbs_content" :data="datas.configParamJson" />
        </div>
        <div v-else-if="datas.configParamJson.model === 's2'">
          <!-- s2 模式的内容 -->
          <ModelFour v-if="bbs_content" :bbs_content="bbs_content" :data="datas.configParamJson" />
        </div>
        <div v-else-if="datas.configParamJson.model === 's3'">
          <!-- s2 模式的内容 -->
          <ModelFive v-if="bbs_content" :bbs_content="bbs_content" :data="datas.configParamJson" />
        </div>
        <div v-else>
          <p>{{ datas.configParamJson.model }}此模式尚未开发</p>
        </div>
      </StateManager>
    </div>
    <slot name="deles" />
  </div>
</template>

<script setup lang="ts" name="PostDetailsBox">
import { onMounted, ref } from 'vue'
import type { PostDetail } from './NavBBSListBox'
// import { gameDataStore } from '@/store'
import StateManager from '@/components/Vue/components/StateManager.vue'
import ModelThree from './PostBox/ModelThree.vue'
import ModelFour from './PostBox/ModelFour.vue'
import ModelFive from './PostBox/ModelFive.vue'
import service from '@/service'
import utils from '@/utils'

interface IConfigParamJson {
  jsonData: any[]
  postIdData: any[]
  text: string
  title: string
  model: string
  pageSize: number
  id: string
  align: 'center'
}

interface IDatas {
  configParamJson: IConfigParamJson
}

const props = defineProps<{ datas: IDatas }>()

const isLoading = ref(false)
const isError = ref(false)
const postId = new URL(window.location.href).searchParams.get('postId')

const data = ref<PostDetail>(props.datas.configParamJson)
console.log('🚀 ~ data:', data)

const bbs_content = ref()
const gameType = ref('a6') // ref(gameDataStore.get().gameType)

const getBBSDetail = async () => {
  const postData = data.value.postIdData?.find((item) => item.gameType === gameType.value)
  console.log('🚀 ~ getBBSDetail ~ postData:', postData)
  // console.log('getBBSDetail', postData?.postId)
  // if (!props.data.postIdData) return showFailToast('postId未配置');
  // console.log('gameDataStore', gameDataStore.get()); //gameDataStore.get()
  // return;
  try {
    isLoading.value = true
    const response = await service.bbs.getDetailPost({
      postId: postData?.postId //实际这里用的是postId也就是帖子ID
    })
    // console.log(response);
    if (response.data.success) {
      bbs_content.value = response.data.data
      data.value.title = response.data.data.title

      // _title.value = response.data.data.title
      // console.log(bbs_content.value)
      // console.log(BBS_Data.value);
    } else {
      isError.value = true
    }
  } catch (error) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

// gameDataStore.subscribe(async (item) => {
//   // console.log('gameDataStore', data, gameType.value)
//   //   console.log('gameDataStore 更新')
//   if (item.gameType && (gameType.value = item.gameType)) {
//     switch (data.value.model) {
//       case 's1':
//       case 's2': //获取帖子详情
//       case 's3': //获取帖子详情
//         await getBBSDetail()
//         break

//       default:
//         console.log('无匹配到模版', data.value.model)
//         break
//     }
//   }
// })
onMounted(async () => {
  await getBBSDetail()
})
</script>

<style scoped lang="less">
.PostDetailsBox {
  position: relative;
}
</style>
