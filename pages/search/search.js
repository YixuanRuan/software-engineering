const requests = require("../../func/prjRequests.js")
const app = getApp()
var arr_name = ["美容", "保健养生", "其他"]
var arr_link = [1, 10, 15]
Page({
  data: {
    projects: [],
  },
  viewDetail: function (e) {
    var projectId = e.currentTarget.dataset.projectid
    wx.navigateTo({
      url: "/pages/detail/detail?projectId=" + projectId,
    })
  },
  onShow: function(){
    var that=this
    app.getOpenId().then(
      data=>{
        console.log(data)
        requests.getAllProjects(data).then(
          data => {
            that.setData({
              projects: data
            })
          }
        )
      }
    )
  }
})