// pages/movies/movies.js
const util = require('../../utils/util.js')

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const inTheatersUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?start=0&count=3`
    const comingSoonUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?start=0&count=3`
    const topUrl = `${app.globalData.doubanBase}/v2/movie/top250?start=0&count=3`
    this.getMovieList(inTheatersUrl, 'inTheaters', '正在热映')
    this.getMovieList(comingSoonUrl, 'comingSoon', '即将上映')
    this.getMovieList(topUrl, 'top250', '豆瓣TOP250')
  },

  getMovieList: function (url, key, category) {
    util.request(url).then((res) => {
      const {
        subjects
      } = res.data
      const movies = util.formatMovies(subjects, key, category)
      const obj = {}
      obj[key] = {
        category,
        movies
      }
      this.setData(obj)
    })
  },

  onMoreTap: function (event) {
    const category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: `../more-movies/more-movies?category=${category}`
    })
  }
})