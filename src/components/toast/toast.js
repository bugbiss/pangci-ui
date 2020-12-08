import { Transition } from 'vue'
import './index.less'

const ToastComponent = {
  name: 'PancToast',
  props: {
    icon: String,
    show: Boolean,
    message: [Number, String],
    duration: Number,
    toggle: Function,
    closed: Function
  },

  setup (props, { emit }) {
    let timer

    const clearTimer = () => {
      clearTimeout(timer)
    }

    const onClick = () => {
      props.toggle(false)
    }

    const renderIcon = () => {
      if (props.icon) {
        return <img src={props.icon} />
      }
    }

    const renderMessage = () => {
      if (props.message !== '') {
        return (
          <div class="text">{props.message}</div>
        )
      }
    }

    const handleVisible = () => {
      if (props.duration === 0) return
      clearTimer()
      timer = setTimeout(() => {
        props.toggle(false)
      }, props.duration)
    }

    const onOpened = () => {
      handleVisible()
    }

    const onClosed = () => {
      props.closed()
    }

    return () => (
      <Transition
        name="fade-in"
        onBeforeEnter={onOpened}
        onAfterLeave={onClosed}
      >
        <div
          v-show={props.show}
          class={`panc-toast ${props.icon ? 'panc-toast-wrap' : ''}`}
          onClick={onClick}
        >
          {renderIcon()}
          {renderMessage()}
        </div>
      </Transition>
    )
  }
}

export default ToastComponent
