// pages/movie-detail/movie-detail.js
import { Movie } from './class/Movie'

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
    const movie = new Movie(url)
    movie.getMovieDetail(this.getData)
  },

  getData: function(data) {
    this.setData({
      movie: data
    })
  },

  viewMoviePostImg: function(event) {
    const { src } = event.currentTarget.dataset
    wx.previewImage({
      urls: [src],
      current: src
    })
  }
})