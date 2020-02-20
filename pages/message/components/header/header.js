// pages/message/components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    configIconClick: function(){
      const data = wx.getStorageInfoSync();
      const {currentSize, limitSize} = data;
      const that = this;
      wx.showModal({
        title: '你的攻略当前如下',
        content: `已缓存容量：${currentSize}
        限制大小: ${limitSize}`,
        confirmText:'已阅😐',
        cancelText:'从头开始',
        success (res) {
           if (res.cancel) {
            wx.removeStorageSync('mentions')
            that.triggerEvent('onReload');
          }
        }
      })
    }
  }
})
