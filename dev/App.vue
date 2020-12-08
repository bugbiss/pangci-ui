<template>
  <div id="app">
    <button @click="onClick">click me</button>
    {{show}}
    <popup v-model:show="show">
      123
    </popup>
  </div>
</template>

<script>
import popup from '@/components/popup'
import { ref } from 'vue'

export default {
  components: {
    popup
  },
  setup () {
    const show = ref(false)

    const onClick = () => {
      show.value = true
    }

    return {
      show,
      onClick
    }
  }
}
</script>
