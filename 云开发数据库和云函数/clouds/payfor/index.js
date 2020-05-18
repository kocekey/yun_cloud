// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//1.引入tenpay依赖
const tenpay = require('tenpay');
//2.配置参数
const config = {
  appid: 'wxd0d9cb0098b116a8',
  mchid: '',//商户号
  partnerKey: '微信支付安全密钥',//商户号关联微信，获取密钥
  notify_url: 'http://www.baidu.com',
  spbill_create_ip: '127.0.0.1'
};

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //3.初始化
  const api=tenpay.init(config);
  //4.获取支付参数
  let result = await api.getPayParams({
    out_trade_no: '1234567',
    body: '商品简单描述',
    total_fee:1,
    openid: wxContext.OPENID
  });
  return result
}