// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"key7-mrnp2"
})

const db=cloud.database().collection('bookshop')

exports.main = async (event, context) => {
  var removeid=event.id
  try {
    return await db.where({
      id:removeid
    }).remove()
  } catch(e) {
    console.error(e)
  }
}