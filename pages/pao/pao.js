// pages/pao/pao.js
const app = getApp()
import {wxuuid} from '../utils/uuidUtils';
const initialData = {
  id:'',
  imageList:[],
  text:'',
  isUploadImage: false,
  finishUploadImage: false
}

Page({

  /**
   * Page initial data
   */
  data: initialData,
  removeSelectedImage: function(e){
    const src = e.target.dataset.src;
    const imageList = this.data.imageList.filter(item => item !== src);
    this.setData({
      imageList
    })
  },
  validSubmit: function(){
    if(this.data.text.trim() === '' && this.data.imageList.length === 0){
      wx.showToast({
        title: '你还没有开炮哦!',
        icon:"none"
      })
      return;
    }

  },
  getListWithTargetData: function(){
    const id = this.data.id
    const data = {
      id: id === '' ? wxuuid() :id,
      des: this.data.text,
      images: this.data.imageList,
      time: new Date()
    };
    let newList = [];
    const preList = wx.getStorageSync('mentions') || [];
    const item = preList.find(item=> item.id === id)
    newList = item ? preList.map(item => item.id === id ? data : item) : [...preList,data]
    return newList;
  },
  clickSubmit: function(){
    this.validSubmit();
    const newMentions = this.getListWithTargetData();
    const that = this;
    wx.setStorage({
      key:"mentions",
      data: newMentions,
      success: function(res){
        wx.showToast({
          title: '提交成功',
          icon:"success",
          success: ()=>{
            wx.switchTab({
              url: '/pages/message/message',
            })
            that.setData({imageList:[],text:''})
          }
        })
      }
    })
  },
  textChange:function(e){
    this.setData({
      text:e.detail.value
    })
  },
  clickReset: function(){
    this.setData({
      imageList:[],
      text:''
    })
  },
  addImage: function(){
    this.setData({
      isUploadImage: true
    })
    let that = this;
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imageList: [...that.data.imageList, ...tempFilePaths]
        })
      }
    })
  },

  previewImage:function(e){
    const current = e.target.dataset.src;
    const list = e.target.dataset.list;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('load....')
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log('onReady....')
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log('onShow....')
    if(this.data.finishUploadImage){
      return;
    }
    const id =  app.globalData.id;
      const list = wx.getStorageSync('mentions')
      const item = list.find(item => item.id == id)
      if(item){
        this.setData({
          id,
          text: item.des,
          imageList: item.images
        })
      }
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    if(this.data.isUploadImage){
      this.setData({
        isUploadImage: false,
        finishUploadImage: true
      })
    }else {
      app.globalData.id = ''
      this.setData(initialData)
    }
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    console.log('onUnload....')

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