<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'before',
  data: function () {
    return {
      orderCount: true
    }
  },
  methods: {
  },
  mounted () {
    if (this.orderCount) {
      this.$confirm('您有一个正在进行的订单，是否立即查看', '订单提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.$router.push('/order')
        this.$message({
          type: 'success',
          message: '进入订单页面!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消并返还主页面'
        })
      })
    } else {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
