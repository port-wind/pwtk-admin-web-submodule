<template>
  <div>
    <!-- 模式1 -->
    <section v-if="data.model === 's1'">
      <van-sticky v-if="data.tabsAttr.sticky" :offset-top="data.tabsAttr.offsetTop">
        <van-tabs v-bind="data.tabsAttr" v-model="activeTab" @click-tab="handleTabClick">
          <van-tab v-for="tab in data.itemData" :name="tab.id" :key="tab.id" :title="tab.name"></van-tab>
        </van-tabs>
      </van-sticky>
      <div v-else>
        <van-tabs v-bind="data.tabsAttr" v-model="activeTab" @click-tab="handleTabClick">
          <van-tab v-for="tab in data.itemData" :name="tab.id" :key="tab.id" :title="tab.name"></van-tab>
        </van-tabs>
      </div>
    </section>
    <!-- 模式2 -->
    <section v-else-if="data.model === 's2'">
      <div>模式2正在开发中</div>
    </section>
    <!-- 模式3 -->
    <section v-else>
      <div>模式3正在开发中</div>
    </section>
  </div>
</template>

<script setup lang="ts" name="NavBar">
import { onMounted, ref } from 'vue'
import { Tabs as VanTabs, Tab as VanTab, Sticky as VanSticky } from 'vant'
// import service from '@/service';
// import utils from '@/utils';
// import constants from '@/constants';

// 定义 Tab 数据类型
interface NavType {
  model: 's1' | 's2' | 's3'
  tabsAttr: {
    [key: string]: any
  }
  bgColor: string
  itemData: Tab[]
}
interface Tab {
  id: string
  name?: string
}

const props = defineProps({
  data: {
    type: Object as () => NavType,
    required: true
  }
})

// console.log('props', props.data)

// 当前激活的 Tab
const activeTab = ref<string>(props.data?.itemData?.[0].id ?? 'box1')

// 处理标签页点击事件
const handleTabClick = (obj: any) => {
  // console.log(obj);
  // 这里可以添加额外的逻辑，比如滚动到对应的锚点
  const element = document.getElementById(obj.name)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// const BBS_LIST = JSON.parse(utils.getSession(constants.sessionStorageKeys.BBS_LIST) || '');
// console.log('BBS_LISTnav', BBS_LIST);
// const bbs_list = ref([]);

interface BBSItem {
  id: string
  name: string
}

// const findName = (id: string): BBSItem | undefined => {
//   return bbs_list.value.find((item: BBSItem) => item.id === id);
// };
// const bbs_list = ref(BBS_LIST);

onMounted(async () => {
  // const BBS_LIST = JSON.parse(utils.getSession(constants.sessionStorageKeys.BBS_LIST) || '[]');
  // bbs_list.value = BBS_LIST;
  // await getBBSListData();
})

// const backgroundStyle = {
//   background: props.data.bgColor
//     ? props.data.bgColor // 如果传入单色，则使用单色
//     : `linear-gradient(
//         var(--gradient-direction, 0deg),
//         var(--second-color),
//         var(--theme-color)
//       )`, // 否则使用默认渐变
// };
</script>

<style scoped>
/* 添加一些样式以便更好地展示 */
:deep(.van-tabs__wrap) {
  height: 2rem;
  .van-tabs__nav {
    background: linear-gradient(var(--gradient-direction, 0deg), var(--second-color), var(--theme-color));
  }

  van-tabs__nav,
  .van-tabs__nav--card {
    width: 100%;
    margin: 0;
  }
  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 0;
    padding-right: 0;
  }
  .van-tab--grow {
    padding: 0 0.3rem;
  }

  .van-tab {
    color: #f2f2f2;
  }
  .van-tab--active {
    color: #fff;
  }
  .van-tabs__line {
    background-color: #fff;
    color: #fff;
    height: 0.1rem;
  }
}
</style>
