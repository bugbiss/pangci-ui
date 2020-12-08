import { unref, onMounted, onBeforeUnmount } from 'vue'

function useEventListener (
  eventName,
  handler,
  options = {}
) {
  const { target = window, capture = false, once = false, passive = false } = options

  const add = () => {
    const element = unref(target)
    element.addEventListener(eventName, handler, {
      capture,
      once,
      passive
    })
  }

  const remove = () => {
    const element = unref(target)
    element.removeEventListener(eventName, handler, {
      capture
    })
  }

  onMounted(add)
  onBeforeUnmount(remove)
}

export default useEventListener
