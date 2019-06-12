Page({
  data: {
    visible1: false,
    visible2: false,
    noticeTitle: '项目进度通知',
    noticeTitle2: '项目申请通知',
    noticeTime: '2019.5.21',
    noticeTime2: '2019.5.20',
    noticeContent: '\n 您已经成功加入项目 XX \n\n 项目的结束时间为：2019.7.21 \n\n 你负责的任务是：前端开发\n\n 请尽快与项目负责人沟通!',
    noticeContent2: '\n 用户 XX 申请加入项目 XX \n\n 用户申请时间为：2019.7.21 \n\n 你可以点击下方查看用户信息',
    applyUserName: 'jxf',
    count: 1,
  },
  open() {
    this.setData({
      visible2: true,
      count: 0
    })
  },
  close() {
    this.setData({
      visible2: false,
    })
  },
  onClose() {
    console.log('onClose')
    this.setData({
      visible2: false,
    })
  }
})
