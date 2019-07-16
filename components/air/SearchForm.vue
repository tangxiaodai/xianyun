<template>
  <div class="search-form">
    <!-- 头部tab栏 -->
    <el-row
      type="flex"
      class="search-tab"
    >
      <span
        v-for="(item,index) in tabs"
        :key="index"
        :class="{activ:current===index}"
        @click="handleSearchTab(index)"
      ><i :class="item.icon" />
        {{ item.name }}</span>
    </el-row>
    <!-- 搜索表单内容 -->
    <el-form
      ref="form"
      :model="form"
      class="search-form-content"
      label-width="80px"
    >
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          class="el-autocomplete"
          @select="handleDepartSelect"
        />
      </el-form-item>

      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          class="el-autocomplete"
          @select="handleDestSelect"
        />
      </el-form-item>

      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        />
      </el-form-item>

      <el-form-item label="">
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
        >
          搜索
        </el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleChangePart">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
// 设置时间的格式
import moment from 'moment'
export default {
  data() {
    return {
      // 默认是单程
      current: 0,
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      form: {
        departCity: '', // 出发城市
        destCity: '', // 到达城市
        departDate: '', // 出发日期

        departCode: '', // 出发城市代码
        destCode: '' // 到达城市代码
      }
    }
  },
  methods: {
    // 更改tab栏状态
    handleSearchTab(index) {
      if (index === 1) {
        this.$message.warning('往返的数据库暂时没有数据')
      }
    },
    // 当出发城市输入框值发生改变时——value是输入框的值，cb是回调函数
    queryDepartSearch(value, cb) {
      // 如果是空就不发起请求
      if (!value.trim()) {
        // 不显示下拉框
        cb([])
        return
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        // console.log(res)
        const { data } = res.data
        // 添加一个value属性，值等于name没有市字
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        // console.log(newData)
        cb(newData)
        // 默认选中第一个
        this.form.departCity = newData[0].value
        this.form.departCode = newData[0].sort
      })
    },
    // 出发城市下拉框选中时
    handleDepartSelect(item) {
      //   console.log(item)
      this.form.departCity = item.name
      this.form.departCode = item.sort
    },
    // 到达城市发生变化时
    queryDestSearch(value, cb) {
      // 如果是空就不发起请求
      if (!value.trim()) {
        // 不显示下拉框
        cb([])
        return
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: value
        }
      }).then((res) => {
        // console.log(res)
        const { data } = res.data
        // 添加一个value属性，值等于name没有市字
        const newData = data.map((v) => {
          return {
            ...v,
            value: v.name.replace('市', '')
          }
        })
        // console.log(newData)
        cb(newData)
        // 默认选中第一个
        this.form.destCity = newData[0].value
        this.form.destCode = newData[0].sort
      })
    },
    // 到达城市下拉框选中时
    handleDestSelect(item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 选择出发时间时
    handleDate(value) {
      //   console.log(item)
      this.form.departDate = moment(value).format('YYYY-MM-DD')
    },
    // 搜索表单提交时
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: '请输入出发城市'
        },
        destCity: {
          value: this.form.destCity,
          message: '请输入抵达城市'
        },
        departDate: {
          value: this.form.departDate,
          message: '请输入出发时间'
        }
      }
      // 设置rules初始值为true
      let valid = true
      Object.keys(rules).forEach((v) => {
        // console.log(v)
        if (!valid) return
        // 如果其中有一项值为flase,禁止向下运行
        if (!rules[v].value) {
          valid = false
          this.$message.warning(rules[v].message)
        }
      })
      if (valid) {
        this.$router.push({
          url: '/air/flights',
          params: this.form
        })
      }
    },
    // 点击换更换出发地和到达地
    handleChangePart() {
      const { departCity, departCode, destCity, destCode } = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode

      this.form.destCity = departCity
      this.form.destCode = departCode
    }

  }
}
</script>
<style lang="less" scoped>
.search-form {
  border: 1px solid #ddd;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
  .search-tab {
    span {
      display: block;
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px solid #eee;
      background-color: #eee;
      cursor: pointer;
    }
    & .activ {
      border-top-color: orange;
      background-color: #fff;
    }
  }
  .search-form-content {
    padding: 15px 50px 15px 15px;
    position: relative;
    el-form-item {
      margin-bottom: 22px;
      .el-autocomplete {
        width: 100%;
      }
    }
    .reverse {
      display: block;
      position: absolute;
      top: 57px;
      right: 40px;
      font-size: 12px;
      background: #999;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>
