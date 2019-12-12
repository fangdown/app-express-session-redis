const express = require('express')
const session = require('express-session')
const connectRedis = require('connect-redis')
const IORedis = require('ioredis')
const RedisStore = connectRedis(session);
const redisClient = new IORedis({
  "host": "148.70.216.xx",
  "port": 6379,
  "db": 0,
  "password": "xxx",
  "prefix": "fd:"
});
const redisStore = new RedisStore({client: redisClient});
const app =  express()
app.use(session({
  "secret": "fangdown-sign", //通过设置的secret字符串，来计算hash值并放在cookie中，使产生的signedCookie防篡改
  "name": "fd", // 设置cookie中，保存session的字段名称，默认为connect.sid
  "rolling": true, // 每个请求都重新设置一个cookie，默认为false
  "resave": true,  // 即使session没有被修改，也保存session值，默认为true
  "saveUninitialized": false, // 强制未初始化的session保存到数据库
  "cookie": {
    "maxAge": 86400000,
  },
  store: redisStore
}))
app.get('/', (req, res) => {
  if(req.session && req.session.isVisit || req.cookies.isFirst){
    req.session.isVisit+=1
    res.send(`<p>第 ${req.session.isVisit}次来此页面</p>`)
  }else{
    req.session.isVisit = 1
    res.cookie('isFirst', 1);
    res.send('欢迎第一次访问')
  }
})
app.listen(10000, () =>{
  console.log('app is start on 10000')
})