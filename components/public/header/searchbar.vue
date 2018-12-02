<template>
  <div class="search-panel">
   <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col  :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="searchKey" placeholder="搜索商家或地点" @focus="inputFocus" @blur="inputBlur" @input="searchInput" />
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl class="hotPlace" v-if="isHotPlace" >
            <dt>热门搜索</dt>
            <dd v-for="item in hotPlace">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="item in searchList">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest" >
          <a :href="'/products?keyword='+encodeURIComponent(item.name)" v-for="item in hotPlace" >{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right" >
        <ul class="security">
          <li>
            <i class="refund"/><p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"/><p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"/><p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import lodash from 'lodash';
  
  export default {
    data () {
      return {
        searchKey:'',
        isFocus: false, 
        hotPlace: this.$store.state.home.hotPlace.slice(0, 5), 
        searchList: [],
      }
    },
    methods:{
      inputFocus (){
        this.isFocus = true
      },
      inputBlur(){
        this.isFocus = false
      },
      searchInput: 
        // 获取与当前输入相关的热门搜索列表
        lodash.debounce(async function(){
          let city = this.$store.state.geo.position.city.replace('市', '')
          this.searchList = []
          let {status, data: {top}} = await this.$axios.get('/search/top', {
            params: {
              input: this.searchKey,
              city
            }
          })
          this.searchList = top.slice(0, 10)
        },300)
    },
    computed:{
      isHotPlace (){
        return this.isFocus && !this.searchKey
      },
      isSearchList(){
        return this.isFocus && this.searchKey
      }
    },
    components: {
    
    }
  }
</script>

<style lang="scss">
</style>