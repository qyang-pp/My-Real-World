// pages/message/message.js
const app = getApp()
import { timeSort, timeFormat } from '../utils/timeUtils';

Page({

  /**
   * Page initial data
   */
  data: {
    user: {},
    list: [],
    hasUserInfo: false
  },
  onDelete: function(e){
    const currentId = e.detail.id;
    const storageList = wx.getStorageSync('mentions');
    const list = storageList.filter(item => item.id !== currentId);
    wx.setStorage({
      key:"mentions",
      data: list,
      success: ()=>{
        wx.showToast({
          title: '删除成功',
          icon:"success"
        })
        this.onShow()
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      user: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('onload...')
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        user: userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          user: res.userInfo,
          hasUserInfo: true
        })
      }
    } 
    if(this.data.user){
      this.getListFromStorage()
    }
      
  },
  getListFromStorage: function(){
    const list = wx.getStorageSync('mentions') || [];
    const timeSortList = timeSort(list);
    const newList = timeSortList.map(item => ({...item, time: timeFormat(item.time)}))
    this.setData({
      list : newList
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log('onReady...')

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('onShow...')
    this.getListFromStorage()
    },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})