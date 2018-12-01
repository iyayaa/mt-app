// 搜索相关接口

import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'
import Poi from '../dbs/models/poi'

let router = new Router({
  prefix: '/search'
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

router.get('/hotPlace', async (ctx) => {
  // let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  // try {
  //   let result = await Poi.find({
  //     city,
  //     type: ctx.query.type || '景点'
  //   }).limit(10)
  //
  //   ctx.body = {
  //     code: 0,
  //     result: result.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     })
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     result: []
  //   }
  // }
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  let {status, data: {result }} = await axios.get(`${Config.requestUrl}/search/hotPlace`, {
    params: {
      sign:Config.sign,
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

// 首页section接口
router.get('/resultsByKeywords', async (ctx)=>{
  const {city, keyword} = ctx.query;
  let {status, data:{count, pois}} = await axios.get(`${Config.requestUrl}/search/resultsByKeywords`, {
    params: {
      city,
      keyword,
      sign:Config.sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois: []
  }
})

export default router