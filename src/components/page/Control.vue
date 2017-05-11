<template>
  <el-table :data="hostData" border style="width: 100%">
  <el-table-column label="主机" width="180">
    <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.ip }}</span>
    </template>
  </el-table-column>
  <el-table-column label="进程名" width="180">
    <template scope="scope">
      <el-popover trigger="hover" placement="top">
        <p>描述: {{ scope.row.messge }}</p>
        
  
</template>
