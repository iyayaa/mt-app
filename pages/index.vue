<template>
	<div class="page-index">
		<el-row>
		  <el-col :span="5">
		  	<index-menu />
		  </el-col>
		  <el-col :span="19">
		  	<index-life/>
		  </el-col>
		</el-row>
		<el-row>
		  <el-col :span="24"><div>666</div></el-col>
		</el-row>
	</div>
</template>

<script>

import indexMenu from '@/components/index/menu.vue'
import indexLife from '@/components/index/life'

export default {
  components: {
  	indexMenu,
  	indexLife,
  }
}
</script>

<style lang="scss">

  @import "@/assets/css/index/index.scss";
</style>
