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
        <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    </div>
        <el-dialog title="新增远程主机" :visible.sync="dialogFormVisible">
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
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible=false">确定</el-button>
          </div>
        </el-dialog>

    <el-table :data="tableData" ref="multipleTable" border style="width: 100%" @selection-change="multiSelection">
      <el-table-column type="selection" width=55>
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
          name: '新闻检测',
          ip: '192.168.2.22',
          host: 'mh-test444',
          user: 'root',
          port: '22',
          default_path: '/tmp'
        }],
        multiSelection: []
      }
    },
    computed: {
      options () {
        this.$axios.get('/api/remote/get?ID=1')
          .then(function (res) {
            console.log(res)
          })
      }
    },
    methods: {
      toggleSelection (option) {
        const self = this
        if (option) {
          self.multiSelection.map(row => {
            self.$refs.multipleTable.toggleRowSelection()
          })
        } else {
          self.$refs.multipleTable.clearSelection()
        }
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
