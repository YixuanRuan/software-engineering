// pages/addInfo/addInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    tips: "",

    // personalInfo dic
    projectInfo: {
      parentProjectId: "",
      projectId:"",
      creatorId: "",
      projectId: "",
      projectContent: "软件工程",
      weight: "每人八小时志愿时长 ",
      createTime: "2019-04-05",
      overTime: "2019-07-05",
      name: "阮义轩",
      phone: "110",
      currentPeople: 10,
      people: 20,
      pjRequirement: "北京航空航天大学是新中国创建的第一所航空航天高等学府，是一所肩负神圣使命、承载宏伟愿景的大学，学校的理想和抱负、传承和发展始终与国家发展和民族振兴紧密相系。1952年10月，由当时的清华大学、北洋大学等八所中国著名高校的航空院系合并组建成立了北京航空学院（现北京航空航天大学）。建校66年以来，北航一直是国家重点建设的高校。现在的北航，拥有学院路和沙河两个校区，30000余名在校学生以及近4000名教职员工。学校第十六次党员代表大会确立了以“建设扎根中国大地的世界一流大学”为发展远景目标，2017年学校入选国家“双一流”建设高校名单（A类）。",
    }
  },

  onLoad: function (options) {
  },

  // MARK: - 未用到的生命周期函数
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onReady: function () {

  },





  //


  // MARK: - 信息改变 UI 

  // 改变出队类型列表
  bindTypeChange: function (e) {
    console.log('picker Type 发生选择改变，携带值为', e.detail.value);
    this.setData({
      typeIndex: e.detail.value,
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

  // 表单检验与提交
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var data = e.detail.value
    var that = this
    if (this.isEmpty(data.leader)) {
      this.showTopTips("领队姓名不能为空！");
    } else if (this.isEmpty(data.phone)) {
      this.showTopTips("领队电话不能为空！");
    } else if (this.isEmpty(data.sex)) {
      this.showTopTips("领队性别不能为空！");
    } else if (this.isEmpty(data.joinTime)) {
      this.showTopTips("领队入社时间不能为空！");
    } else if (this.isEmpty(data.location)) {
      this.showTopTips("出队地点不能为空！");
    } else if (this.isEmpty(data.intro)) {
      this.showTopTips("出队简介不能为空！");
    } else if (this.isEmpty(data.beginTime)) {
      this.showTopTips("出发时间不能为空！");
    } else if (this.isEmpty(data.endTime)) {
      this.showTopTips("返回时间不能为空！");
    } else if (this.isEmpty(data.num)) {
      this.showTopTips("出队人数不能为空！");
    } else if (this.isEmpty(data.currentNum)) {
      this.showTopTips("当前人数不能为空！");
    } else if (this.isEmpty(data.budget)) {
      this.showTopTips("出队预算不能为空！");
    } else if (this.isEmpty(data.moneyName)) {
      this.showTopTips("财务姓名不能为空！");
    } else if (this.isEmpty(data.moneyPhone)) {
      this.showTopTips("财务电话不能为空！");
    } else if (this.isEmpty(data.money)) {
      this.showTopTips("防鸽费不能为空！");
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
            that.setData({
              'projectInfo.leader': data.leader,
              'projectInfo.phone': data.phone,
              'projectInfo.sex': data.sex,
              'projectInfo.joinTime': data.joinTime,
              'projectInfo.location': data.location,
              'projectInfo.intro': data.intro,
              'projectInfo.beginTime': data.beginTime,
              'projectInfo.endTime': data.endTime,
              'projectInfo.num': parseInt(data.num),
              'projectInfo.currentNum': parseInt(data.currentNum),
              'projectInfo.budget': data.budget,
              'projectInfo.type': that.data.types[that.data.typeIndex],
              'projectInfo.moneyName': data.moneyName,
              'projectInfo.moneyPhone': data.moneyPhone,
              'projectInfo.money': data.money,
            });
          } else {
            console.log('用户点击返回操作')
          }
        }
      });
    }

  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

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
})

