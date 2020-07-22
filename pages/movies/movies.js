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

  getMovieList: function(url, key, category) {
    wx.request({
      url,
      method: 'GET',
      // header: {
      //   'Content-Type': 'application/xml'
      // },
      success: (res) => {
        const { subjects } = res.data
        const movies = []
        subjects.forEach(subject => {
          let title = subject.title
          title = title.length >= 6 ? `${title.substring(0, 6)}...` : title
          const stars = util.convertToStars(subject.rating.stars)
          movies.push({
            stars,
            title,
            average: subject.rating.average,
            coverageUrl: subject.images.large,
            movieId: subject.id
          })
        })
        const obj = {}
        obj[key] = { category, movies }
        this.setData(obj)
      }
    })
  },

  onMoreTap: function(event) {
    const category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: `../more-movies/more-movies?category=${category}`
    })
  }
})