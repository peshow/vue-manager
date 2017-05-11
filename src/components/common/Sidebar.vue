<template>
  <div class="sidebar">
    <el-menu :default-active="onActive" class="el-menu-vertical-demo" theme="dark" router>
      <el-menu-item index="readme">
        <i class="el-icon-information"></i> ReadMe
      </el-menu-item>
      <el-submenu index="manage">
        <template slot="title">
          <i class="el-icon-setting"></i> 管理
        </template>
        <el-menu-item index="control">进程控制</el-menu-item>
      </el-submenu>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      onActive () {
        this.$router.path.replace('/', '')
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    position: absolute;
    display: block;
    top: 70px; 
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: #2E363F; 
  }
</style>
