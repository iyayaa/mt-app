<template>
  <el-row class="m-header">
	<el-col :span="5">
		<header-geo />
	</el-col>
	<el-col :span="5">
		<header-user />
	</el-col>
	<el-col :span="14">
		<header-nav />
	</el-col>
  </el-row>
</template>

<script>
import HeaderGeo from './geo.vue'
import HeaderUser from './user.vue'
import HeaderNav from './nav.vue'
export default {
	components:{
		HeaderGeo,
		HeaderUser,
		HeaderNav,
	}
}
</script>

<style lang="scss">
	@import "~assets/css/public/layout.scss";
	@import "@/assets/css/public/header/index.scss";

</style>
