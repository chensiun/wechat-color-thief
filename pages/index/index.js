//index.js
//获取应用实例
const app = getApp()
//const colorThief = require('./ColorThief').default
import ColorThief from './ColorThief.js'

Page({
  data: {
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.colorThief = new ColorThief()
  },

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({
          photoSrc: res.tempImagePath
        })
      }
    })
  },

  takePhoto() {
    //console.log('xxx...su')
    // const ctx = wx.createCameraContext()
    // ctx.takePhoto({
    //   quality: 'high',
    //   success: (res) => {
    //     this.setData({
    //       photoSrc: res.tempImagePath
    //     })
    //   }
    // })
  },
  photoError(e) {
    console.log(e.detail)
  },

  onThiefColor() {
    const src = this.data.photoSrc
    this.colorThief.getColor(src).then(data => {
      const rgb = this.colorThief.convertColorRgb(data)
      this.setData({ mainColor: rgb })
    })
  }
})
