// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"key7-mrnp2"
})

const db=cloud.database().collection('bookshop')

// 云函数入口函数
exports.main = async (event, context) => {
  var _iid=event._id;
  var updid=event.updid;
  var updbookname=event.updbookname;
  var updprice=event.updprice;  
  try {
    return await db.where({
      _id:_iid
    }).update({
      data: {
        id:updid,
        bookname:updbookname,
        price:updprice
      },
    })
  } catch(e) {
    console.error(e)
  }
}