Page({
  data: {
    taskName: '',
    userId: 0,
    count: [0],
    items: [],
    visible1: false,
    visible2: false,
    taskId: 22,
    noticeTitle: '项目进度通知',
    noticeTitle2: '项目申请通知',
    noticeTime: '2019.5.21',
    noticeTime2: '2019.5.20',
    noticeContent: '\n 您的项目 XX 已完成 \n\n 项目的结束时间为：2019.5.21 \n\n 你负责的任务是：前端开发\n\n 请点击下方链接对项目成员评分',
    noticeContent2: '\n 用户 XX 申请加入项目 XX \n\n 用户申请时间为：2019.7.21 \n\n 你可以点击下方查看用户信息',
    applyUserName: 'jxf'
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://114.115.151.96:8080/message/get',
      data: {
        id: 22
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var ii = res.data.message;
        console.log("kkkk")
        console.log(that.data.items);

        var i = 0;
        var num = []
        for (i = 0; i < ii.length; i++) {

          if (ii[i].readFlag) {
            num[i + 1] = 0;
          }
          else {
            num[i + 1] = 1;
          }
        }
        console.log(num)

        console.log(res);
        that.setData({
          items: res.data.message,
          count: num
        })

        
      }
    })

    
    
  },
  open: function(e) {
    var that = this
    console.log(e);
    var i = parseInt(e.target.dataset.idx) + 1;
    var item = "count["+i+"]";
    var notice = e.target.dataset.notice;
    console.log(notice);
    if(notice.type == 1){
      this.setData({
        userId: notice.sendId,
        noticeTitle2: notice.title,
        noticeContent2: notice.text,
        applyUserName: notice.sendId,
        visible2: true,
        [item]: 0,
      })
    }
    else if(notice.type == 2){
      this.setData({
        taskId: notice.taskId,
        noticeTitle: notice.title,
        noticeContent: notice.text,
        visible1: true,
        [item]: 0,
      })

      wx.request({
        url: 'http://114.115.151.96:8080/task/getTask',
        data: {
          taskid: notice.taskId
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            taskName: res.data.task.projectContent,
          })
        }
      })
    }
    
    console.log(this.data.count);

    

    wx.request({
      url: 'http://114.115.151.96:8080/message/setRead',
      data: {
        messageId: notice.messageId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("messageSetRead successful")
      }
    })


  },
  close() {
    this.setData({
      visible2: false,
      visible1: false
    })
  },
  onClose() {
    console.log('onClose')
    this.setData({
      visible2: false,
      visible1: false
    })
  }
})
