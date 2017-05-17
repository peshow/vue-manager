<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class='el-icon-date'></i>主机管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          Supervisor管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage">
      <el-button type="primary" @click="scanAddSupervisor">Ansible扫描</el-button>
      <el-button type="primary" @click="switchTable">{{ toggle.button }}</el-button>
      <el-button type="primary" @click="editOpenVisible" :disabled="editButtonDisabled">编辑</el-button>
    </div>
        <el-dialog title="编辑描述信息" :visible.sync="dialogFormVisible" @close="cancelSet">
          <el-form :modle="form" label-width="80px">
            <el-form-item label="主机">
              <el-input v-model="form.host" :disabled="true" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item :label="toggle.label">
              <el-input v-model="form.project" :disabled="true" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.name" placeholder="请设置项目名称" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input v-model="form.describe" placeholder="请输入描述信息" auto-complete="off" style="width: 400px" @keyup.enter.native="confirmSet"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSet">取消</el-button>
            <el-button type="primary" @click="confirmSet">确定</el-button>
          </div>
        </el-dialog>

    <el-table :data="hostData" border style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="主机" width="150">
        <template scope="scope">
          <span style="margin-left: 10px">
            <el-tag>{{ scope.row.host }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="toggle.label" width="240">
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
      <el-table-column label="状态" v-if="toggle.status===0" width="120">
        <template scope="scope">
          <el-tag :type="scope.row.type">{{ scope.row.status }}</el-tag>
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
          id: '',
          host: '',
          project: '',
          name: '空',
          describe: '',
          status: '',
          type: ''
        }],
        form: {
          host: '',
          project: '',
          name: '',
          describe: ''
        },
        url: this.$store.state.api + '/api/supervisor/',
        multiSelection: [],
        dialogFormVisible: false,
        editButtonDisabled: true,
        formOldData: {
          name: '',
          describe: '',
          on_or_off: 'on'
        },
        loading: false,
        toggle: {
          button: '切换组管理',
          label: '进程名',
          status: 0
        }
      }
    },
    methods: {
      loadDataGet () {
        const url = this.url + `?is_group=${this.toggle.status}`
        this.$axios.get(url)
        .then((rest) => {
          this.checkOk(rest)
        })
      },
      switchTable () {
        if (this.toggle.status === 0) {
          this.toggle.button = '切换进程管理'
          this.toggle.label = '组名'
          this.toggle.status = 1
          this.loadDataGet()
        } else {
          this.toggle.button = '切换组管理'
          this.toggle.label = '进程名'
          this.toggle.status = 0
          this.loadDataGet()
        }
      },
      checkOk (rest) {
        rest.data.map(row => {
          if (row.status === 'RUNNING') {
            row.type = 'success'
          } else {
            row.type = 'warning'
          }
        })
        this.hostData = rest.data
      },
      handleAction (index, row, action) {
        this.loading = true
        this.$axios.put(this.url + `{row.id}/action/`,
          JSON.stringify({
            action: action
          })
        )
        .then((rest) => {
          this.common.actionMessage(rest, this)
          this.loadDataGet()
        })
      },
      scanAddSupervisor () {
        this.loading = true
        this.$axios.post(this.url, JSON.stringify(
          {'is_group': this.toggle.status})
        )
        .then((rest) => {
          this.checkOk(rest)
          this.loading = false
        })
      },
      editOpenVisible () {
        this.form = this.multiSelection[0]
        this.dialogFormVisible = true
        this.formOldData = {
          name: this.form.name,
          describe: this.form.describe,
          on_or_off: 'off'
        }
      },
      cancelSet () {
        if (this.formOldData.on_or_off === 'off') {
          console.log('cancelSet')
          this.form.name = this.formOldData.name
          this.form.describe = this.formOldData.describe
          this.dialogFormVisible = false
        }
      },
      confirmSet () {
        console.log('confirmSet')
        this.dialogFormVisible = false
        this.formOldData.on_or_off = 'on'
        const select = this.multiSelection[0]
        this.$axios.put(this.url + select.id,
          JSON.stringify({
            name: this.form.name,
            describe: this.form.describe
          }))
        .then((rest) => {
          this.common.actionMessage(rest, this)
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
