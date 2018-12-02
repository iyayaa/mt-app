<template>
  <el-row class="page-product">
    <el-col :span="19">
		<crumbs :keyword="keyword"/>
		<categroy :types="types" :areas="areas"/>
		<list :list="list"/>
    </el-col>
    <el-col :span="5">2
    </el-col>
  </el-row>
</template>

<script>

import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'


  export default {
    components:{
	  Crumbs,
	  Categroy,
	  List,
	},
	data(){
      return {
        keyword:'',
        types:[],
        areas:[],
        list:[],
      }
    },
    async asyncData(ctx){
	    let keyword = ctx.query.keyword
	    let city = ctx.store.state.geo.position.city
	    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
	      params:{
	        keyword,
	        city
	      }
	    })
	    let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs',{
	      params:{
	        city
	      }
	    })
	    if(status===200&&count>0&&status2===200){
	      return {
	        list: pois.filter(item=>item.photos.length).map(item=>{
	          return {
	            type: item.type,
	            img: item.photos[0].url,
	            name: item.name,
	            comment: Math.floor(Math.random()*10000),
	            rate: Number(item.biz_ext.rating),
	            price: Number(item.biz_ext.cost),
	            scene: item.tag,
	            tel: item.tel,
	            status: '可订明日',
	            location: item.location,
	            module: item.type.split(';')[0]
	          }
	        }),
	        keyword,
	        areas: areas.filter(item=>item.type!=='').slice(0,5),
	        types: types.filter(item=>item.type!=='').slice(0,5),
	      }
	    }
	},
	mounted(){
		
	},
  }
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
