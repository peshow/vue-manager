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
    computed: {
      getUsername () {
        return this.$store.username
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'logout') {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    background-color: black;
    width: 100%;
    height: 70px;
    font-size: 22px;
    z-index: 999;
    line-height: 70px;
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
