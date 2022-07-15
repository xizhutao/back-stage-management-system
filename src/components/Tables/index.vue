<template>
  <div>
    <el-table :data="paramsList" border style="width: 100%">
      <!-- 展开面板的内容 -->
      <el-table-column width="100" type="expand">
        <template>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </el-form>
        </template>
      </el-table-column>
      <!-- /展开面板的内容 -->
      <el-table-column width="300" label="#" prop="id"
        ><template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="分类名称" prop="attr_name"> </el-table-column>
      <el-table-column prop="resolve" label="操作">
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
    <!-- dialog对话框 delete -->
    <el-dialog width="960" title="提示" :visible.sync="dialogVisible">
      <span class="TipContent"
        ><i class="el-icon-warning-outline"></i>此操作将永久删除是否继续？</span
      >
      <!-- 表单底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog对话框 edit -->
    <el-dialog width="960" title="提示" :visible.sync="dialogVisible2">
      <span class="TipContent"
        ><el-form
          :model="FormValue"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="参数" prop="params">
            <el-input
              v-model="FormValue.params"
            ></el-input> </el-form-item></el-form
      ></span>
      <!-- 表单底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tables',
  // beforeMount () {
  //   this.$store.state.params.paramsList = []
  // },
  data () {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      dialogVisible2: false, // 控制编辑按钮的对话框
      FormValue: {
        params: ''
      },
      row: {}, // 存储要操作的当前行的数据
      rules: {
        params: [
          { required: true, message: '请输入参数', trigger: 'blur' },
          { min: 3, max: 7, message: '长度必须是3~7个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 编辑按钮
    handleEdit (_, row) {
      // 弹出dialog对话框
      this.dialogVisible2 = true
      this.row = row
      this.FormValue.params = row.attr_name
    },
    // 提交编辑表单
    async confirmEdit () {
      this.dialogVisible2 = false
      // 调度编辑参数的action
      await this.$store.dispatch('params/editParamas', { id: this.selectNodeId, newName: this.FormValue.params, row: this.row })
      // 再次调度获取分类参数的action
      this.$store.dispatch('params/getParams', { id: this.selectNodeId, type: { sel: this.row.attr_sel } })
    },
    // 删除按钮
    handleDelete (_, row) {
      // 弹出dialog对话框
      this.dialogVisible = true
      this.row = row
    },
    // 确认删除参数
    async confirmDelete () {
      this.dialogVisible = false
      // 调度删除参数的action
      await this.$store.dispatch('params/deleteParams', this.row)
      // 再次调度获取分类参数的action
      this.$store.dispatch('params/getParams', { id: this.selectNodeId, type: { sel: this.row.attr_sel } })
    },
    // tag标签对应的函数
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {
    ...mapState('params', ['paramsList']),
    ...mapState('params', ['selectNodeId'])
  },
  watch: {},
  filters: {},
  components: {},
  beforeDestroy () {
    // 提交一个清除vuex上参数列表的action
    this.$store.commit('params/clearParam')
  }
}
</script>

<style scoped lang='less'>
.el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.TipContent {
  font-size: 20px;
  .el-icon-warning-outline {
    font-size: 24px;
    color: #e6a23c;
  }
}
</style>
