<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class='el-icon-date'></i>主机管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          任务计划
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage">
      <el-button type="primary" @click="scanAddCrontab">Ansible扫描</el-button>
      <el-button type="primary" @click="editOpenVisible" :disabled="editButtonDisabled">编辑</el-button>
    </div>
        <el-dialog title="编辑描述信息" :visible.sync="dialogFormVisible" @click="cancelSet">
          <el-form :modle="form" label-width="80px">
            <el-form-item label="主机">
              <el-input v-model="form.cron_host" :disabled="true" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="操作身份">
              <el-input v-model="form.cron_user" :disabled="true" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="任务计划">
              <el-input v-model="form.crontab" :disabled="true" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="form.name" placeholder="请设置项目名称" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="描述信息">
              <el-input v-model="form.describe" placeholder="请输入描述信息" auto-complete="off" style="width: 400px" @keyup.enter.native="confirmSet"></el-input>
            </el-form-item>
          </el-form>
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
            <el-tag>{{ scope.row.cron_host }}</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称及描述" width="180">
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
      <el-table-column label="操作身份" width="100">
        <template scope="scope">
          <el-tag type="success">{{ scope.row.cron_user }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="任务计划" width="450">
        <template scope="scope">
          {{ scope.row.crontab }}
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
          cron_host: '',
          cron_user: '',
          crontab: '',
          name: '空',
          describe: ''
        }],
        form: {
          id: '',
          cron_host: '',
          cron_user: '',
          crontab: '',
          name: '空',
          describe: ''
        },
        url: this.$store.state.api + '/api/crontab/',
        multiSelection: [],
        dialogFormVisible: false,
        editButtonDisabled: true,
        formOldData: {},
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
        this.$axios.get(this.url)
        .then((rest) => {
          this.checkOk(rest)
          this.loading = false
        })
      },
      checkOk (rest) {
        rest.data.map(row => {
          if (row.crontab.startsWith('#')) {
            row.on = false
            row.off = true
          } else {
            row.on = true
            row.off = false
          }
        })
        this.hostData = rest.data
      },
      scanAddCrontab () {
        this.loading = true
        this.$axios.post(this.url)
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
