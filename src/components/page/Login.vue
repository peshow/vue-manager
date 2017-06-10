<template>
  <div class="login">
    <div class="login-wrapper">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="onSubmit('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">登录</el-button>
        </el-form-item>
          <p class="error-message" v-if="exists">账户密码错误</p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
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
      },
      exists: false
    }
  },
  methods: {
    onSubmit (formName) {
      const self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$axios.post(self.$store.state.api + '/api/login/',
            JSON.stringify({
              username: self.form.username,
              password: self.form.password
            })
          )
          .then(function (rest) {
            let result = rest.data.login
            if (result === 'success') {
              self.$store.username = self.form.username
              self.$router.push('/readme')
              localStorage.setItem('md_username', self.form.username)
            } else if (result === 'faile') {
              self.exists = true
            }
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
  }
  .login .login-wrapper {
    position: relative;
    top: 30%;
    width: 300px;
    height: 160px;
    margin: 0 auto;
    padding: 40px;
    background-color: #fff;
  }
  .login-wrapper .error-message {
    color: red;
    text-align: center;
  }
</style>
