Page({
  data: {
    items:[]
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://114.115.151.96:8080/message/get',
      data: {
        id: 12
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          items:res.data.message,
        })
        console.log(that.data.items);
      }
    })
  },
})
