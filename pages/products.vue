<template>
  <el-row class="page-product">
    <el-col :span="19">
		<crumbs :keyword="keyword"/>
    </el-col>
    <el-col :span="5">2
    </el-col>
  </el-row>
</template>

<script>

import Crumbs from '@/components/products/crumbs.vue'


  export default {
    components:{
	  Crumbs,
	},
	data(){
      return {
        keyword:'波龙',
      }
    },
  }
</script>

<style lang="scss">
  @import '@/assets/css/products/index.scss'
</style>
