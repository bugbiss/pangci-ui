import { ref, onMounted } from 'vue'
import { getScrollContanier } from '@/utils'

export function useScrollParent (el) {
  const scrollParent = ref()

  onMounted(() => {
    if (el.value) {
      scrollParent.value = getScrollContanier(el.value)
    }
  })

  return scrollParent
}
