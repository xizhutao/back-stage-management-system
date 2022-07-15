<template>
  <el-container class="container">
    <el-header class="containier_header">
      <div class="imgWrapper">Back-Stage Management System</div>
      <el-button class="default_btn" @click="logout">退出</el-button></el-header
    >
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          default-active="1"
          active-text-color="red"
        >
          <el-submenu index="1">
            <template #title>
              <i class="el-icon-user-solid"></i>用户管理</template
            >
            <el-menu-item index="/userlist"
              ><i class="el-icon-menu"></i>用户列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template #title
              ><i class="el-icon-s-opportunity"></i>权限管理</template
            >
            <el-menu-item index="/rolelist"
              ><i class="el-icon-menu"></i>角色列表</el-menu-item
            >
            <el-menu-item index="/authorizationlist"
              ><i class="el-icon-menu"></i>权限列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="3">
            <template #title><i class="el-icon-s-goods"></i>商品管理</template>
            <el-menu-item index="/goodslist"
              ><i class="el-icon-menu"></i>商品列表</el-menu-item
            >
            <el-menu-item index="/cateParams"
              ><i class="el-icon-menu"></i>分类参数</el-menu-item
            >
            <el-menu-item index="/goodscate"
              ><i class="el-icon-menu"></i>商品分类</el-menu-item
            >
          </el-submenu>
          <el-submenu index="4">
            <template #title><i class="el-icon-s-order"></i>订单管理</template>
            <el-menu-item index="/order"
              ><i class="el-icon-menu"></i>订单列表</el-menu-item
            >
          </el-submenu>
          <el-submenu index="5">
            <template #title
              ><i class="el-icon-s-platform"></i>数据统计</template
            >
            <el-menu-item index="5-1"
              ><i class="el-icon-menu"></i>数据报表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 二级路由放置点 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 一级 el-menu -> el-menu-item
// 二级 el-menu -> el-submenu -> el-menu
// 组件名就是类名
export default {
  name: 'Home',
  created () { },
  data () {
    return {}
  },
  methods: {
    // 退出
    async logout () {
      // 清除token
      await this.$store.commit('login/updateToken')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #06263b;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
    height: calc(100vh - 60px);
    overflow: auto;
  }
}
.el-menu {
  border-right: none;
}
.containier_header {
  display: flex;
  justify-content: end;
  align-items: center;
}
.imgWrapper {
  color: white;
  margin-right: 1000px;
  font-size: 18px;
}
</style>
