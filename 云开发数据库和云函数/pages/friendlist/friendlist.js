// pages/friendlist/friendlist.js
const db = wx.cloud.database().collection("pqy")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataarr:[],
      pyqimg:[],
      hidden:100,
      focus:false,
      comm:100
  },


  jumptopyq:function()
  { 
   wx.navigateTo({
     url: '../friend/friend',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    // wx.cloud.downloadFile({
    //   fileID: 'cloud://key7-mrnp2.6b65-key7-mrnp2-1301545772/uploadImages/1586155301811.jpg', 
    //   success: res => {
    //     // 返回临时文件路径
    //     this.setData({
    //       pyqimg:res.tempFilePath
    //     })
    //   },
    //   fail: console.error
    // }),
    db.orderBy('time','desc').get({
      success:function(res)
      {
        that.setData({
          dataarr:res.data
        })
      }
    })
  },

  diantap:function(e)
  {
    var index=e.currentTarget.dataset.index;
    if(this.data.hidden==100)
    {
      this.setData({
        hidden:index
      })
    }
    else{
      this.setData({
        hidden:100
      })
    }
  },

  zantap:function(e)
  {
    var that=this
    var text=e.currentTarget.dataset.text;
    db.where({
      text:text
    }).update({
        data:{
          dianzan:['17']
        },
        success:function(res)
        {
          that.setData({
            hidden:100
          })
          var page = getCurrentPages().pop();  
          if (page == undefined || page == null) return;  
          page.onLoad(); 
        }
    })
  },

  commenttap:function(e)
  { 
    var index=e.currentTarget.dataset.index;
    if(this.data.comm==100)
   this.setData({
     comm:index
   })
   else
   {
     this.setData({
       comm:100
     })
   }
  },

  concomment:function(e)
  { 
    var that=this;
    var text=e.currentTarget.dataset.text;
    var inputtext=e.detail.value;
    db.where({
      text:text
    }).update({
        data:{
          inputtext:inputtext
        },
        success:function(res)
        {
          that.setData({
            comm:100,
            hidden:100
          })
          var page = getCurrentPages().pop();  
          if (page == undefined || page == null) return;  
          page.onLoad(); 
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