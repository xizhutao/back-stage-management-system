<template>
  <div>
    <BreadCrumb />
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <!-- 头部标签 -->
        <el-tag class="tag_header" type="warning"
          >注意：只允许为第三级分类设置相关参数！</el-tag
        >
        <!-- 级联选择 -->
        <div class="block">
          <span class="demonstration">选择商品分类</span>
          <el-cascader
            size="large"
            v-model="value"
            :options="goodsCateList"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </div>
        <!-- tab栏 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <el-button size="mini" type="primary">添加参数</el-button>
            <Tables></Tables>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second"
            ><el-button size="mini" type="primary">添加属性</el-button>
            <Tables></Tables
          ></el-tab-pane>
        </el-tabs>
      </div>
      <!-- 卡片内容 -->
      <div class="text item"></div>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import { mapState } from 'vuex'
import Tables from '@/components/Tables/index.vue'
export default {
  name: 'CateParams',
  created () {
    this.getCateList()
  },
  data () {
    return {
      value: [],
      goodList: [],
      activeName: 'first' // 控制默认激活的tab栏
    }
  },
  methods: {
    // 获取商品分类
    getCateList () {
      // 分发一个获取商品分类的action
      this.$store.dispatch('goods/getGoodsCate')
    },
    // 级联选择器变化
    handleChange (nodeIdArr) {
      if (nodeIdArr.length === 3) {
        // 调度一个获取参数列表的action
        this.$store.dispatch('params/getParams', { id: nodeIdArr[2], type: { sel: 'many' } })
      } else {
        this.$message({
          type: 'warning',
          message: '只允许为第三级分类设置参数',
          duration: 1000
        })
      }
    },
    // 切换table栏
    handleClick (value) {
      if (value.index === '1') {
        // 调度一个获取参数列表的action
        this.$store.dispatch('params/getParams', { id: this.selectNodeId, type: { sel: 'only' } })
      } else {
        // 调度一个获取参数列表的action
        this.$store.dispatch('params/getParams', { id: this.selectNodeId, type: { sel: 'many' } })
      }
    }

  },
  computed: {
    ...mapState('goods', ['goodsCateList']),
    ...mapState('params', ['selectNodeId'])

  },
  watch: {},
  filters: {},
  components: { Tables, BreadCrumb }
}
</script>

<style scoped lang='less'>
.tag_header {
  width: 100%;
  height: 37px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}
.box-card {
  margin-top: 20px;
}
.demonstration {
  font-size: 18px;
  margin: 5px;
}
.el-button {
  margin-bottom: 10px;
}
</style>
