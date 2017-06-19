<template>
  <div class="login">
    <div class="login-wrapper">
      <el-form ref="form" :rules="rules" :model="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="onSubmit('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style='width: 230px' @click="onSubmit('form')">登录</el-button>
        </el-form-item>
          <p class="error-message" v-if="exists">账户密码错误</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    beforeMount () {
      this.checkLogin()
    },
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
        exists: false,
        url: this.$store.state.api + '/api/login/'
      }
    },
    methods: {
      onSubmit (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.url,
              JSON.stringify({
                username: this.form.username,
                password: this.form.password
              })
            )
            .then((rest) => {
              let result = rest.data.login
              if (result === 'success') {
                this.$router.push('/readme')
                localStorage.setItem('md_username', this.form.username)
              } else if (result === 'faile') {
                this.exists = true
              }
            })
          } else {
            console.log('error submit!')
            return false
          }
        })
      },
      checkLogin () {
        this.$axios.get(this.url)
        .then((rest) => {
          let data = rest.data.logined
          console.log(data)
          if (data === 1) {
            this.$router.push('/readme')
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
    background-image: url('../../../static/login_background.jpg');
  }
  .login .login-wrapper {
    position: relative;
    top: 30%;
    width: 300px;
    height: 160px;
    margin: 0 auto;
    padding: 40px;
    background-color: #f0f0f0;
    background-image: url('../../../static/login_wrapper.png');
  }
  .login-wrapper .error-message {
    color: red;
    text-align: center;
  }
</style>
