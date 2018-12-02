// 城市服务相关接口

import Router from 'koa-router'
import axios from './utils/axios'
import Config from '../dbs/config'
// import Province from '../dbs/models/province'

let router = new Router({
  prefix: "/geo"
})

const sign = "a3c9fe0782107295ee9f1709edd15218"

router.get('/getPosition', async (ctx)=>{
  let {
  	status, 
  	data: {province,city}
  	} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)

    if(status === 200) {
        ctx.body = {
          province,
          city
        }
    }
    else
    {
      ctx.body = {
        province: '',
        city: ''
      }
    }
})

router.get('/menu', async (ctx)=>{
  // const result = await Menu.findOne()
  // ctx.body = {
  //   menu: result.menu
  // }
  let {status,
  	data: {menu}} = await axios.get(`${Config.requestUrl}/geo/menu?sign=${sign}`)
  ctx.body = {
    menu: status === 200
      ? menu
      : []
  }
})

router.get('/province', async (ctx)=>{
  // let province = await Province.find();
  // console.log(province);
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }

  let {status, data: {province}} = await axios.get(`${Config.requestUrl}/geo/province?sign=${sign}`)
  ctx.body = {
    province:status === 200 ? province : []
  }
})

router.get('/province/:id', async (ctx)=>{
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`${Config.requestUrl}/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async (ctx) => {
  // let city = []
  // let result = await City.find()
  // result.forEach(item => {
  //   city = city.concat(item.value)
  // })
  // ctx.body = {
  //   code: 0,
  //   city: city.map(item => {
  //     return {
  //       province: item.province,
  //       id: item.id,
  //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
  //         ? item.province
  //         : item.name
  //     }
  //   })
  // }
  let {status, data: {
      city
    }} = await axios.get(`${Config.requestUrl}/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})


export default router;