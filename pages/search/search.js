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
    console.log(projectId)
    wx.navigateTo({
      url: "/pages/detail/detail?projectId=" + projectId,
    })
  },
  onShow: function(){
    var that=this
    requests.getAllProjects().then(
      data=>{
        console.log(1)
        console.log(data)
        that.setData({
          projects: data
        })
      }
    )
  }
})