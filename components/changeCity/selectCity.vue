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
    <span class="name">
    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;直接搜索：</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
  	data(){
  		return {
  			provinceVal:'',
  			provinceOpt:[],
  			cityVal:'',
			cityOpt:[],
			input:'',
			allCities:[]
  		}
  	},
  	methods:{
  		handleSelect(item) {
          console.log(item.value)
          // TODO:1 跳转到首页 2修改地区
        },
  		querySearchAsync:
  			_.debounce(async function(query,cb) {
  			  if(this.allCities.length){
			      cb(this.allCities.filter(item => item.value.indexOf(query)>-1))
			  }else{
			    let {status,data:{city}}=await this.$axios.get('/geo/city')
			    if(status===200){
			      this.allCities=city.map(item=>{return {
			        value:item.name
			      }})
			      cb(this.allCities.filter(item => item.value.indexOf(query)>-1))
			    }else{
			      cb([])
			    }
			  }
  			},200),

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
  		},
  	},
  }
</script>

<style lang="scss">
  @import '@/assets/css/changeCity/iselect.scss'
</style>
