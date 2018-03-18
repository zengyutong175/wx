Page({
  data: {
    markers: [{
      iconPath: "../../resource/location.png",
      id: 0,
      latitude: 30.572269,
      longitude: 104.066541,
      width: 30,
      height: 30
    }],
    latitude:0,
    longitude:0
  },
  onReady(){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wx.getLocation({
      type: 'gcj02',
      success: res=>{
        this.setData({
          markers: [{
            iconPath: "../../resource/location.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 40,
            height: 40
          }],
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.hideLoading();
      }
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  
})
