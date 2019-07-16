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
        placeholder="用户名手机号"
      />
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="captcha"
    >
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
        class="captcha"
      />
      <template>
        <el-button
          class="sendcapcha"
          @click="handleSendCapcha"
        >
          发送验证码
        </el-button>
      </template>
    </el-form-item>
    <el-form-item
      class="form-item"
      prop="nickname"
    >
      <el-input
        v-model="form.nickname"
        placeholder="你的名字"
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
    <el-form-item
      class="form-item"
      prop="confirmPwd"
    >
      <el-input
        v-model="form.confirmPwd"
        placeholder="确认密码"
        type="password"
      />
    </el-form-item>
    <el-button
      class="submit"
      type="primary"
      @click="handleRegisterSubmit"
    >
      注册
    </el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    // 校验确认密码的自定函数
    const validatePass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次输入密码'))
      } else if (this.form.password !== value) {
        return callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        captcha: '',
        nickname: '',
        password: '',
        confirmPwd: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPwd: [
          // 自定义校验
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 发送手机验证码
    handleSendCapcha() {
      // 1.检测手机号码是否为空
      const phoneNumber = this.form.username
      if (!phoneNumber.trim()) {
        this.$confirm('手机号码不能为空', '提示', {
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '确定'
        })
        return
      }

      // 2.调用手机发送验证码接口
      this.$store.dispatch('user/sendCode', phoneNumber).then((res) => {
        this.$confirm(`手机验证码为：${res}`, '提示', {
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '确定'
        })
      })
    },
    // 注册提交
    handleRegisterSubmit() {
      this.$refs.form.validate((valid) => {
        // 如果通过校验，调用接口
        if (valid) {
          const { confirmPwd, ...props } = this.form
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: props
          }).then((res) => {
            // console.log(res)
            // 将数据保存到vuex
            this.$store.commit('user/setUserInfo', res.data)
            this.$router.push('/')
          })
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
  .captcha {
    width: 233px;
  }
  .sendcapcha {
    background-color: rgb(245, 247, 250);
  }
  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
