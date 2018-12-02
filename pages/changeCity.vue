<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <select-city/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">2
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">3
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import selectCity from '@/components/changeCity/selectCity'

  export default {
    components:{
      selectCity
    },
  }
</script>

<style lang="scss">

</style>
