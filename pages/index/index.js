//index.js
//获取应用实例
const app = getApp()
//const colorThief = require('./ColorThief').default
import ColorThief from './ColorThief.js'
import namer from 'color-namer'

Page({
  data: {
    ringStatus: 'hide',
    palettes: []
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
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({ photoSrc: tempFilePaths[0] })
      }
    })
  },

  onResetImage() {
    this.setData({
      photoSrc: '',
      palettes: [],
      ringStatus: 'hide',
      curColor: '',
      colorName: '',
    })
  },

  onThiefColor() {
    if (this.data.palettes.length) return
  
    const src = this.data.photoSrc
    this.colorThief.getPalette(src, 5).then(data => {
      const rgbs = this.colorThief.convertColorRgb(data)
      this.setData({ palettes: rgbs })

      this.onGetColorName(rgbs[0])
    })
  },

  onToggleRing() {
    this.setData({ ringStatus: this.data.ringStatus === 'show' ? 'hide' : 'show' })
  },

  onSetColor (event) {
    const setIndex = event.target.dataset.colorindex
    const curColor = this.data.curColor || this.data.palettes[0]
    
    const newPalettes = this.data.palettes.map((p, i) => {
      if (setIndex == i) return curColor
      return p
    })

    const newCurColor = this.data.palettes[setIndex]
    this.setData({
      curColor: newCurColor,
      palettes: newPalettes,
    })

    this.onGetColorName(newCurColor)
  },

  onGetColorName (color) {
    const names = namer(color, { pick: ['basic', 'html'] })
    const { basic, html } = names || {}
    const basicName = basic && basic[0] || {}
    const htmlName = html && html[0] || {}
    const name = basicName.name === htmlName.name ? basicName.name : `${htmlName.name} ${basicName.name}`

    this.setData({ colorName: name })
  }
})