<template>
  <div>
    <BreadCrumb />
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12">
            <div style="margin-top: 15px">
              <el-input
                placeholder="请输入内容"
                v-model="inputValue"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  @click="queryGoodsMessage(inputValue)"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <!-- 添加用户按钮 -->
            <el-button @click="routerGo" class="addUser" type="primary"
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </div>
      <!-- 卡片内容 -->
      <div class="text item">
        <!-- 表格 -->
        <el-table :data="goodList" border :stripe="true" style="width: 100%">
          <el-table-column prop="index" label="#" width="50">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" width="400" label="商品名称">
            <template slot-scope="scope">
              {{ scope.row.goods_name }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="商品价格(元)">
            <template slot-scope="scope">
              {{ scope.row.goods_price }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="商品重量">
            <template slot-scope="scope">
              {{ scope.row.goods_weight }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.add_time | formatTime }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 3, 5, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'

export default {
  async created () {
    // 分发一个获取商品列表的action
    await this.$store.dispatch('goods/getList', { pagenum: this.currentPage, pagesize: this.pageSize })
    console.log('tableData', this.tableData)
  },
  data () {
    return {
      inputValue: '', // 查詢用戶表单的值
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    // 查詢商品信息
    queryGoodsMessage (id) {
      // 分发一个根据id查询商品信息的action
      this.$store.dispatch('goods/getGoodsMessageById', id)
    },
    // 路由跳轉
    routerGo () {

    },
    // 编辑
    handleEdit () {

    },
    // 删除
    handleDelete () {

    },
    // 当前页改变
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      console.log('currentPage', currentPage)
      // 分发一个获取商品列表的action
      this.$store.dispatch('goods/getList', { pagenum: this.currentPage, pagesize: this.pageSize })
    },
    // 页面尺寸改变
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      console.log('pageSize', pageSize)
      // 分发一个获取商品列表的action
      this.$store.dispatch('goods/getList', { pagenum: this.currentPage, pagesize: this.pageSize })
    }
  },
  computed: {
    ...mapState('goods', ['total']),
    ...mapState('goods', ['goodList'])
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
.addUser {
  margin-top: 15px;
  margin-left: 10px;
}
.block {
  margin: 10px;
}
</style>
