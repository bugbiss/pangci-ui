<template>
  <div id="app">
    <button @click="onClick">click me</button>
  </div>
</template>

<script>
import toast from '@/components/toast'

export default {
  setup () {
    const onClick = () => {
      toast('嘻嘻嘻')
    }

    return {
      onClick
    }
  }
}
</script>
