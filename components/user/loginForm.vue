<template>
  <el-form
    ref="form"
    :model="form"
    class="form"
    :rules="rules"
  >
    <el-form-item
      class="form-item"
      prop="username"
    >
      <el-input
        v-model="form.username"
        placeholder="用户名/手机"
      />
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="password"
    >
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">
        忘记密码
      </nuxt-link>
    </p>
    <el-button
      class="submit"
      type="primary"
      @click="handleLoginSubmit"
    >
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLoginSubmit() {
      // 校验表单是否符合
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$store.dispatch('user/login', this.form).then((res) => {
            this.$router.push('/')
          })
        } else {
          return false
        }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
  .form-item {
    margin-bottom: 20px;
  }
  .form-text {
    color: rgb(64, 158, 255);
    font-size: 12px;
    text-align: right;
    line-height: 1;
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
