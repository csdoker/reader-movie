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
    this.showModal(postsCollected, postCollected)
  },

  showModal: function(postsCollected, postCollected) {
    wx.showModal({
      title: postCollected ? '收藏' : '取消收藏',
      content: postCollected ? '是否收藏该文章？' : '是否取消收藏该文章？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            collected: postCollected
          })
          postsCollected[this.data.postId] = postCollected
          wx.setStorageSync('posts_collected', postsCollected)
          wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            duration: 1000,
            icon: 'success'
          })
        }
      }
    })  
  },

  onShareTap: function() {
    const itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博']
    wx.showActionSheet({
      itemList,
      itemColor: '#405f80',
      success: (res) => {
        wx.showModal({
          title: `用户${itemList[res.tapIndex]}`,
          content: '现在无法实现分享功能'
        })
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