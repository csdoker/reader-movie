// pages/posts/post-detail/post-detail.js
// import data from "../../../data/posts.js"
const data = require('../../../data/posts.js')

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
    const postId = options.id
    const post = data.posts[postId]
    this.setData({
      post,
      postId
    })
    let postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      const postCollected = postsCollected[postId]
      if (postCollected) {
        this.setData({
          collected: postCollected
        })
      }
    } else {
      postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
    // wx.setStorageSync('key', "怪物猎人")
    // wx.getStorageSync('key')
    // wx.removeStorageSync('key')
    // wx.clearStorageSync()
  },

  onCollectionTap: function(event) {
    const postsCollected = wx.getStorageSync('posts_collected')
    let postCollected = postsCollected[this.data.postId]
    postCollected = !postCollected
    this.setData({
      collected: postCollected
    })
    postsCollected[this.data.postId] = postCollected
    wx.setStorageSync('posts_collected', postsCollected)
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