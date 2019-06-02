import { $wuxSelect } from '../../dist/index'
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    array: ['学生', '教师', '程序员', '设计师'],
    objectArray: [
      {
        id: 0,
        name: '学生'
      },
      {
        id: 1,
        name: '教师'
      },
      {
        id: 2,
        name: '程序员'
      },
      {
        id: 3,
        name: '设计师'
      }
    ],
    index: 0,
  },
    bindPickerChange(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
})