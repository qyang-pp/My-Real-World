
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
    hasList: false,
    showText: false,
    animation:'',
    todaySum: 9,
    weekSum: 22,
    allSum: 22,
    maxDay: '2020/2/20',
    maxDaySum: 9,
    maxDarkTime:'2020/2/19 02:12:12'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onReturn: function(){
      this.opacityAnimation('#center', 1, 0, ()=>{
        this.setData({
          showText: false
        })
        this.animate('#main',[
          { height: '100%'},
          { height: 0 }
        ], 500, ()=>{
          this.clearAnimation("#center")
          this.clearAnimation("#main")
        })
      })
    },
    onModalShow: function(){
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
    },
    configIconClick: function(){
      const list = wx.getStorageSync('mentions');
      const hasList = list.length > 0;
      this.setData({
        hasList
      })
      this.animate('#main',[
        { height: 0},
        { height: '100%'}
      ], 500, ()=> {
        this.setData({
          showText: true
        })
        this.opacityAnimation('#center', 0, 1)
      })
    },
    opacityAnimation: function(id, start, end, callback){
      this.animate(id, [
        {opacity: start},
        {opacity: end}
      ], 500, callback && callback())
    },
    heightAnimation: function(id, start, end, callback){
      this.animate(id, [
        {height: `${start}%`},
        {height: `${end}%`}
      ], 500, callback && callback())
    }
  }
})
