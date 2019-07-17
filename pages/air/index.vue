<template>
  <div class="container">
    <!-- 国内机票 -->
    <h2 class="domestic-ticket">
      <span class="iconfont iconfeiji" />
      <i>国内机票</i>
    </h2>
    <el-row
      type="flex"
      justify="space-between"
    >
      <!-- 机票搜索框 -->
      <SearchForm />
      <!-- 右侧banner -->
      <div class="air-banner">
        <img
          src="http://157.122.54.189:9093/images/pic_sale.jpeg"
          alt=""
        >
      </div>
    </el-row>
    <!-- 中间信息 -->
    <el-row
      type="flex"
      class="statement"
    >
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" /><span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" /><span> 出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" /><span> 7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 特价机票 -->
    <h2 class="cheap-ticket">
      <span class="iconfont icontejiajipiao" />
      <i>特价机票</i>
    </h2>
    <div class="air-sale">
      <el-row
        type="flex"
        justify="space-between"
        class="air-sale-img"
      >
        <el-col
          v-for="(item,index) in imgList"
          :key="index"
          :span="6"
        >
          <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
            <img :src="item.cover">
            <el-row
              class="air-sale-info"
              type="flex"
              justify="space-between"
            >
              <span>{{ item.departCity }}-{{ item.destCity }}</span><span>￥{{ item.price }}</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchForm from '@/components/air/searchForm'
export default {
  components: {
    SearchForm
  },
  data() {
    return {
      imgList: []
    }
  },
  mounted() {
    // 推荐机票接口
    this.$axios({
      url: '/airs/sale'
    }).then((res) => {
      const { data } = res.data
      this.imgList = data
      // console.log(this.imgList)
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .domestic-ticket {
    margin: 15px 0;
    color: orange;
    font-weight: 400;
    font-size: 20px;
  }
  .statement {
    margin: 15px 0;
    border: 1px solid #ddd;
    background: #f5f5f5;
    height: 58px;
    padding: 10px 0;
    box-sizing: border-box;
    div {
      text-align: center;
      line-height: 38px;
      border-right: 1px solid #ddd;
    }
  }
  .cheap-ticket {
    margin: 15px 0;
    font-size: 20px;
    font-weight: 400;
    color: #409eff;
  }
  .air-sale {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 50px;
    .air-sale-img {
      > div {
        width: 225px;
        height: 140px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
        }
        .air-sale-info {
          position: absolute;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          height: 30px;
          line-height: 30px;
          width: 100%;
          box-sizing: border-box;
          padding: 0 15px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
