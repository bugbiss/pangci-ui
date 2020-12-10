<template>
  <div id="app">
    <div class="content"></div>
    <sticky>
      <div class="box"></div>
    </sticky>
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
  height: 2000px;
}

.content {
  height: 200px;
  background: #cccccc;
}

.box {
  height: 50px;
  background: skyblue;
}
</style>
