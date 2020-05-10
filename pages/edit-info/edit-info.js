import { $wuxSelect } from '../../dist/index'
import { $wuxToast } from '../../dist/index'
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
const app = getApp();
const Url ='http://106.13.42.89:8080'
Page({
  data: {
    name: '请输入您的姓名',
    tel:'请输入您的电话号码',
    advantage: '请输入您的优势',
    introduction: '请输入您的简介',
    email: '请输入您的邮箱'
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: Url+'/user/get',

      data: {
        id: app.globalData.openId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          advantage: res.data.User.advantage,
          name: res.data.User.name,
          email: res.data.User.mail,
          introduction: res.data.User.introduction,
          tel: res.data.User.phone
        })

      }
    })
  },
  onChangeName(e) {
    console.log('onChange', e)
    this.setData({
      name: e.detail.value,
    })
  },
  onChangeTel(e) {
    console.log('onChange', e)
    this.setData({
      tel: e.detail.tel,
    })
  },
  onChangeEmail(e) {
    console.log('onChange', e)
    this.setData({
      email: e.detail.email,
    })
  },
  onChangeAd(e) {
    console.log('onChange', e)
    this.setData({
      advantage: e.detail.value,
    })
  },
  onChangeIntroduction(e) {
    console.log('onChange', e)
    this.setData({
      introduction: e.detail.value,
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', this.data)
    var that = this
    wx.request({
      url:Url+ '/user/update',
      data: {
        id: app.globalData.openId,
        name: that.data.name,
        tel: that.data.tel,
        advantage: that.data.advantage,
        introduction: that.data.introduction,
        email: that.data.email
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);

      }
    })

    if (this.timeout) clearTimeout(this.timeout)

    const hide = $wuxToast().show({
      type: 'success',
      duration: 1500,
      color: '#fff',
      text: '修改成功',
    })

    this.timeout = setTimeout(function () {
      wx.navigateBack({
        delta: 1
      });
    }, 1000)
  },
  formReset: function () {
    console.log('form发生了reset事件');
    
  }
})