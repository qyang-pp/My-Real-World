// pages/message/components/item/components/user-des/user-des.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    des: {
      type: String,
      value: 'This is des...'
    },
    images: {
      type: Array,
      value: []
    }
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
    previewImage: function(e){
      const current = e.target.dataset.src;
      const urls = e.target.dataset.list;
      wx.previewImage({
        current, // 当前显示图片的http链接
        urls // 需要预览的图片http链接列表
      })
    },
  }
})
