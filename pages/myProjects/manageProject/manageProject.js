// pages/myProjects/manageProject/manageProject.js
const requests=require("../../../func/prjRequests.js");
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    project:{
    },
    subProjects:[
    ]
  },

  goToProject: function(){
    if (this.data.project.isMyProject){
      var id = 2
      var isMyProject = false
      wx.navigateTo({
        url: "/pages/myProjects/manageProject/manageProject?id=" + id + "&isMyProject=" + isMyProject,
        // url: "/pages/myProjects/alterProject/alterProject?id=" + id,
        // url: "/pages/detail/detail?id=" + id,
        // url: "/pages/addProject/addProject",
      })
    }else{
      console.log("fuck")
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var args = { userId: app.globalData.openId, projectId: options.id}
    var a=requests.getProjectByProjectIdAndUserId(args);
    this.setData({
      project:a
    })
  },

  getProjectInfo: function(){

  },

  join: function(){

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})