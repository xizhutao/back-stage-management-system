<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button :loading="loading" type="primary" @click="login"
            >登录</el-button
          >
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '@/utils/token'
export default {
  name: 'Login',
  created () { },
  data () {
    return {
      loginForm: {
        // 字段名都是和接口文档保持一致
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {

    reset () {
      // 1. 获取表单组件实现对象
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs.loginFormRef.resetFields()
    },
    async login () {
      // 二次校验 手动校验
      await this.$refs.loginFormRef.validate(async (isOk) => {
        try {
          if (isOk) {
            this.loading = true
            const res = await login(this.loginForm)
            const { token } = res.data?.data
            // todo 把token存到vuex中，并且持久化 localStorage
            // 1、把token存到本地存储
            setToken(token)
            // 2、把token存到vuex
            this.$store.commit('login/reserveToken', token)
            this.$router.push('/welcome')
          }
        } catch (err) {
          this.$message.error('登录表单校验失败')
        } finally {
          this.loading = false
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}

}
</script>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
