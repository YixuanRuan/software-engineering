// pages/detail/detail.js
const requests=require("../../func/prjRequests.js")
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    projectId:0,
    project:{}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      projectId: options.projectId,
    })
    var that=this
    requests.getProjectByProjectIdAndUserId(app.globalData.openId, projectId).then(
      data=>{
        that.setData({
          project:data
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