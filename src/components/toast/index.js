import './index.less'

const Toast = {
  setup () {
    const handle = () => {
      console.log('xixixi')
    }

    return () => (
      <div class="toast" onClick={ handle }>toast</div>
    )
  }
}

export default Toast
