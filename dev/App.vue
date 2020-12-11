<template>
  <div id="app">
    <div class="content"></div>
    <sticky :offset-top="50">
      <div class="box"></div>
    </sticky>
    <div class="xxx"></div>
  </div>
</template>

<script>
import sticky from '@/components/sticky'

export default {
  components: {
    sticky
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}

#app {
  height: 100vh;
  overflow-y: scroll;
}

.content {
  height: 200px;
  background: #cccccc;
}

.box {
  height: 50px;
  background: skyblue;
}

.xxx {
  height: 1000px;
  background: #cccccc;
}
</style>
