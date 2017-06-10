<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class='el-icon-date'></i>主机管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          上传更新
        </el-breadcrumb-item>
      </el-breadcrumb>
      <br />
        <el-button type="primary" @click="dialogFormVisible=true">添加</el-button>
    </div>
        <el-dialog title="新增上传" :visible.sync="dialogFormVisible">
          <el-form :modle="form" label-width="70px">
            <el-form-item label="任务名称">
              <el-input v-model="form.name" placeholder="请设置任务名称" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="目标主机">
              <el-select v-model="form.ip" placeholder="请选择操作的目标主机" style="width: 400px">
                <el-option
                  v-for="item in options"
                  :key="item.hostname"
                  :label="item.alias_name"
                  :value="item.ip">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="目标目录">
              <el-input v-model="form.path" placeholder="请输入上传的目标目录" auto-complete="off" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="任务目的">
              <el-checkbox-group v-model="form.purpose" size="small">
                <el-checkbox label="上传" name="purpose"></el-checkbox>
              </el-checkbox-group>
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
      <el-table-column label="任务名称" width="100">
        <template scope="scope">
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="目标主机" width="150">
        <template scope="scope">{{ scope.row.ip }}</template>
      </el-table-column>
      <el-table-column label="目标目录" width="300">
        <template scope="scope">{{ scope.row.path }}</template>
      </el-table-column>
      <el-table-column label="操作" width=80>
        <template scope="scope">
          <el-button size="small">{{ scope.row.purpose }}</el-button>
        </template>
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
          path: '',
          purpose: ['上传']
        },
        tableData: [{
          name: 'yes',
          ip: '192.168.1.4',
          path: '/data/file',
          purpose: '上传'
        }],
        multiSelection: []
      }
    },
    computed: {
      options () {
        this.$axios.get(this.$store.api + '/api/remote/get?ID=1')
          .then(function (res) {
            console.log(res)
          })
      }
    },
    methods: {
      toggleSelection (option) {
        const self = this
        if (option) {
          self.tableData.map(row => {
            self.$refs.multipleTable.toggleRowSelection(row)
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
