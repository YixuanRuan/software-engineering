const requests = require("../../func/prjRequests.js")
const app = getApp()
const HEIGHT = 450
Page({
  data: {
    swiperHeight:100,
    current: 'tab1',
    tabs: [
      {
        key: 'tab1',
        title: '参加的项目',
        content: [],
      },
      {
        key: 'tab2',
        title: '发起的项目',
        content: [],
      },
    ],
  },
  manageProject: function (e) {
    var projectId = e.currentTarget.dataset.projectid
    console.log(projectId)
    wx.navigateTo({
      url: "/pages/myProjects/manageProject/manageProject?projectId=" + projectId,
    })
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
  },
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)
    this.setData({
      key,
      index,
    })
  },
  onSwiperChange(e) {
    console.log('onSwiperChange', e)
    const { current: index, source } = e.detail
    const { key } = this.data.tabs[index]
    var id=e.detail.current
    var height = this.data.tabs[id].content.length * HEIGHT
    this.setData({
      swiperHeight: height,
    })
    if (!!source) {
      this.setData({
        key,
        index,
      })
    }
  },
  onShow: function () {
    var userId= app.globalData.openId
    var that=this
    requests.getJoinedProjects(userId)
    .then(
      data=>{
        console.log(data)
        that.setData({
          "tabs[0].content": data,
        })
      }
    ).then(
      data=>{
        requests.getLauchedProjects(userId)
        .then(
          data => {
            console.log(data)
            that.setData({
              "tabs[1].content": data,
            })
            var height = Math.max(that.data.tabs[0].content.length * HEIGHT, that.data.tabs[1].content.length * HEIGHT)
            that.setData({
              swiperHeight: height,
            })
          }
        )
      }
    )
  }
})