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
    var id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url: "/pages/myProjects/manageProject/manageProject?id=" + id,
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
    var args = { userId: app.globalData.openId}
    var joinedTasks = requests.getJoinedProjects(args);
    var lauchedTasks = requests.getLauchedProjects(args);
    console.log("joinedTasks:")
    console.log(joinedTasks)
    console.log("lauchedTasks:")
    console.log(lauchedTasks)
    var height = Math.max(joinedTasks.length * HEIGHT, lauchedTasks.length * HEIGHT)
    this.setData({
      "tabs[0].content":joinedTasks,
      "tabs[1].content":lauchedTasks,
      swiperHeight: height,
    })
  }
})