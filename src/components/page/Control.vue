<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class='el-icon-date'></i>主机管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          进程控制
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage">
      <el-button type="primary" @click="scanAddSupervisor">Ansible扫描</el-button>
      <el-button type="primary" @click="">编辑</el-button>
    </div>
    <el-table :data="hostData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="主机" width="150">
        <template scope="scope">
          <span style="margin-left: 10px">
            <el-tag>{{ scope.row.host }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="进程名" width="240">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.message }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag type="danger">{{ scope.row.project }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="180">
        <template scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template scope="scope">
          <el-tag type="success">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleStart(scope.$index, scope.row, 'start')">启动</el-button>
          <el-button size="small" type="danger" @click="handleStart(scope.$index, scope.row, 'stop')">停止</el-button>
          <el-button size="small" type="info" @click="handleStart(scope.$index, scope.row, 'restart')">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    beforeMount () {
      this.scanAddSupervisor()
    },
    data () {
      return {
        hostData: [{
          host: '172.16.20.119',
          project: 'wechat',
          name: '空',
          message: '专门用于抓取微信内容',
          status: 'Running'
        }],
        handleSelectionChange: []
      }
    },
    computed: {
      getTable () {
        const self = this
        self.$axios.get('http://192.168.230.131:9999/api/supervisor/')
        .then((rest) => {
          self.hostData = rest
        })
      }
    },
    methods: {
      handleStart (index, row, action) {
        const self = this
        self.$axios.get(`http://192.168.230.131:9999/api/supervisor/control?action=${action}&ip=${row.ip}&project=${row.project}`)
        .then(function (rest) {
          if (rest.data.rest === 0) {
            self.$message({
              message: '操作执行成功',
              showClose: true
            })
          } else {
            self.$message({
              message: '操作执行失败',
              showClose: true
            })
          }
        })
      },
      scanAddSupervisor () {
        const self = this
        console.log(self.$store.state.api + '/api/supervisor')
        self.$axios.post(self.$store.state.api + '/api/supervisor/', JSON.stringify({'scan': 0}))
        .then(function (rest) {
          self.hostData = rest.data
        })
      }
    }
  }
</script>
<style scoped>
  .manage {
    left: 20px;
  }
  .breadcrumb {
    margin-bottom: 20px;
  }
</style>
