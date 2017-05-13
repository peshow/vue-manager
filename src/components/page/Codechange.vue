<template>
  <div class="code">
    <el-form v-loading="loading" element-loading-text="拼命加载中" ref="form" :model="form" label-width="150px">
      <el-form-item label="IP">
        <el-select v-model="form.ip" placeholder="请选择目标主机">
          <el-option label="172.16.20.117" value="10.6.19.38"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="wxCode">
        <el-input type="textarea" v-model="form.wxCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交更新</el-button>
        <el-button @click="onClean">清空内容</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import qs from 'qs'

  export default {
    data () {
      return {
        form: {
          ip: '172.16.20.117',
          wxCode: ''
        }
      }
    },
    computed: {
      loading () {
        return this.$store.state.codeChangeLoading
      }
    },
    methods: {
      onSubmit () {
        let self = this
        self.$store.commit({
          type: 'setCodeLoad',
          isOn: true
        })
        self.$axios.post('http://172.16.20.215:9999/api/manager/codeChange/', qs.stringify({
          ip: self.form.ip,
          wxCode: self.form.wxCode
        }))
        .then(function (response) {
          let rest = response.data.rest
          if (rest === '0') {
            self.$message({
              message: 'WXCODE已经修改成功',
              type: 'success',
              showClose: true
            })
          }
          self.$store.commit({
            type: 'setCodeLoad',
            isOn: false
          })
          self.form.wxCode = ''
        })
      },
      onClean () {
        this.form.wxCode = ''
      }
    }
  }
</script>

<style scoped>
  .code {
    padding: 20px;
    font-size: 14px;
  }
</style>
