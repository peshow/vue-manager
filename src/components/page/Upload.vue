<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="目标主机">
        <el-select v-model="form.select" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.hostname"
            :label="item.alias_name"
            :value="item.ip">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          select: ''
        }
      }
    },
    computed: {
      options () {
        this.$axios.get('/api/remote/get?ID=1')
          .then(function (res) {
            console.log(res)
          })
      }
    }
  }
</script>
