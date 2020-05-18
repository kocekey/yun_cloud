// pages/friend/friend.js
var app=getApp()
const db = wx.cloud.database().collection("pqy")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    r:[],
    time:'',
    text:'',
    rres:'',
    hidden:true,
    addedimgs:[],
    addimg:'../images/8856f1865e892ed.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  gettext:function(e)
  {
    var text=e.detail.value;
    this.setData({
      text:text
    })
  },

  okto:function()
  {
    var that=this;
    var time=new Date().getTime();
    if(this.data.text!='')
    {
      db.add({
        data:{
          text:that.data.text,
          time:time,
          addedimgs:that.data.addedimgs
        },
        success:function()
        {
           console.log('添加成功...'+time)
        }
      })
    Promise.all(this.data.r.tempFilePaths.map((item) => { 
      return wx.cloud.uploadFile({
          cloudPath: 'uploadImages/' + Date.now() + item.match(/\.[^.]+?$/)[0], // 文件名称 
          filePath: item,
          success:function(res)
          {
            wx.switchTab({
              url: '../friendlist/friendlist?fileID='+res.fileID,
              success:function()
              {
                var page = getCurrentPages().pop();  
                if (page == undefined || page == null) return;  
                page.onLoad(); 
              }
            })
            wx.showToast({
              title: '发布成功......',
            })
          } 
      })
  }))
  .catch((err) => {
      console.log(err)
  })
    }
    else{
      wx.showToast({
        title: '发表内容不能为空..',
      })
    }
  },

  uploadimg:function()
  {
    var that=this;
      wx.chooseImage({
        count: 9, 
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
         that.setData({
           r:res,
           hidden:false,
           addedimgs:that.data.addedimgs.concat(res.tempFilePaths)
         })
        },
    })
  },
 
  delimg:function(e)
  {
    var delindex=e.currentTarget.dataset.index;
    this.data.addedimgs.splice(delindex,1);
    this.setData({
      addedimgs:this.data.addedimgs
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