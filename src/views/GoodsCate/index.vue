<template>
  <div>
    <BreadCrumb />
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <el-row>
        <el-col :span="4">
          <!-- 添加用户按钮 -->
          <el-button @click="routerGo" class="addUser" type="primary"
            >添加分类</el-button
          ></el-col
        >
      </el-row>
      <!-- 卡片内容 -->
      <div class="text item">
        <!--表格2  -->
        <tree-table
          :data="goodsCateList"
          :selection-type="false"
          :columns="columns"
          :expand-type="false"
          show-index
          index-text="#"
          border
          show-row-hover
        >
          <!-- 是否有效 -->
          <template slot="isOk" slot-scope="scope">
            <i
              v-if="scope.row.cat_deleted === false"
              class="el-icon-success"
            ></i>
            <i v-else class="el-icon-error"></i>
          </template>
          <!-- 排序 -->
          <template slot="sort" slot-scope="scope">
            <el-tag
              :type="
                scope.row.cat_level === 0
                  ? ''
                  : scope.row.cat_level === 1
                  ? 'success'
                  : 'warning'
              "
              >{{
                scope.row.cat_level === 0
                  ? "一级"
                  : scope.row.cat_level === 1
                  ? "二级"
                  : "三级"
              }}</el-tag
            >
          </template>
          <!-- 操作 -->
          <template slot="resolve">
            <el-button size="small" type="primary">
              <i class="el-icon-edit"></i> 编辑</el-button
            >
            <el-button size="small" type="danger">
              <i class="el-icon-delete"></i> 删除</el-button
            >
          </template>
        </tree-table>

        <!-- <el-table
          :data="goodsCateList"
          style="width: 100%; margin-bottom: 20px"
          row-key="cat_id"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="index" type="" label="#" width="180">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="cat_name" label="分类名称" width="180">
          </el-table-column>

          <el-table-column prop="name" label="是否有效" width="180">
          </el-table-column>
          <el-table-column prop="address" label="排序"> </el-table-column>
        </el-table> -->
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[1, 2, 3, 5, 10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total2"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapState } from 'vuex'
export default {
  name: 'GoodsCate',
  created () { },
  data () {
    return {
      columns: [
        { label: '分类名称', prop: 'cat_name' },
        { label: '是否有效', type: 'template', template: 'isOk' },
        { label: '排序', type: 'template', template: 'sort' },
        { label: '操作', type: 'template', template: 'resolve' }
      ],
      pagesize: 10,
      pagenum: 1
    }
  },
  methods: {
    handleSizeChange (pagesize) {
      this.pagesize = pagesize
      // 重新分发一个获取分类列表的action
      this.$store.dispatch('goods/getGoodsCateByPageNum', { pagenum: this.pagenum, pagesize: this.pagesize })
    },
    // 当前页变化
    handleCurrentChange (pagenum) {
      this.pagenum = pagenum
      // 重新分发一个获取分类列表的action
      this.$store.dispatch('goods/getGoodsCateByPageNum', { pagenum: this.pagenum, pagesize: this.pagesize })
    },
    // 添加按钮
    routerGo () {

    }
  },
  computed: {

    ...mapState('goods', ['goodsCateList', 'total2'])
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
  margin-bottom: 15px;
}
.TipContent {
  font-size: 20px;
  .el-icon-warning-outline {
    font-size: 24px;
    color: #e6a23c;
  }
}
.block {
  margin: 10px;
}
/deep/ .icon-success {
  display: block;
  font-size: 14px !important;
}
i {
  color: green;
}
.el-icon-edit {
  color: white;
}
.el-icon-delete {
  color: white;
}
</style>
