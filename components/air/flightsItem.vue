<template>
  <div class="flight-item">
    <!-- 显示航班信息 -->
    <div @click="isShow = !isShow">
      <el-row
        type="flex"
        align="middle"
        class="flight-info"
      >
        <el-col
          :span="6"
          class="flight-part"
        >
          <span>{{ data.airline_name }}</span>
          <span>{{ data.flight_no }}</span>
        </el-col>
        <el-col :span="12">
          <el-row class="flight-departport">
            <el-col :span="8">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }}</span>
            </el-col>
            <el-col
              :span="8"
              class="flight-time"
            >
              <span>2时20分</span>
            </el-col>
            <el-col
              :span="8"
              class="flight-airport"
            >
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="6"
          class="flight-price"
        >
          ￥<span>810</span>起
        </el-col>
      </el-row>
    </div>

    <!-- 隐藏座位信息 -->
    <div
      v-show="isShow"
      class="flight-recommend"
    >
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
      >
        <el-col :span="4">
          <span>低价推荐</span>
        </el-col>
        <el-col :span="20">
          <el-row
            v-for="(item,index) in data.seat_infos"
            :key="index"
            class="flight-cell"
            type="flex"
            justify="space-between"
            align="middle"
          >
            <el-col
              :span="16"
              class="flight-sell-left"
            >
              <span>{{ item.name }}</span>|{{ item.supplierName }}
            </el-col>
            <el-col
              :span="5"
              class="flight-price"
            >
              {{ "￥"+ item.par_price }}
            </el-col>
            <el-col
              :span="3"
              class="choose-button"
            >
              <el-button
                type="warning"
                size="mini"
              >
                选定
              </el-button>
              <span>{{ "剩余:"+ item.discount }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      defalut: {}
    }
  },
  data() {
    return {
      isShow: false // 默认座位信息为隐藏
    }
  }
}
</script>
<style lang="less" scoped>
.flight-item {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  .flight-info {
    padding: 15px;
    cursor: pointer;
  }
}

.flight-departport {
  padding: 0 30px;
  text-align: center;
  .flight-time {
    span {
      display: inline-block;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      color: #999;
    }
  }
  strong {
    display: block;
    font-size: 24px;
    font-weight: 400;
  }
  span {
    font-size: 12px;
    color: #999;
  }
}
.flight-price {
  text-align: center;
  span {
    font-size: 24px;
    color: orange;
    margin: 0 2px;
  }
}
.flight-part {
  text-align: center;
}
.flight-recommend {
  background: #f6f6f6;
  border-top: 1px solid #eee;
  padding: 0 20px;
}

.flight-cell {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  .flight-sell-left {
    font-size: 12px;
    span {
      color: green;
    }
  }
}
.flight-price {
  font-size: 20px;
  color: orange;
}
.choose-button {
  text-align: center;
  color: #666;
  > div {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
