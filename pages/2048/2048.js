// pages/2048/2048.js
let util = require('./2048-logic.js');
let startX=0,          
    startY=0,
    endX=0,
    endY=0,
    differenceX=0,
    differenceY=0;    //滑动坐标判断
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:0,
    best:0,
    datas:[
      ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']
    ],
    gameover:false
  },
  touchstart(e){
      startX=e.changedTouches[0].pageX;
      startY=e.changedTouches[0].pageY;
  },
  touchend(e){
      endX=e.changedTouches[0].pageX;
      endY=e.changedTouches[0].pageY;
      differenceX = startX - endX;
      differenceY = startY - endY;
      if(differenceX <= 0 && Math.abs(differenceX) >= Math.abs(differenceY)) {
        console.log('右滑');
        let result = util.rightMerge.call(this,this.data.datas);
        this.setData({
          datas: result
        })

      } else if (differenceX > 0 && Math.abs(differenceX) >= Math.abs(differenceY)) {
        console.log('左滑')
        let result = util.leftMerge.call(this,this.data.datas);
        this.setData({
          datas: result,
        })
      } else if (differenceY <= 0 && Math.abs(differenceY) >= Math.abs(differenceX)){
        console.log('下滑')
        let arr = util.downMerge.call(this,this.data.datas);
        this.setData({
          datas: arr
        })
      } else if (differenceY > 0 && Math.abs(differenceY) >= Math.abs(differenceX)){
        console.log('上滑')
        let arr = util.topMerge.call(this,this.data.datas);
        this.setData({
          datas: arr
        })
      }
      //随机生成一个数字
      let arr = util.round(this.data.datas);
      this.setData({
        datas: arr
      })
      if (util.gameover(this.data.datas)){
          this.setData({
            gameover:true
          })
          console.log('游戏结束')
      }
  },
  // 游戏结束
  gameoverTap(){
    // 设置最高分数
    if(this.data.score > this.data.best){
      this.setData({
        best: this.data.score
      })
    }
    
    setTimeout(()=>{
      this.setData({
        gameover: false,
        datas: [
          ['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']
        ],
        score: 0
      }, () => {
        let arr = util.randomValue(this.data.datas);
        this.setData({
          datas: arr
        })
      })
    },0)
      
  },
  // 重新开始游戏
  restart(){
    this.gameoverTap();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  随机生成 2 或 4 两个
    let arr = util.randomValue(this.data.datas);
    this.setData({
      datas:arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})