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
      <el-table-column :label="toggle.label" width="320">
        <template scope="scope">
          <el-tag type="danger">{{ scope.row.project }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" width="180">
        <template scope="scope">
          <div v-if="scope.row.describe !== ''">
            <el-popover trigger="hover" placement="top">
              <p>描述: {{ scope.row.describe }}</p>
              <div slot="reference" class="name-wrapper">
                <span>{{ scope.row.name }}</span>
              </div>
            </el-popover>
          </div>
          <div v-else>
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" v-if="toggle.status===0" width="120">
        <template scope="scope">
          <el-tag :type="scope.row.type">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template scope="scope">
          <el-button size="small" :disabled="scope.row.buttonDisabled" type="success" @click="handleAction(scope.$index, scope.row, 'start')">启动</el-button>
          <el-button size="small" :disabled="scope.row.buttonDisabled" type="danger" @click="handleAction(scope.$index, scope.row, 'stop')">停止</el-button>
          <el-button size="small" :disabled="scope.row.buttonDisabled" type="info" @click="handleAction(scope.$index, scope.row, 'restart')">重启</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="sizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageCount">
       </el-pagination>
    </div>
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
          type: '',
          buttonDisabled: false
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
        currentPage: 1,
        sizeChange: 10,
        pageCount: 0,
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
        this.getPageCount()
        this.handleCurrentChange(this.currentPage)
        this.loading = false
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
          switch (true) {
            case row.project.startsWith('unix:///'):
              row.buttonDisabled = true
              break
            case row.status === 'RUNNING':
              row.buttonDisabled = false
              row.type = 'success'
              break
            default:
              row.buttonDisabled = false
              row.type = 'warning'
          }
        })
        this.hostData = rest.data
      },
      handleAction (index, row, action) {
        this.loading = true
        this.$axios.patch(this.url + `${row.id}/action/`,
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
          this.common.actionMessage(rest, this)
          this.loadDataGet()
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
          this.form.name = this.formOldData.name
          this.form.describe = this.formOldData.describe
          this.dialogFormVisible = false
        }
      },
      confirmSet () {
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
      },
      handleSizeChange (val) {
        this.sizeChange = val
        this.handleCurrentChange(this.currentPage)
      },
      handleCurrentChange (val) {
        let url = this.url + `search/?q=filter&is_group=${this.toggle.status}&page=${val}&range=${this.sizeChange}`
        this.$axios.get(url)
        .then((rest) => {
          this.checkOk(rest)
          this.currentPage = val
        })
      },
      getPageCount () {
        this.$axios.get(this.url + `search/?q=count&is_group=${this.toggle.status}`)
        .then((rest) => {
          this.pageCount = rest.data.rest
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
