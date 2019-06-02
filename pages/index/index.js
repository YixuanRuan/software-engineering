var app = getApp()
Page({
  data: {
    value: '1',
    checked: true,
    userID: 16721084,
    userTask: '前端开发',
    id:app.globalData.userID
  },

    onLoad: function () {
        var that = this
        
        wx.request({
          url: 'http://114.115.151.96:8080/user/get',
          data: {
            id:1
          },
          method: 'GET',
          success: function (res) {
                //将获取到的json数据，存在名字叫list的这个数组中
                that.setData({
                    list: res.data,
                    userID: res.data.User.userId
                    //res代表success函数的事件对，data是固定的，list是数组
                })
                console.log(res.data);// 控制台显示 1
            }
        })


    }
})