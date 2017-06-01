<template>
  <div>
    <div class="manage">
      <el-button type="primary" @click="scanAddSupervisor">Ansible扫描</el-button>
      <el-button type="primary" @click="">添加</el-button>
    </div>
    <el-table :data="hostData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="主机" width="180">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="进程名" width="180">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.message }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.process }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template scope="scope">
          <el-tag type="success">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleStart(scope.$index, scope.row)">启动</el-button>
          <el-button size="small" type="danger" @click="handleStart(scope.$index, scope.row)">停止</el-button>
          <el-button size="small" type="info" @click="handleStart(scope.$index, scope.row)">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        hostData: [{
          ip: '172.16.20.119',
          process: 'wechat',
          message: '专门用于抓取微信内容',
          status: 'Running'
        }],
        HandleSelectionChange: []
      }
    },
    computed: {
      getTable () {
        const self = this
        self.$axios.get('http://172.16.20.215:9999/api/supervisor/get/')
        .then((rest) => {
          self.hostData = rest
        })
      }
    },
    methods: {
      handleStart (index, row) {
        console.log(index, row)
      },
      scanAddSupervisor () {
        const self = this
        self.$axios.get('http://172.16.20.215:9999/api/scanSupervisor/')
        .then(function (rest) {
          console.log(rest)
        })
      }
    }
  }
</script>
<style scoped>
  .manage {
    left: 20px;
  }
</style>
