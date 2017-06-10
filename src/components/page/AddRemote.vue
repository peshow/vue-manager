<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class='el-icon-date'></i>系统管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          添加主机
        </el-breadcrumb-item>
      </el-breadcrumb>
      <br />
        <el-button type="primary" @click="addRemote">添加</el-button>
        <el-button type="primary" @click="editRemote(multiSelection)">编辑</el-button>
        <el-button type="primary" @click="delRemote">删除</el-button>
    </div>
        <el-dialog title="新增远程主机" :visible.sync="dialogFormVisible" @close="cancelSet">
          <el-form :modle="form" label-width="80px">
            <el-form-item label="别名">
              <el-input v-model="form.name" placeholder="请设置远程主机别名" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="IP地址">
              <el-input v-model="form.ip" placeholder="请设置远程主机IP" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="主机名">
              <el-input v-model="form.host" placeholder="请设置远程主机名" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.user" placeholder="请设置远程用户名" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="端口号">
              <el-input v-model="form.port" placeholder="请设置端口号" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="默认目录">
              <el-input v-model="form.default_path" placeholder="请设置默认目录" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSet">取消</el-button>
            <el-button type="primary" @click="confirmSet">确定</el-button>
          </div>
        </el-dialog>

    <el-table :data="tableData" ref="multipleTable" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50">
      </el-table-column>
      <el-table-column label="ID" width="60">
        <template scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="名称" width="100">
        <template scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="IP" width="150">
        <template scope="scope">{{ scope.row.ip }}</template>
      </el-table-column>
      <el-table-column label="主机名" width="150">
        <template scope="scope">{{ scope.row.host }}</template>
      </el-table-column>
      <el-table-column label="用户名" width="100">
        <template scope="scope">{{ scope.row.user }}</template>
      </el-table-column>
      <el-table-column label="端口号" width="100">
        <template scope="scope">{{ scope.row.port }}</template>
      </el-table-column>
      <el-table-column label="默认目录" width="150">
        <template scope="scope">{{ scope.row.default_path }}</template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection(true)">全选</el-button>
      <el-button @click="toggleSelection(false)">取消选择</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          ip: '',
          host: '',
          user: 'root',
          port: '22',
          default_path: '/tmp'
        },
        tableData: [{
          id: '1',
          name: '新闻检测',
          ip: '192.168.2.22',
          host: 'mh-test444',
          user: 'root',
          port: '22',
          default_path: '/tmp'
        }],
        multiSelection: [],
        add_or_edit: 0       /* 0:add, 1:edit */
      }
    },
    computed: {
      options () {
        this.$axios.get('/api/remote/get?ID=1')
          .then(function (res) {
            console.log(res)
          }
        )
      }
    },
    methods: {
      cancelSet () {
        this.form = {
          name: '',
          ip: '',
          host: '',
          user: 'root',
          port: '22',
          default_path: '/tmp'
        }
        this.dialogFormVisible = false
      },
      confirmSet () {
        const self = this
        self.dialogFormVisible = false
        self.$axios.post(self.$store.api + '/api/admin/post',
          JSON.stringify(self.form.status = self.add_or_edit))
        .then(function (res) {
          if (res.data.rest === 0) {
            self.$message({
              showClose: true,
              message: res.data.message
            })
          }
        })
      },
      handleSelectionChange (val) {
        this.multiSelection = val
      },
      toggleSelection (option) {
        const self = this
        if (option) {
          self.tableData.map(row => {
            self.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          self.$refs.multipleTable.clearSelection()
        }
      },
      addRemote () {
        this.add_or_edit = 0
        this.dialogFormVisible = true
      },
      editRemote (tableElement) {
        this.add_or_edit = 1
        if (tableElement.length === 1) {
          this.form = tableElement[0]
          this.dialogFormVisible = true
        }
      },
      delRemote () {
        console.log(123)
      }
    }
  }
</script>

<style scped>
  .breadcrumb {
    margin-bottom: 20px;
  }
  .dialog {
    display: block;
  }
</style>
