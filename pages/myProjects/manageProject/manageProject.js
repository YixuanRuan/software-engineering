// pages/myProjects/manageProject/manageProject.js
const requests=require("../../../func/prjRequests.js");
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    isJoined:false,
    isLaucher:false,
    subtask:[],
    project:{},
    laucher:{},
    members:{}
  },

  goToSubProject: function(e){
    if (this.data.project.isJoined){
      console.log(e)
      wx.navigateTo({
        url: "/pages/myProjects/manageProject/manageProject?projectId=" + e.currentTarget.dataset.subprojectid,
      })
    }
  },

  createSubproject: function () {
    wx.navigateTo({
      url: "/pages/addProject/addProject?parentProjectId=" + this.data.project.taskId,
    })
  },

  finishProject: function(){
    var projectId = this.data.project.taskId
    requests.finishProject(app.globalData.openId, projectId).then(
      data=>{
        wx.showToast({
          title: '成功完成项目！'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 700)
      }
    )
  },

  quitProject: function(){
    var projectId = this.data.project.taskId
    wx.showModal({
      title: '退出项目',
      content: '是否确定退出项目？',
      confirmText: "确认",
      cancelText: "返回",
      success: function(res){
        console.log(res)
        if(res.confirm){
          console.log("shit")
          requests.quitProject(app.globalData.openId,projectId).then(
            data=>{
              console.log(data)
              wx.navigateBack({
                delta:1
              })
            }
          )
        }else{
        }
      }
    })
  },

  alterProject: function(){
    var projectId = this.data.project.taskId
    console.log("alter")
    console.log(projectId)
    wx.navigateTo({
      url: "/pages/myProjects/alterProject/alterProject?projectId=" + projectId,
    })
  },

  deleteProject: function () {
    var projectId = this.data.project.taskId
    wx.showModal({
      title: '删除项目',
      content: '是否确定删除项目？',
      confirmText: "确认",
      cancelText: "返回",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          console.log("shit")
          requests.deleteProject(app.globalData.openId, projectId).then(
            data => {
              console.log(data)
              wx.navigateBack({
                delta: 1
              })
            }
          )
        } else {
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options.projectId)
    requests.getProjectByProjectIdAndUserId(app.globalData.openId, options.projectId).then(
      data=>{
        console.log(data)
        this.setData({
          isJoined:data.isJoined,
          isLaucher:data.isLaucher,
          project: data.project,
          subtask: data.subtask,
          laucher: data.laucher,
          members: data.members
        })
      }
    )
  },

  onShow: function (options) {
    var projectId = this.data.project.taskId
    if(projectId){
      requests.getProjectByProjectIdAndUserId(app.globalData.openId, projectId).then(
        data => {
          console.log(data)
          this.setData({
            isJoined: data.isJoined,
            isLaucher: data.isLaucher,
            project: data.project,
            subtask: data.subtask,
            laucher: data.laucher,
            members: data.members
          })
        }
      )
    }
  },
})