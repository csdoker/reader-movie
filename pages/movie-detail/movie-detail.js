// pages/movie-detail/movie-detail.js
const util = require('../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const movieId = options.id
    const url = `${app.globalData.doubanBase}/v2/movie/subject/${movieId}`
    this.getMovieDetail(url)
  },

  getMovieDetail: function(url) {
    util.request(url).then((res) => {
      const director = {
        avatar: res.data.directors[0].avatars.large,
        name: res.data.directors[0].name,
        id: res.data.directors[0].id
      }
      const movie = {
        movieImg: res.data.images.large,
        country: res.data.countries[0],
        title: res.data.title,
        originalTitle: res.data.original_title,
        wishCount: res.data.wish_count,
        commentCount: res.data.comments_count,
        year: res.data.year,
        generes: res.data.genres.join('、'),
        stars: util.convertToStars(res.data.rating.stars),
        score: res.data.rating.average,
        director,
        casts: util.convertToCastString(res.data.casts),
        castsInfo: util.convertToCastInfos(res.data.casts),
        summary: res.data.summary
      }
      this.setData({
        movie
      })
      console.log(this.data.movie)
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