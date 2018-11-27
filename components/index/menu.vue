<template>
	<div class="m-menu">
      <dl class="nav" @mouseleave="lineLeave" >
	    <dt>全部分类</dt>
	    <dd v-for="item in menu" @mouseenter="lineEnter"><i :class="item.type"/>{{item.name}}<span class="arrow"/></dd>
	  </dl>
	  <div v-if="kind" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
        <template v-for = "(item,index) in curdetail.child" >
          <h4>{{item.title}}</h4>
          <span v-for ="kind in item.child">{{kind}}</span>
        </template>
      </div>
	</div>
</template>

<script>

export default {
  data(){
  		return {
  		  kind:'',
  		  menu: [
  		  {
            type: 'food',
            name: '美食',
            child: [{
              title: "美食",
              child: ["代金券", "甜点饮品",'火锅', '自助餐', '小吃快餐']
            }]
          },
          {
            type: 'takeout',
            name: '外卖',
            child: [{
              title: "外卖",
              child: ["美团外卖"]
            }]
          },
          {
            type: 'hotel',
            name: '酒店',
            child: [{
              title: "酒店星际",
              child: ["经济型", "舒适/三星", "高档/四星", "豪华/五星"]
            }]
          }
        ],
      }
  },
  computed:{
  	curdetail(){
  		return this.menu.filter((item)=>{
  			return item.type == this.kind
  		})[0]
  	},
  },
  methods:{
  	detailEnter(){
  		clearTimeout(this.timer)
  	},
	detailLeave(){
		this.kind = ''
	},
  	lineEnter(e){
  		this.kind = e.target.querySelector('i').className
  	},
  	lineLeave(){
  		this.timer = setTimeout(()=>{
  			this.kind = ''
  		},200)
  	},
  },
  components: {

  }
}
</script>

<style lang="scss">

</style>
