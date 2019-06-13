//app.js
const requests = require("./func/prjRequests.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
  },
  getOpenId: function(){
    var that=this
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log(res)
          requests.getUserId(res.code).then(
            data => {
              this.globalData.openId = data.id
              console.log("用户id是")
              console.log(this.globalData.openId)
              resolve(this.globalData.openId)
            }
          )
        },
        fail: res => {
          console.log(res)
        }
      })
    })
  },
  globalData: {
    openId:0
  }
})