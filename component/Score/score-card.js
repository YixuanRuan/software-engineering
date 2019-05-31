// component/Score/score-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: '1'
      },
    checked:{
      type: Boolean,
      value: true,
    },
    userID:{
      type: Number,
      value: '16721084',
    },
    userTask:{ 
      type: String,
      value: '前端开发'
    }
  },

  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  methods: {
    onCheckboxChange:function(e) {
      this.setData({
        checked:!this.properties.checked
      })
      console.log(this.properties.checked);
    },
    
  }
})
