const requests = require("../../func/prjRequests.js")
const app = getApp()
var arr_name = ["美容", "保健养生", "其他"]
var arr_link = [1, 10, 15]
Page({
  data: {
    projects: [],
  },
  viewDetail: function (e) {
    var id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id,
    })
  },
  onShow: function(){
    var projects=[]
    projects = requests.getAllProjects()
    // while (projects == undefined){
    //   console.log(projects)
    // }
    console.log(1)
    console.log(projects)
    this.setData({
      projects:projects
    })
  }
})