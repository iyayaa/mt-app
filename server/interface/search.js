// 搜索相关接口

import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'
import Poi from '../dbs/models/poi'

let router = new Router({
  prefix: "/search"
})

router.get('/top', async (ctx) => {
  // try {
  //   let top = await Poi.find({
  //     name: new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }
  let {status, data: {top}} = await axios.get(`${Config.requestUrl}/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign:Config.sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})



export default router