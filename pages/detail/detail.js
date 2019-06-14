// pages/detail/detail.js
const requests=require("../../func/prjRequests.js")
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    projectId: 0,
    isJoined: false,
    isLaucher: false,
    subtask: [],
    project: {},
    laucher:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.projectId,
    })
    var that=this
    requests.getProjectByProjectIdAndUserId(app.globalData.openId, options.projectId).then(
      data=>{
        console.log(data)
        that.setData({
          isJoined: data.isJoined,
          isLaucher: data.isLaucher,
          project: data.project,
          subtask: data.subtask,
          laucher: data.laucher
        })
      }
    )
  },

  join: function(){
    requests.joinProject(app.globalData.openId,this.data.projectId).then(
      data=>{
        wx.showToast({
          title: '成功加入项目！'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 700)
      }
    )
  },
})