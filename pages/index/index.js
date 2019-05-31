Page({
  data: {
    value: '1',
    checked: true,
    userID: 16721084,
    userTask: '前端开发',
  },
  sliderChange(e) {
    this.setData({
      slider: e.detail.value,
    })
  },
  bindchange(e) {
    console.log(e)
  },
})