<template>
  <el-row class="page-product">
    <el-col :span="19">
		<crumbs :keyword="keyword"/>
		<categroy :types="types" :areas="areas"/>
    </el-col>
    <el-col :span="5">2
    </el-col>
  </el-row>
</template>

<script>

import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'


  export default {
    components:{
	  Crumbs,
	  Categroy,
	},
	data(){
      return {
        keyword:'波龙',
        types:[{
        	type:'娱乐',
        	module:['杨幂','唱歌','浮动','操作','唱歌','浮动','操作']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        },],
        areas:[{
        	type:'健身',
        	module:['瑜伽','体操']
        },{
        	type:'娱乐',
        	module:['杨幂','唱歌']
        }],
      }
    },
  }
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
