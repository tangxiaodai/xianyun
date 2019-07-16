// this.$message
import { Message } from 'element-ui'

// 当前nuxt的对象
export default ({ $axios }) => {
  $axios.onError((err) => {
    // console.log(err.response)
    const { message, statusCode } = err.response.data
    if (statusCode === 400) {
      // 错误报告
      Message.warning(message)
    }
  })
}
