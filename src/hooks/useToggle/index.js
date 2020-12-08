import { ref } from 'vue'

// defaultValue: 默认的状态值
// reverseValue: 取反的状态值
function useToggle (
  defaultValue = false,
  reverseValue
) {
  const state = ref(defaultValue)

  const reverseValueOrigin = reverseValue === undefined ? !defaultValue : reverseValue

  const toggle = (value) => {
    if (value !== undefined) {
      state.value = value
      return
    }
    state.value = state.value === defaultValue ? reverseValueOrigin : defaultValue
  }
  // 设置默认值
  const setLeft = () => {
    state.value = defaultValue
  }
  // 设置取反值
  const setRight = () => {
    state.value = reverseValueOrigin
  }

  return {
    state,
    toggle,
    setLeft,
    setRight
  }
}

export default useToggle
