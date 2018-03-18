//index.js
//获取应用实例
const app = getApp()

Page({
  onLoad(){

  },

  to2048(){
    wx.navigateTo({ url: '../2048/2048' })
  }
})
