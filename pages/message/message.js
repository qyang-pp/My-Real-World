// pages/message/message.js
const app = getApp()
import { timeSort, timeFormat } from '../utils/timeUtils';

Page({

  /**
   * Page initial data
   */
  data: {
    user: {},
    list: []
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
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
      const list = wx.getStorageSync('mentions') || [];
      const timeSortList = timeSort(list);
      const newList = timeSortList.map(item => ({...item, time: timeFormat(item.time)}))
      const user = app.globalData.userInfo;
      this.setData({
        user,
        list : newList
      })
      if(!user){
        setTimeout(() => {
          this.setData({
            user: app.globalData.userInfo
          })
        }, 1000);
      }
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