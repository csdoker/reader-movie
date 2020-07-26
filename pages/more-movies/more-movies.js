// pages/more-movies/more-movies.js
const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { category } = options
    this.setData({
      navigateTitle: category
    })
    let url = ''
    switch (category) {
      case "正在热映":
        url = `${app.globalData.doubanBase}/v2/movie/in_theaters`
        break;
      case "即将上映":
        url = `${app.globalData.doubanBase}/v2/movie/coming_soon`
        break;
      case "豆瓣TOP250":
        url = `${app.globalData.doubanBase}/v2/movie/top250`
        break;
    }
    this.setData({
      requestUrl: url
    })
    this.getMoviesList(url)
  },

  getMoviesList: function(url) {
    wx.showNavigationBarLoading({
      success: (res) => {},
    })
    util.request(url).then((res) => {
      const {
        subjects
      } = res.data
      const movies = util.formatMovies(subjects)
      let totalMovies = []
      if (!this.data.isEmpty) {
        totalMovies = this.data.movies.concat(movies)
      } else {
        totalMovies = movies
        this.setData({
          isEmpty: false
        })
      }
      this.setData({ 
        movies: totalMovies,
        totalCount: this.data.totalCount + 20
       })
       wx.hideNavigationBarLoading({
         success: (res) => {},
       })
       wx.stopPullDownRefresh({
         success: (res) => {},
       })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const refreshUrl = `${this.data.requestUrl}?star=0&count=20`
    this.setData({
      movies: [],
      totalCount: 0,
      isEmpty: true
    })
    this.getMoviesList(refreshUrl)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const nextUrl = `${this.data.requestUrl}?start=${this.data.totalCount}&count=20`
    this.getMoviesList(nextUrl)
  }
})