import { ref, reactive, unref, computed } from 'vue'
import { range } from '@/utils'
import { useTouch, useRect } from '@/hooks'
import './index.less'

const SwipeCell = {
  name: 'PancSwipeCell',
  emits: ['open', 'close', 'click'],
  setup (props, { emit, slots }) {
    let opened
    let startOffset

    const root = ref()
    const leftRef = ref()
    const rightRef = ref()

    const state = reactive({
      offset: 0,
      dragging: false
    })

    const touch = useTouch()

    const getWidthByRef = (ref) => (ref.value ? useRect(ref).width : 0)

    const leftWidth = computed(() => getWidthByRef(leftRef))

    const rightWidth = computed(() => getWidthByRef(rightRef))

    const open = (position) => {
      opened = true
      state.offset = position === 'left' ? leftWidth.value : -rightWidth.value

      emit('open', { position })
    }

    const close = (position) => {
      state.offset = 0

      if (opened) {
        opened = false
        emit('close', { position })
      }
    }

    const toggle = (position) => {
      const offset = Math.abs(state.offset)
      const THRESHOLD = 0.15
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD
      const width = position === 'left' ? leftWidth.value : rightWidth.value
      if (width && offset > width * threshold) {
        open(position)
        return
      }

      close()
    }

    const onTouchStart = (event) => {
      startOffset = state.offset
      touch.start(event)
    }

    const onTouchMove = (event) => {
      const { disX } = touch
      touch.move(event)

      if (touch.isHorizontal()) {
        state.dragging = true

        state.offset = range(
          disX.value + startOffset,
          -rightWidth.value,
          leftWidth.value
        )
        // console.log(state.offset)
      }
    }

    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false
        toggle(state.offset > 0 ? 'left' : 'right')
      }
    }

    const onClick = (position = 'outside') => {
      emit('click', position)

      if (opened) {
        close(position)
      }
    }

    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation()
      }
      onClick(position)
    }

    const renderSideContent = (position, ref) => {
      if (slots[position]) {
        return (
          <div
            ref={ref}
            class={`panc-swipe-cell-${position}`}
            onClick={getClickHandler(position, true)}
          >
            {slots[position]()}
          </div>
        )
      }
    }

    document.addEventListener('touchstart', (event) => {
      const element = unref(root)
      if (element && !element.contains(event.target)) {
        onClick(event)
      }
    })

    return () => {
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? '0s' : '.5s'
      }

      return (
        <div
          ref={root}
          class="panc-swipe-cell"
          onClick={getClickHandler('cell')}
          onTouchstart={onTouchStart}
          onTouchmove={onTouchMove}
          onTouchend={onTouchEnd}
          onTouchcancel={onTouchEnd}
        >
          <div class="panc-swipe-cell-wrapper" style={wrapperStyle}>
            {renderSideContent('left', leftRef)}
            {slots.default && slots.default()}
            {renderSideContent('right', rightRef)}
          </div>
        </div>
      )
    }
  }
}

SwipeCell.install = (app) => {
  app.component(SwipeCell.name, SwipeCell)
}

export default SwipeCell
