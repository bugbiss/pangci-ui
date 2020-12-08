import { Transition, watch } from 'vue'
import './index.less'

const Popup = {
  name: 'PancPopup',
  props: {
    show: Boolean
  },
  emits: [
    'close',
    'update:show'
  ],
  setup (props, { emit, slots }) {
    const close = () => {
      emit('update:show', false)
      emit('close')
    }

    watch(
      () => props.show,
      (value) => {
        if (!value) {
          close()
        }
      }
    )

    // 渲染遮罩
    const renderOverlay = () => (
      <Transition name="fade-in">
        <div
          class="panc-popup-overlay"
          v-show={props.show}
          onClick={close}
        ></div>
      </Transition>
    )

    // 渲染面板
    const renderPanel = () => (
      <Transition name="slide-up">
        <div
          class="panc-popup-Panel"
          v-show={props.show}
        >
          {slots.default && slots.default()}
        </div>
      </Transition>
    )

    return () => (
      <>
        {renderOverlay()}
        {renderPanel()}
      </>
    )
  }
}

Popup.install = (app) => {
  app.component(Popup.name, Popup)
}

export default Popup
