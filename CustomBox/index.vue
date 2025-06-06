<script>
export default {
  name: 'CustomBox',
  data() {
    return {
      jsonData: []
    }
  }
}
</script>

<template>
  <div class="custombox">
    <div class="custombox-container">
      <div class="custombox-header">
        <h1>CustomBox</h1>
      </div>
      <div class="custombox-content">
        <h1>CustomBox</h1>
      </div>
    </div>
    <slot name="deles" />
  </div>
</template>

<style scoped lang="less">
.custombox {
  // 必须要这样写，deles 才可以显示到正确位置上
  position: relative;
  // padding: 0 6px;
}
.custombox-container {
  min-height: 200px;
}
</style>
