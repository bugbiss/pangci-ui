<template>
  <swipe-cell>
    <template #left>
      <div class="box1"></div>
    </template>
    <div class="content"></div>
    <template #right>
      <div class="box2"></div>
    </template>
  </swipe-cell>
</template>

<script>
import swipeCell from '@/components/swipe-cell'

export default {
  components: {
    swipeCell
  }
}
</script>

<style lang="less">
body {
  margin: 0;
}
.content {
  height: 50px;
  background: #ccc;
}
.box1, .box2 {
  width: 50px;
  height: 100%;
}
.box1 {
  background: skyblue;
}
.box2 {
  background: pink;
}
</style>
