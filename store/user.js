// 每个仓库都必须暴露出 state,mutations,actions
export const state = () => {
  return {
    userInfo: {
      // 用户验证的token
      token: '',
      // 用户信息
      user: {}
    }
  }
}

// 同步的修改仓库的数据
export const mutations = {
  // 设置用户信息
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 设置用户数据为空
  clearUserInfo(state) {
    state.userInfo = {
      token: '',
      user: {}

    }
  }
}

// 异步修改仓库数据
export const actions = {
  // 处理登录的方法，actions的第一个参数store对象，第二个参数是传入的参数
  login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      data,
      method: 'POST'
    }).then((res) => {
      //   console.log(res)
      //   console.log(store)
      // 保存到vuex
      store.commit('setUserInfo', res.data)
    })
  },
  // 发送手机验证码
  sendCode(store, phoneNumber) {
    return this.$axios({
      url: '/captchas',
      method: 'POST',
      data: {
        tel: phoneNumber
      }
    }).then((res) => {
      // console.log(res)
      const { code } = res.data
      return code
    })
  },
  

}
