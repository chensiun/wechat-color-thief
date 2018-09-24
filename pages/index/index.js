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

    // var tt = wx.canvasGetImageData({
    //   canvasId: 'canvasPlaceholder',
    //   x: 0,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // })
    // // var context = wx.createCanvasContext('canvasPlaceholder')
    // console.log('xxx...', tt)
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          photoSrc: res.tempImagePath
        })
      }
    })
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
