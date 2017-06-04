<template>
  <div class="sidebar">
    <el-menu :default-active="onActive" class="el-menu-vertical-demo" theme="dark" router>
      <el-menu-item index="readme">
        <i class="el-icon-information"></i> ReadMe
      </el-menu-item>
      <el-submenu index="manage">
        <template slot="title">
          <i class="el-icon-setting"></i> 主机管理
        </template>
        <el-menu-item index="control">进程控制</el-menu-item>
        <el-menu-item index="codechange">代码更新</el-menu-item>
        <el-menu-item index="upload">上传更新</el-menu-item>
      </el-submenu>
      <el-submenu index="manage1">
        <template slot="title">
          <i class="el-icon-document"></i> 系统管理
        </template>
        <el-menu-item index="admin">添加主机</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    computed: {
      onActive () {
        return this.$route.path.replace('/', '')
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
