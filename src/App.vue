<template>
  <div>
    <!-- 一级路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.onbeforeunload = function (e) {
      const storage = window.localStorage
      storage.clear()
    }
  }
}
</script>

<style scoped lang='less'>
</style>
