// pages/movies/movies.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters`
    const comingSoonUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon`
    const topUrl = `${app.globalData.doubanBase}/v2/movie/top250`
    this.getMovieList(inTheatersUrl)
    this.getMovieList(comingSoonUrl)
    this.getMovieList(topUrl)
  },

  getMovieList: function(url) {
    wx.request({
      url,
      method: 'GET',
      // header: {
      //   'Content-Type': 'application/xml'
      // },
      success: (res) => {
        
      }
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