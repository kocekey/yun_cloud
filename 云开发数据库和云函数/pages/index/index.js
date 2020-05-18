//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("bookshop")
Page({
  data: {
    updataarr:[],
    aid: null,
    abookname: null,
    aprice: null,
    showupdata: false,
    bookarr: [],
    id: null,
    bookname: '',
    price: null,
    updid:null,
    updbookname:'',
    updprice:null
  },
  //事件处理函数

  addbook: function () {
    let that = this
    db.add({
      data: {
        id: this.data.id,
        bookname: this.data.bookname,
        price: this.data.price
      },
      success: function () {
        that.setData({
          aid: '',
          abookname: '',
          aprice: ''
        })
        that.getbook();
      }
    })
  },

  addid: function (e) {
    var id=e.detail.value
    db.where({
      id:id
    }).get({
      success:function(res)
      {
        if(res.data[0].id!='')
        {
          wx.showModal({
            title: '此ID已存在！',
          })
        }
        else
        {
         }
      },
    })
    this.setData({
      id: id
    })
  },

  addbookname: function (e) {
    this.setData({
      bookname: e.detail.value
    })
  },

  addprice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  
  removebook:function(e)
  { 
    var id=e.currentTarget.dataset.id;
    var that=this
    wx.cloud.callFunction({
      name:'delete',
      data:{
        id:id
      },
      success:function()
      {
        that.getbook()
      }
    })
  },

  updatabook: function (e) {
    var id = e.currentTarget.dataset.id;
    var that=this
    db.where({ id: id }).get({
      success: function (res) {
        that.setData({
          updataarr:res.data
        })
      }
    })
    this.setData({
      showupdata: true
    })
  },
  
  updataid:function(e)
  {
    this.setData({
      updid: e.detail.value
    })
    if(e.detail.value=='')
    {
      wx.showToast({
        title: 'id不能为空',
        icon:'none'
      })
    }
  },

  updatabookname:function(e)
  {
    this.setData({
      updbookname: e.detail.value
    })
    if(e.detail.value=='')
    {
      wx.showToast({
        title: '书名不能为空',
        icon:'none'
      })
    }
  },

  updataprice:function(e)
  {
    this.setData({
      updprice: e.detail.value
    })
    if(e.detail.value=='')
    {
      wx.showToast({
        title: '价格不能为空',
        icon:'none'
      })
    }
  },
  confirmupdata: function () {
    let that=this
    if(that.data.updid==null)
    {
      var updidd=that.data.updataarr[0].id;
    }
    else{
      var updidd=that.data.updid;
    }
    if(that.data.updbookname==null)
    {
      var  updbooknamename=that.data.updataarr[0].bookname;
    }
    else
    {
      var updbooknamename=that.data.updbookname;
    }
    if(that.data.updprice==null)
    {
      var updapriceprice=that.data.updataarr[0].price;
    }
    else
    {
      var updapriceprice=that.data.updprice
    }
  wx.cloud.callFunction({
    name:"updata",
    data:{
      _id:that.data.updataarr[0]._id,
      updid:updidd,
      updbookname:updbooknamename,
      updprice:updapriceprice
    },
    success:function()
    {
      wx.showToast({
        title: '修改成功...',
        icon:'success'
      })
      that.getbook();
    }
  })
    this.setData({
      showupdata: false
    })
  },

  getbook: function () {
    let that = this
    db.get({
      success: function (res) {
        that.setData({
          bookarr: res.data
        })
        console.log(res.data)
      },
    })
  },
  onLoad: function () {
    this.getbook();
  }
})
