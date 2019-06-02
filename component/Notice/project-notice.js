// component/Notice/project-notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noticeTitle:{
      type:String,
      value:'项目进度通知'
    },
    noticeContent:{
      type:String,
      value:'XX 项目已通过申请'
    },
    noticeDate:{
      type:String,
      value:'2019.10.12'
    },
    noticeTime:{
      type:String,
      value:'11:07'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: '1',
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      current: e.detail.key,
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
