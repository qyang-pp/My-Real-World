// pages/message/components/item/item.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{}
    },
    user:{
      type:Object,
      value:{}
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
    onDelete: function(){
      this.triggerEvent('onDelete', { id: this.properties.item.id});
    },
    onUpdate: function(){
      app.globalData.id = this.properties.item.id
      wx.switchTab({
        url: '/pages/pao/pao',
      })
    }
  }
})
