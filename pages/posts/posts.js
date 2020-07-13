// pages/posts/posts.js
const data = require('../../data/posts.js')

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
    this.setData({
      posts: data.posts
    })
  },

  onPostTap: function (event) {
    const postId = event.currentTarget.dataset.postId
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`,
    })
  }
})