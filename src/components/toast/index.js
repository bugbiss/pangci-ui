import { createApp, reactive, nextTick, getCurrentInstance } from 'vue'
import ToastComponent from './Toast'

let singleInstance
const defaultOptions = {
  icon: '',
  message: '',
  duration: 2000
}

const createInstance = () => {
  const app = createApp({
    setup () {
      const state = reactive({
        show: false
      })

      const toggle = (show) => {
        state.show = show
      }

      const open = (props) => {
        Object.assign(state, props)

        nextTick(() => {
          toggle(true)
        })
      }

      const close = () => {
        toggle(false)
      }

      const closed = () => {
        singleInstance = null
        unmount()
      }

      getCurrentInstance().render = () => {
        const props = {
          ...state,
          toggle,
          closed
        }
        return <ToastComponent {...props} />
      }

      return {
        open,
        close,
        closed
      }
    }
  })

  const root = document.createElement('div')
  document.body.appendChild(root)
  const instance = app.mount(root)
  const unmount = () => {
    app.unmount(root)
    document.body.removeChild(root)
  }

  return instance
}

const getInstance = () => {
  if (!singleInstance) {
    singleInstance = createInstance()
  }

  return singleInstance
}

const Toast = (options = {}) => {
  const toast = getInstance()
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  options = {
    ...defaultOptions,
    ...options
  }
  toast.open(options)

  return toast
}

Toast.close = () => {
  const toast = getInstance()
  toast.closed()
}

Toast.install = (app) => {
  app.component(ToastComponent.name, ToastComponent)
  app.config.globalProperties.$toast = Toast
}

export default Toast
