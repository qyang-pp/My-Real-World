// pages/message/components/item/components/user-behaviour/user-behaviour.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
      value: ''
    },
    list:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    initial: true,
    isDeleting: false,
    deletePaneToggle: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onUpdateIconClick: function(){
      this.triggerEvent('onUpdate');
      this.setData({
        initial: true,
        isDeleting: false,
        deletePaneToggle: false
      })
    },
    deleteIconClick: function(){
      this.setData({
        isDeleting: true
      })
      setTimeout(()=>{
        this.onDelete();
      },1000)
    },
    hideDeletePane: function(){
      this.setData({
        deletePaneToggle: !this.data.deletePaneToggle
      })
    },
    openDeletePane: function(){
      this.setData({
        initial: false,
        deletePaneToggle: !this.data.deletePaneToggle
      })
    },
    onDelete: function(){
        this.triggerEvent('onDelete');
    }
  }
})
