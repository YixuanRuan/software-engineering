// component/Card/project-search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    startTime:{
      type: String,
      value: '2019.3.11'
    },
    endTime: {
      type: String,
      value: '2019.6.2'
    },
    remainingDay: {
      type: Number,
      value: 72
    },
    imageSrcs:{
      type: Array,
      value: ['../../resources/develop.png', 
              '../../resources/design.png', 
              '../../resources/activity.png']
    },
    image:{
      type:String,
      value: '../../resources/develop.png'
    },
    personNum:{
      type:Number,
      value:6
    },
    projectName:{
      type:String,
      value:'软件工程大作业'
    },
    projectId:{
      type:Number,
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {
    attached: function () {
      this.setData({
        image: this.properties.imageSrcs[this.properties.projectId%3],
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onShow: function () {
      
    }
  }
})
