<template>
  <!-- 筛选框 -->
  <div class="container">
    <el-row
      type="flex"
      justify="space-between"
    >
      <!-- 左边表单 -->
      <div class="flights-content">
        <div>
          <!-- 顶部筛选组件 -->
        </div>
        <!-- 表单头部组件 -->
        <FlightsListHead />
        <!-- 航班信息组件 -->
        <FlightsItem
          v-for="(item,index) in flightData"
          :key="index"
          :data="item"
        />
      </div>
      <!-- 右边侧栏 -->
      <div class="aside">
        <!-- 右边栏组件 -->
      </div>
    </el-row>
  </div>
</template>
<script>
import FlightsListHead from '@/components/air/flightsListHead'
import FlightsItem from '@/components/air/flightsItem'
export default {
  components: {
    FlightsListHead,
    FlightsItem
  },
  data() {
    return {
      flightData: { }
    }
  },
  mounted() {
    this.$axios({
      url: '/airs',
      method: 'GET',
      params: this.$route.query
    }).then((res) => {
    //   console.log(res)
      this.flightData = res.data.flights
      console.log(this.flightData)
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.flights-content {
  width: 745px;
  font-size: 14px;
}
.aside{
    width: 240px;
}
</style>
