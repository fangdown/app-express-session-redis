## node中使用

## 关键
1. 生成redis实例client(必需有client,网上方法有的直接把配置放进去，我这个版本不行，会报错)
2. 应用中间件session，参数为一些值，主要的为store，存储地点redisStore
3. 在请求中可以给req.session赋值，也可以读值
4. 启动应用

## 修改配置
redis数据库的连接要更改成自己的redis
## 启动

```npm run start```