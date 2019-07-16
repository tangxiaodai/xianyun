<template>
  <div class="container">
    <!-- 主要内容 -->
    <el-row
      type="flex"
      class="main"
      justify="center"
      align="middle"
    >
      <div class="form-wrapper">
        <!-- 表单头部tag -->
        <el-row
          type="flex"
          class="tabs"
          justify="center"
        >
          <span
            v-for="(item,index) in [`登录`,`注册`]"
            :key="index"
            :class="{active: currentTab === index}"
            @click="handleChangeTab(index)"
          >{{ item }}</span>
        </el-row>
        <!-- 登录表单组件 -->
        <LoginForm v-if="currentTab===0" />
        <!-- 注册表单组件 -->
        <registerForm v-if="currentTab===1" />
      </div>
    </el-row>
  </div>
</template>
<script>
import LoginForm from '@/components/user/loginForm'
import registerForm from '@/components/user/registerForm'

export default {
  components: {
    LoginForm,
    registerForm
  },
  data() {
    return {
      // 默认当前tag值
      currentTab: 0
    }
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      position: relative;
    .form-wrapper {
      top: 400px;
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          box-sizing: border-box;
          height: 50px;
          border: 2px solid #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          background: #eee;
          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
