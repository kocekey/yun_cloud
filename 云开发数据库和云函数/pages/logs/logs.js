//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    originalimg1:'../images/8856f1865e892ed.jpg',
    originalimg2:'../images/8856f1865e892ed.jpg',
    originalimg3:'../images/8856f1865e892ed.jpg',
    originalimg4:'../images/8856f1865e892ed.jpg',
    originalvideo:"../images/8856f1865e892ed.jpg",
    text:''
  },

  onReady:function(){
    this.videoContext = wx.createVideoContext('myVideo')
  },

  onLoad: function () {
  },
  
  getRandomColor:function () {
    let rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  
  getinput:function(e)
  {
    this.text=e.detail.value;
  },

  senddanmu:function()
  {
    this.videoContext.sendDanmu({
      text: this.text,
      color: this.getRandomColor()
    })
  },

  uploadfile:function()
  {
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        wx.cloud.uploadFile({
          cloudPath:'xlsx测试.xlsx',
          filePath: res.tempFiles[0].path,
          success:res=>
          {
             console.log('上传成功++');
          }
         })
      }
    })
  },

  openfile:function(){
        wx.cloud.downloadFile({
          fileID: 'cloud://key7-mrnp2.6b65-key7-mrnp2-1301545772/xlsx测试.xlsx', // 文件 ID
          success: res => {
            // 返回临时文件路径
            console.log(res.tempFilePath)
            wx.openDocument({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
              fail:function(err)
              {
                console.log(err)
              }
            })
          },
          fail: console.error
        })
  },

  loadimg:function(e)
  {
    var num=e.currentTarget.dataset.num;
    var that=this;
      wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.upload(num,res.tempFilePaths[0])
      }
      })
  },

  loadvideo:function(e){
    var num=e.currentTarget.dataset.num;
    var that=this;
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        var FilePaths=res.tempFilePath;
        that.uploadvideo(FilePaths);
      }
    })
  },
  
  uploadvideo:function(FilePaths)
  {
    var time=new Date().getTime();
    wx.cloud.uploadFile({
      cloudPath:time+'.mp4',
      filePath: FilePaths,
      success:res=>
      {
       this.setData({
        originalvideo:res.fileID
       })
      }
    })
  },
  
  upload:function(num,FilePaths)
  {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime()+'.png',
      filePath: FilePaths, 
      success: res => {
        switch(num)
        {
          case '1':
            this.setData({originalimg1:res.fileID});
          break;
          case '2':
            this.setData({originalimg2:res.fileID});
          break;
          case '3':
            this.setData({originalimg3:res.fileID});
          break;
          case '4':
            this.setData({originalimg4:res.fileID});
          break;
        } 
        console.log(num)
      },
      fail: console.error
    })
  }
})
