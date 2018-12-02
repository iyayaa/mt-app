<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <select-city/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot-city/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroyCity/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import selectCity from '@/components/changeCity/selectCity'
  import hotCity from '@/components/changeCity/hotCity.vue'
  import categroyCity from '@/components/changeCity/categroyCity.vue'

  export default {
    components:{
      selectCity,
      hotCity,
      categroyCity
    },
  }
</script>

<style lang="scss">

</style>
