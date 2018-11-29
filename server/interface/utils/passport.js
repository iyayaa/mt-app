import passport from "koa-passport"
import LocalStrategy from "passport-local"
import UserModel from "../../dbs/models/users"

// app.use(passport.initialize()) 会在请求周期ctx对象挂载以下方法与属性

//     ctx.state.user 认证用户
//     ctx.login(user) 登录用户（序列化用户）
//     ctx.isAuthenticated() 判断是否认证

passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if(result != null){
    if(result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, "密码错误")
    }
  } else {
    return done(null,false,"用户不存在")
  }
}))

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  return done(null, user)
})

export default passport
