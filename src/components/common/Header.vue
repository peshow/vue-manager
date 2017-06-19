<template>
  <div class="header"> 
    <div class="logo">管理平台</div>
    <div class="imgInfo">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <img class="image" src="../../../static/dog.png">
          <span class="user">{{ getUsername }}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
        url: this.$store.state.api + '/api/login/'
      }
    },
    computed: {
      getUsername () {
        return localStorage.getItem('md_username')
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          this.$axios.delete(this.url)
          .then((rest) => {
            const data = rest.data.logout
            if (data === 1) {
              localStorage.removeItem('md_username')
              this.$router.push('/login')
            } else {
              console.log('gaction is wrong')
            }
          })
        }
      },
      checkLogin () {
        this.$axios.get(this.url)
        .then(rest => {
          let data = rest.data.logined
          if (data === 0) {
            this.$router.push('/login')
          }
        })
      }
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    background-color: black;
    background-image: url('../../../static/head_background.jpg');
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    z-index: 999;
    box-sizing: border-box;
  }
  .header .logo {
    float: left;
    color: white;
    width: 250px;
    text-align: center;
  }
  .header .imgInfo {
    position: absolute;
    right: 20px;
    z-index: 1;
    opacity: 0.8;
  }
  .imgInfo .image {
    position: relative;
    border-radius: 50%;
    border: none;
    top: 15px;
    right: 0px;
    height: 40px;
    width: 40px;
  }
  .imgInfo .user {
    color: white;
    font-size: 20px;
    font-family: Microsoft YaHei;
  }
</style>
