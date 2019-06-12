import { $wuxSelect } from '../../dist/index'
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    name: 'Alphonse',
    tel:'18510249859',
    advantage: '123456789',
    introduction: '123456789',
    email: 'xianfengjiao0509@gmail.com'
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
      url: 'http://114.115.151.96:8080/user/update',
      data: {
        id: 12,
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
  },
  formReset: function () {
    console.log('form发生了reset事件');
    
  }
})