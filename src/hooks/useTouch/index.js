import { ref } from 'vue'

const MIN_DISTANCE = 10

const getDirection = (x, y) => {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

export const useTouch = () => {
  const startX = ref(0)
  const startY = ref(0)
  const disX = ref(0)
  const disY = ref(0)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const direction = ref('')

  const isVertical = () => direction.value === 'vertical'
  const isHorizontal = () => direction.value === 'horizontal'

  const reset = () => {
    disX.value = 0
    disY.value = 0
    offsetX.value = 0
    offsetY.value = 0
    direction.value = ''
  }

  const start = (event) => {
    reset()
    startX.value = event.touches[0].clientX
    startY.value = event.touches[0].clientY
  }

  const move = (event) => {
    const touch = event.touches[0]
    disX.value = touch.clientX - startX.value
    disY.value = touch.clientY - startY.value
    offsetX.value = Math.abs(disX.value)
    offsetY.value = Math.abs(disY.value)
    if (!direction.value) {
      direction.value = getDirection(offsetX.value, offsetY.value)
    }
  }

  return {
    startX,
    startY,
    disX,
    disY,
    offsetX,
    offsetY,
    direction,
    reset,
    start,
    move,
    isVertical,
    isHorizontal
  }
}
