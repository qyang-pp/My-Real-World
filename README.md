# My-Real-World(我的精神世界)


![](https://user-gold-cdn.xitu.io/2020/2/21/17066e1baf5de0cb?w=1492&h=588&f=png&s=189800)

🎉🎉🎉

# 介绍
用原生的微信小程序代码写了一个自我的社交项目。

这是一个自我社交的项目，没有接口，数据存储在本地，可以理解成一个自嗨的树洞。

一个项目的实战是一个不断自我学习的过程，在这个过程中，遇到了很多问题，将面临怎么样的思考，如何解决。


# 项目演示


下面是部分页面的截图：

![](https://user-gold-cdn.xitu.io/2020/2/21/17065e41dd1f3a76?w=828&h=1792&f=jpeg&s=107317)
![](https://user-gold-cdn.xitu.io/2020/2/21/17065e4888411ca5?w=828&h=1792&f=jpeg&s=46545)
![](https://user-gold-cdn.xitu.io/2020/2/21/17065e4b157bf4c1?w=828&h=1792&f=png&s=190782)

# 知识点合集
话不多说，上干货，以下所有知识点都基于项目：



## 创建新页面
创建新页面不需要手动一个文件一个文件的创建，在app.json文件里面，当你每输入一个page，系统就会在pages文件夹下面自动创建好所有的文件+文件夹
```JavaScript
  "pages": [
    "pages/message/message",
    "pages/pao/pao"
  ],
```


## 底部tab的实现
在app.json文件里面，可以统一配置底部tabbar栏
```JavaScript
 "tabBar": {
    "color": "#999",
    "selectedColor": "#444",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/message/message",
        "text": "bibi",
        "iconPath": "assets/tabs/message.png",
        "selectedIconPath": "assets/tabs/message-active.png"
      },
      
      {
        "pagePath": "pages/pao/pao",
        "text": "开炮",
        "iconPath": "assets/tabs/pao.png",
        "selectedIconPath": "assets/tabs/pao-active.png"
      }
    ]
  },
```

## 获取微信用户的信息
当我们初始化微信小程序的时候，app.js里面自带了获取微信用户信息的代码：
```
  wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
```
如上面代码可以知道，获取到的用户信息已经存储到了app的globalData里面：

```JavaScript
globalData: {
    userInfo: null
}
```

如果我们想要在其他page使用到`userInfo`：

```JavaScript
const app = getApp()
const userInfo = app.globalData.userInfo
```

但是：  

值得注意的是`this.userInfoReadyCallback`

因为获取用户信息是异步的，所以我们并不能保证在渲染页面之前就能够拿到用户信息，所以有了这个callback函数供我们使用，比如在home.js页面，我们在生命周期onload函数里面：

```JavaScript
onLoad: function (options) {
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
  },
```
如果在加载页面之前已经有userInfo了，那太好了，直接设置。如果没有就调用`userInfoReadyCallback`回调函数，设置一下。



## getStorageSync

这个项目所有的数据都是存储在本地storage里面的，作为一个对内的项目，这个storage的功能是非常好的。在关闭了小程序重新打开，里面的数据也不会丢失！ 

`getStorage`有两个方法

1. 一个是`getStorage`
```JavaScript
 wx.getStorage({
      key: 'mentions',
      success: (res)=>{
        const storageList = res
      }
    })
```

2. 一个是`getStorageSync`(推荐)
```JavaScript
const storageList = wx.getStorageSync('mentions');
```



## 选择手机相册的图片/拍照

```JavaScript
   wx.chooseImage({
      count: 6, //允许选择的图片数
      sizeType: ['original', 'compressed'], //原始的 / compressed压缩过的
      sourceType: ['album', 'camera'], // 相册 和 相机
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          imageList: [...that.data.imageList, ...tempFilePaths]
        })
      }
    })
```



## 图片被挤压

在我刚开始做的时候，`<image>`里面的图片压缩自己，填充在了image里面，这很难看，并不是我想要的效果，解决办法是：`mode="aspectFill"`：

```html
<image mode="aspectFill" class="image" src="{{image}}" bindtap="previewImage" data-src="{{image}}" data-list="{{imageList}}"> </image> 
```



## wxml里如何给方法传递参数

data-?="参数"       

`data-list="{{imageList}}"`  

wxml:
```html
<image mode="aspectFill" class="image" src="{{image}}" bindtap="previewImage" data-src="{{image}}" data-list="{{imageList}}"> </image> 
```
js:
```JavaScript
previewImage: function(e){
    const list = e.target.dataset.list;
}
```


## system/sdk

当我想要使用接口`wx:animate`，结果发现不能使用，上网一查原来是版本太低，如何查看版本：
```JavaScript
wx.getSystemInfoSync()
```
得知了自己版本低之后，如何升级版本？ 
> 在开发者工具里面顶部有一个按钮：详情，点击之后，选择“本地设置”，调试基本库改一下就好！

![](https://user-gold-cdn.xitu.io/2020/2/21/17066bb0af8a9f3f?w=1540&h=848&f=png&s=221227)


## 动画Animation

调好了库，那么wx的animation如何实现呢：  

实现一个`height`从0到100%：
```JavaScript

  heightAnimation('#main',0,100) 
  
  heightAnimation: function(id, start, end, callback){
      this.animate(id, [
        {height: `${start}%`},
        {height: `${end}%`}
      ], 500, callback && callback())
    }
```

实现一个`opacity`从0到1，从透明变不透明：
```JavaScript
 opacityAnimation('#main',0,1)
 
 opacityAnimation: function(id, start, end, callback){
      this.animate(id, [
        {opacity: start},
        {opacity: end}
      ], 500, callback && callback())
    },
```


## 如何使用component

从最开始的全量page到最后的component拆分，component拆分可以使代码变得不那么臃肿庞大，修改重构的时候，都能够快速定位到某一部分的代码，提升开发效率：  

如果要在某一个父组件里面使用xx component，就要在这个父组件的json文件里面定义一下：
```JavaScript
{
  "component": true,
  "usingComponents": {
    "user-des": "./components/user-des/user-des",
    "user-info":"./components/user-info/user-info",
    "user-behaviour":"./components/user-behaviour/user-behaviour"
  }
}
```
在wxml里面引入方式：
```html
<view class="top">
	<user-info class="info" user="{{user}}" time="{{item.time}}"></user-info>
	<user-behaviour class="behaviour" id="{{item.id}}" list="{{item.images}}" bind:onDelete="onDelete" bind:onUpdate="onUpdate"></user-behaviour>
</view>
```




## 父组件与子组件之间的通信传值/传参

### 1.父组件如何向子组件传值

这是父组件A的代码，向子组件`user-info`传递了`user`和 `time`：

```JavaScript
<view class="top">
	<user-info class="info" user="{{user}}" time="{{item.time}}"></user-info>
	<user-behaviour class="behaviour" id="{{item.id}}" list="{{item.images}}" bind:onDelete="onDelete" bind:onUpdate="onUpdate"></user-behaviour>
</view>
```
子组件如何接受到父组件传递过来的值：

`properties`就是保存父组件传递过来的值，`data`就是组件自己的值。这里和React的props和state特别像！


```JavaScript
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user:{
      type:Object,
      value:{}
    },
    time:{
      type: String,
      value:''
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
  }
})

```


### 2.子组件如何向父组件传值

在react里面通过的方式，就是通过函数的回调给父组件传值！

子组件js文件：
```JavaScript
onDeleteChild: function(){
    this.triggerEvent('onDeleteFather',{id: this.properties.id});
}
```

父组件的wxml文件：
```html
<user-behaviour class="behaviour" id="{{item.id}}" list="{{item.images}}" bind:onDeleteFather="onDeleteFatherSelf" bind:onUpdate="onUpdate"></user-behaviour>
```

触发了父组件自己的onDeleteFatherSelf方法，获取到了子组件传递过来的id：

```
onDeleteFatherSelf: function(e){
    const id = e.detail.id
}
```



## 部分生命周期的执行顺序

> 在选择图片的时候，弹出手机的相册，这个时候，当前page页面会执行onHide生命周期， 当你关闭了选择图片的框框， 会执行onShow生命周期  

生命周期这个东西，光用脑子想还是不行的，很快就忘了，最重要的还是实践！实践！实践！⛽️



## wxs：如何在wxml的class里面用函数（传参）

写代码的途中自己有个需求就是，需要在class里面调用函数，并且还可以传递参数，三元表达式已经不能满足我了，于是我找到了一个可以实现的方法，就是wxs：  

如何使用wxs:

1. 新建一个wxs文件，里面写着你的function， 记得导出
2. 在wxml里面引入
```html
<wxs src="./delete-animation.wxs" module="dm" />

md.导出的方法
```


## 页面跳转

【注意⚠️】如果是tab页跳转tab页，navigate是失效的，一定要用switchTab！

【注意⚠️】但是switchTab不能传递参数！navigate可以传递参数！

【注意⚠️】又要用switchTab，又要传递参数，可以把数据存储在app的globalData里！


