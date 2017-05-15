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
      <el-button type="primary" @click="editOpenVisible" :disabled="editButtonDisabled">编辑</el-button>
    </div>
        <el-dialog title="编辑描述信息" :visible.sync="dialogFormVisible" @close="cancelSet">
          <el-form :modle="form" label-width="80px">
            <el-form-item label="主机">
              <el-input v-model="form.host" :disabled="true" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="进程名">
              <el-input v-model="form.project" :disabled="true" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.name" placeholder="请设置项目名称" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input v-model="form.describe" placeholder="请输入描述信息" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSet">取消</el-button>
            <el-button type="primary" @click="confirmSet">确定</el-button>
          </div>
        </el-dialog>

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
          <el-tag type="danger">{{ scope.row.project }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="180">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>描述: {{ scope.row.describe }}</p>
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.name }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template scope="scope">
          <el-tag type="success">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" type="success" @click="handleAction(scope.$index, scope.row, 'start')">启动</el-button>
          <el-button size="small" type="danger" @click="handleAction(scope.$index, scope.row, 'stop')">停止</el-button>
          <el-button size="small" type="info" @click="handleAction(scope.$index, scope.row, 'restart')">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    beforeMount () {
      this.loadDataGet()
    },
    data () {
      return {
        hostData: [{
          host: '172.16.20.119',
          project: 'wechat',
          name: '空',
          describe: '专门用于抓取微信内容',
          status: 'Running'
        }],
        form: {
          host: '',
          project: '',
          name: '',
          describe: ''
        },
        multiSelection: [],
        dialogFormVisible: false,
        editButtonDisabled: true
      }
    },
    methods: {
      loadDataGet () {
        const self = this
        const url = self.$store.state.api + '/api/supervisor/'
        self.$axios.get(url)
        .then(function (rest) {
          self.hostData = rest.data
        })
      },
      handleAction (index, row, action) {
        const self = this
        self.$axios.post(`${self.$store.state.api}/api/supervisor/control/`,
          JSON.stringify({
            action: action,
            host: row.host,
            project: row.project
          })
        )
        .then(function (rest) {
          if (rest.data.rest === 0) {
            self.$message({
              message: '操作执行成功',
              showClose: true
            })
            self.loadDataGet()
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
        self.$axios.put(self.$store.state.api + '/api/supervisor/', JSON.stringify({'scan': 0}))
        .then(function (rest) {
          self.hostData = rest.data
        })
      },
      editOpenVisible () {
        this.form = this.multiSelection[0]
        this.dialogFormVisible = true
      },
      cancelSet () {
        this.dialogFormVisible = false
      },
      confirmSet () {
        this.dialogFormVisible = false
        const self = this
        const url = self.$store.state.api + '/api/supervisor/'
        self.$axios.post(url,
          JSON.stringify(self.form))
        .then(function (rest) {
          self.hostData = rest.data
        })
      },
      handleSelectionChange (val) {
        this.multiSelection = val
        if (this.multiSelection.length === 1) {
          this.editButtonDisabled = false
        } else {
          this.editButtonDisabled = true
        }
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
