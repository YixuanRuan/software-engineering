// pages/discover/discover.js
var arr_name = ["美容", "保健养生", "其他"]
var arr_link = [1, 10, 15]
Page({

  /**
   * Page initial data
   */
  
  data: {
    items: [{
      id: "1",
      src: "/images/acs/meirong.png",
      text: arr_name[0],
      startDate:"2019-04-03",
      endDate:"2019-07-21"
    }, {
      id: "10",
      src: "/images/acs/jianfei.png",
      text: arr_name[1],
      startDate: "2019-04-03",
      endDate: "2019-07-21"
    }, {
      id: "15",
      src: "/images/acs/jiankangyangsheng.png",
      text: arr_name[2],
      startDate: "2019-04-03",
      endDate: "2019-07-21"
    }],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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