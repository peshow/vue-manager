export default {
  actionMessage (rest, self) {
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
  }
}

