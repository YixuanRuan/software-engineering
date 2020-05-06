import { $wuxToast } from '../../dist/index'
const Url= 'http://localhost:8080'
Page({
  data: {
    taskName:'软件工程大作业',
    value: '1',
    checked: true,
    userID: 16721084,
    userName: 'Alphonse1',
    avatar:[
      '../../resources/avatar1.jpg',
      '../../resources/avatar2.jpg',
      '../../resources/avatar3.jpg',
      '../../resources/avatar4.jpg',
      '../../resources/avatar1.jpg',
      '../../resources/avatar2.jpg', 
      '../../resources/avatar3.jpg',
    ],
    items: [],
    userId:[],
    checked:[]
  },
  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.request({
      url: Url+'/user/findJoiner',
      data: {
        taskId: options.taskId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("kkkkkkkkkk")
        console.log(res)
        that.setData({
          items: res.data.joiner,
          taskName: options.taskName
        })
      }
    })
  },
  sliderChange(e) {
    this.setData({
      slider: e.detail.value,
    })
  },
  bindchange(e) {
    console.log(e)
  },
  onChange:function(e){
    console.log(e)
    var that = this
    var i = e.currentTarget.dataset.index
    var data = 'items[' + i + '].checked'
    that.setData({
      [data]: !e.currentTarget.dataset.checked
    })
    console.log(this.data.items)
  },

  showToastReturn() {
    var i = 0;
    console.log("kkkkkkkkkkkkkkkkk")
    console.log(this.data.items)
    for (i = 0; i < this.data.items.length; i++){
      this.data.userId[i] = this.data.items[i].userId;
      if (this.data.items[i].checked){
        this.data.checked[i] = false
      }
      else{
        this.data.checked[i] = true
      }
    }
    console.log("kkkkkkkkkkkkkkkkk")
    console.log(this.data.userId)
    console.log(this.data.checked)

    var that = this
    wx.request({
      url: Url+'/credit/UpdateCredit',
      data: {
        userId: this.data.userId,
        checked: this.data.checked
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })

    if (this.timeout) clearTimeout(this.timeout)

    const hide = $wuxToast().show({
      type: 'success',
      duration: 1500,
      color: '#fff',
      text: '已完成',
    })

    this.timeout = setTimeout(function(){
      wx.navigateBack({
        delta:1
      });
    }, 1000)
    


  },
  submit:function(e){

  }
})