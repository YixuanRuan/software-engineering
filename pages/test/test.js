import { $wuxToast } from '../../dist/index'

Page({
  data: {},
  onLoad() { },
  showToastReturn() {
    if (this.timeout) clearTimeout(this.timeout)

    const hide = $wuxToast().show({
      type: 'success',
      duration: 1500,
      color: '#fff',
      text: '已完成',
    })

    this.timeout = setTimeout(hide, 1000)
  },
})
