<template>
  <div>
    <BreadCrumb />
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片内容 -->
      <div class="text item">
        <!-- 表格 -->
        <el-table :data="rightList" border :stripe="true" style="width: 100%">
          <el-table-column prop="index" label="#" width="100">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="index" label="权限名称">
            <template slot-scope="scope">
              {{ scope.row.authName }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="路径">
            <template slot-scope="scope">
              {{ scope.row.path }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="等级">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.level === '0'
                    ? 'success'
                    : scope.row.level === '1'
                    ? 'info'
                    : 'danger'
                "
                disable-transitions
                >{{
                  scope.row.level === "0"
                    ? "等级一"
                    : scope.row.level === "1"
                    ? "等级二"
                    : "等级三"
                }}</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapState } from 'vuex'
export default {
  name: 'AuthorizationList',
  created () {
    this.getRights()
  },
  data () {
    return {}
  },
  methods: {
    // 获取权限列表
    getRights () {
      this.$store.dispatch('rights/getRightList', 'list')
    }
  },
  computed: {
    ...mapState('rights', ['rightList'])
  },
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.box-card {
  margin-top: 20px;
}
</style>
