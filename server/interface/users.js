import Router from "koa-router";
import Redis from "koa-redis";
import nodeMailer from "nodemailer"
import User from "../dbs/models/users"
import Passport from "./utils/passport"
import Email from "../dbs/config"
import axios from "./utils/axios"

let router = new Router({
  prefix: "/users"
})

let Store = new Redis().client

/**
 * -----注册-----
 */
router.post("/signup", async (ctx)=>{
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body;//post方式

  // 验证验证码
  if(code) {
    const saveCode = await Store.hget(`nodemail:${username}`, "code");
    const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
    if(code === saveCode) {
      if(new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: "验证码已过期，请重新尝试"
        }
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "请填写正确的验证码"
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "请填写验证码"
    }
  }

  // 验证用户名是否已存在
  let user = await User.find({
    username
  })
  if(user.length) {
    ctx.body = {
      code: -1,
      msg: "用户名已被注册"
    }
    return
  }

  //创建新用户
  let nuser = await User.create({
    username,
    password,
    email
  })
  if(nuser) {
    let res = await axios.post('/users/signin', {
      username,
      password
    })
    if(res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: "注册成功",
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "error"
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "注册失败"
    }
  }

})
/**
 * -----登录-----
 * 在使用 passport.authenticate('策略', ...) 的时候，会执行策略
 */
router.post('/signin', async (ctx, next)=>{
  return Passport.authenticate("local", function(err, user, info, status){
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if(user) {
        ctx.body = {
          code: 0,
          msg: "登录成功",
          user
        }
        // 在调用 ctx.login() 时会触发序列化操作
        // ctx.login(user) 登录用户（序列化用户）
        return ctx.login(user)
      } else { //没有获取到用户
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})
/**
 * -----验证码发送-----
 */
router.post("/verify", async(ctx, next)=>{
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemail:${username}`, "expire")
  if(saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: "验证请求过于频繁，1分钟内1次"
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `认证邮件<${Email.smtp.user}>`,
    to: ko.email,
    subject: "《慕课网高仿美团网全栈实战》注册码",
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }
  await transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
      return console.log(err);
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: "验证码已经发送，可能会有延时，有效期1分钟"
  }
})
/**
 * 退出登录
 */
router.get('/exit', async (ctx, next)=>{
  await ctx.logout()
  // ctx.isAuthenticated() 判断是否认证
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})
/**
 * 获取用户信息
 */
router.get('/getUser', async (ctx)=>{
  if(ctx.isAuthenticated()) {
  	// passport将用户信息存在ctx.session.passport中
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
    // 取出为空，没有登录
  } else {
    ctx.body = {
      user: "",
      email: ""
    }
  }
})

export default router;