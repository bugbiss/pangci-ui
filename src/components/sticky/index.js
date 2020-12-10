import { ref, reactive, computed } from 'vue'
import { useEventListener, useScrollParent } from '@/hooks'
import { unitToPx, getScrollTop, getOffsetTop } from '@/utils'
import './index.css'

const Sticky = {
  name: 'PancSticky',
  props: {
    zIndex: [Number, String],
    offsetTop: {
      type: [Number, String],
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, { emit, slots }) {
    const root = ref()
    const scrollParent = useScrollParent(root)

    const state = reactive({
      fixed: false,
      height: 0,
      transform: 0
    })

    const offsetTop = computed(() => unitToPx(props.offsetTop))

    const style = computed(() => {
      if (!state.fixed) {
        return
      }

      const top = offsetTop.value ? `${offsetTop.value}px` : undefined
      const transform = state.transform ? `translate3d(0, ${state.transform}px, 0)` : undefined

      return {
        top,
        zIndex: props.zIndex !== undefined ? +props.zIndex : undefined,
        transform
      }
    })

    const emitScrollEvent = (scrollTop) => {
      emit('scroll', {
        scrollTop,
        isFixed: state.fixed
      })
    }

    const onScroll = (e) => {
      if (!root.value) {
        return
      }

      state.height = root.value.offsetHeight
      const scrollTop = getScrollTop(scrollParent.value)
      const elOffsetTop = getOffsetTop(root.value)

      if (scrollTop + offsetTop.value > elOffsetTop) {
        state.fixed = true
        state.transform = 0
      } else {
        state.fixed = false
      }

      emitScrollEvent(scrollTop)
    }

    useEventListener('scroll', onScroll, { target: scrollParent })

    return () => {
      const { fixed, height } = state
      const fixedClassName = fixed ? 'panc-sticky-fixed' : undefined
      const rootStyle = {
        height: fixed ? `${height}px` : undefined
      }

      return (
        <div ref={root} style={rootStyle}>
          <div class={fixedClassName} style={style.value}>
            {slots.default && slots.default()}
          </div>
        </div>
      )
    }
  }
}

Sticky.install = (app) => {
  app.component(Sticky.name, Sticky)
}

export default Sticky
