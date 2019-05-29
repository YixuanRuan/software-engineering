// pages/discover/discover.js
var arr_name = ["美容", "保健养生", "其他"]
var arr_link = [1, 10, 15]
Page({

  /**
   * Page initial data
   */

  // rgb(197, 197, 197)
  
  data: {
    items: [{
      id: "1",
      src: "/images/acs/1.png",
      text: arr_name[0],
      startDate:"2019-04-03",
      endDate:"2019-07-21"
    }, {
      id: "10",
      src: "/images/acs/2.png",
      text: arr_name[1],
      startDate: "2019-04-03",
      endDate: "2019-07-21"
    }, {
      id: "15",
      src: "/images/acs/3.png",
      text: arr_name[2],
      startDate: "2019-04-03",
      endDate: "2019-07-21"
    }],
  },

  manageProject: function(e){
    var id = e.currentTarget.id
    console.log(e)
    wx.navigateTo({
      url:"/pages/manageProject/manageProject?id="+id,
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var id=1

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