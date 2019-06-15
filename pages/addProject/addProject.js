const app = getApp()
const requests = require("../../func/prjRequests.js")
// pages/addInfo/addInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    tips: "",

    // personalInfo dic
    projectInfo: {
      projectId:0,
      parentProjectId:0,
      creatorId:"345",
      projectContent:"",
      pjRequirement:"",
      weight: "",
      createTime: "2019-04-23",
      overTime: "2019-07-23",
      currentPeople: 0,
      people: 0,
    }
  },

  onLoad: function (options) {
    console.log("创建子项目")
    console.log(options)
    var num = parseInt(options.parentProjectId)
    this.setData({
      "projectInfo.parentProjectId": num
    })
    console.log(this.data.projectInfo.parentProjectId)
  },



  // MARK: - 信息改变 UI 
  bindCreateTimeChange: function (e) {
    this.setData({
      'projectInfo.createTime': e.detail.value
    })
  },

  bindOverTimeChange: function (e) {
    this.setData({
      'projectInfo.overTime': e.detail.value
    })
  },

  // MARK: - 表单检验与提交

  // 显示必填信息未填提示
  showTopTips: function (tips) {
    var that = this;
    this.setData({
      showTopTips: true,
      tips: tips
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false,
      });
    }, 3000);
  },

  // 检查是否为空
  isEmpty: function (content) {
    return (content == null) || (content.trim().length == 0);
  },

  // 检查日期
  checkDate: function (startTime, endTime) {
    //日期格式化
    var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var days = end_date.getTime() - start_date.getTime();
    //转换成天数
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    //do something
    console.log("day = ", day);
    return day;
  },

  // 检查人数
  checkPeople: function(currentPeople,people){
    var cp=parseInt(currentPeople);
    var p=parseInt(people);
    if(cp<0) return 1;
    else if(p<=0) return 2;
    else if(cp>=p) return 3;
    else return 0;
  },

  // 表单检验与提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    var that = this
    var checkPeople = this.checkPeople(data.currentPeople,data.people)
    if (this.isEmpty(data.projectContent)) {
      this.showTopTips("项目名称不能为空！");
    } else if (this.isEmpty(data.pjRequirement)) {
      this.showTopTips("项目要求不能为空！");
    } else if (this.isEmpty(data.weight)) {
      this.showTopTips("项目回报不能为空！");
    } else if (this.checkDate(data.createTime,data.overTime)<0) {
      this.showTopTips("截止时间不能小于开始时间");
    } else if (checkPeople == 1) {
      this.showTopTips("当前人数不能为负数");
    } else if (checkPeople == 2) {
      this.showTopTips("需要人数不能小于等于0");
    } else if (checkPeople == 3) {
      this.showTopTips("当前人数不能大于等于需要人数");
    } else {
      wx.showModal({
        title: '表单提交',
        content: '确认要提交吗？',
        confirmText: "确认",
        cancelText: "返回",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击确认操作')
            console.log(app.globalData.openId)
            that.setData({
              'projectInfo.creatorId': app.globalData.openId,
              'projectInfo.projectContent': data.projectContent,
              'projectInfo.pjRequirement': data.pjRequirement,
              'projectInfo.weight': data.weight,
              'projectInfo.createTime': data.createTime,
              'projectInfo.overTime': data.overTime,
              'projectInfo.currentPeople': parseInt(data.currentPeople),
              'projectInfo.people': parseInt(data.people),
            });
            console.log(that.data.projectInfo)
            requests.submitProjectInfo(that.data.projectInfo).then(
              data=>{
                console.log(data)
                if(data=="Success Create"){
                  wx.showToast({
                    title: '创建成功！',
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 700)
                }
              }
            )
          } else {
            console.log('用户点击返回操作')
          }
        }
      });
    }
  },
})

