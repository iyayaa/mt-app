<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="provinceVal"
      placeholder="省份">
      <el-option
        v-for="item in provinceOpt"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cityVal"
      :disabled="!cityOpt.length"
      placeholder="城市">
      <el-option
        v-for="item in cityOpt"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>

  export default {
  	data(){
  		return {
  			provinceVal:'',
  			provinceOpt:[],
  			cityVal:'',
			cityOpt:[],
			input:'',
  		}
  	},
  	methods:{
  		handleSelect(){},
  		querySearchAsync(){},
  	},
  	async mounted(){
  		let {status,data:{province}} = await this.$axios.get('/geo/province')
  		if(status===200){
  			this.provinceOpt = province.map((item) => {
  				return {
  					label:item.name,
  					value:item.id
  				}
  			})
		}
  	},
  	watch:{
  		async provinceVal(newvalue){
  			let {status,data:{city}}=await this.$axios.get(`/geo/province/${newvalue}`)
  			if(status===200){
		        this.cityOpt = city.map(item=>{
		          return {
		            value:item.id,
		            label:item.name
		          }
		        })
		        this.cityVal = ''
	        }
  		}
  	},
  }
</script>

<style lang="scss">
  @import '@/assets/css/changeCity/iselect.scss'
</style>
