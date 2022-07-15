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
                  @click="queryOrderMessage(inputValue)"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 卡片内容 -->
      <div class="text item">
        <!-- 表格 -->
        <el-table :data="orderList" border :stripe="true" style="width: 100%">
          <el-table-column prop="index" label="#" width="100">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="订单编号">
            <template slot-scope="scope">
              {{ scope.row.order_number }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="订单价格">
            <template slot-scope="scope">
              {{ scope.row.order_price }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="是否付款">
            <template slot-scope="scope">
              <el-tag :color="scope.row.order_pay > 0 ? 'green' : 'red'">{{
                scope.row.order_pay > 0 ? "已支付" : "未支付"
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="是否发货">
            <template slot-scope="scope">
              {{ scope.row.is_send }}
            </template>
          </el-table-column>
          <el-table-column prop="state" label="下单时间">
            <template slot-scope="scope">
              {{ scope.row.update_time | formatTime }}
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
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 编辑按钮对话框 -->
      <el-dialog width="960" title="编辑用户" :visible.sync="dialogVisible2">
        <!-- 表单 -->
        编辑
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="formSubmit2">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'

export default {
  name: 'OrderReceved',
  created () {
    this.getOrders()
  },
  data () {
    return {
      dialogVisible2: false,
      tableData: [],
      inputValue: ''
    }
  },
  methods: {
    // 获取订单列表
    getOrders () {
      this.$store.dispatch('order/getOrderList')
    },
    // input查询框
    queryOrderMessage () {

    },
    // 编辑按钮
    handleEdit () {
      this.dialogVisible2 = true
    },
    // 编辑提交
    formSubmit2 () {

    }
  },
  computed: {
    ...mapState('order', ['orderList'])
  },
  watch: {},
  filters: {},
  components: { BreadCrumb }
}
</script>

<style scoped lang='less'>
.el-tag--light {
  color: white;
}
.box-card {
  margin-top: 20px;
}
.addUser {
  margin-top: 15px;
  margin-left: 10px;
}
.TipContent {
  font-size: 20px;
  .el-icon-warning-outline {
    font-size: 24px;
    color: #e6a23c;
  }
}
</style>
