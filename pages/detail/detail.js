// pages/detail/detail.js
const requests=require("../../func/prjRequests.js")
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    projectId:0,
    project:{
      projectId:"",
      projectContent:"软件工程",
      weight: "每人八小时志愿时长 ",
      createTime:"2019/04/05",
      overTime:"2019/07/05",
      name:"阮义轩",
      phone:"110",
      currentPeople:10,
      people:20,
      pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var projectId = options.projectId;
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