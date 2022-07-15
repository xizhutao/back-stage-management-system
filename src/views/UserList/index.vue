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
                  @click="queryUserMessage(inputValue)"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <!-- 添加用户按钮 -->
            <el-button @click="dialogShow" class="addUser" type="primary"
              >添加用户</el-button
            ></el-col
          >
        </el-row>
      </div>
      <!-- 卡片内容 -->
      <div class="text item">
        <!-- 表格 -->
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          border
          :stripe="true"
          style="width: 100%"
        >
          <el-table-column prop="index" label="#" width="100">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              {{ scope.row.username }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="电话">
            <template slot-scope="scope">
              {{ scope.row.mobile }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="角色">
            <template slot-scope="scope">
              {{ scope.row.role_name }}
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#409eff"
                inactive-color="#dcdfe6"
                @change="onchangeState(scope.row.id, scope.row.mg_state)"
              >
              </el-switch>
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
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-s-tools"
                @click="handleSet(scope.$index, scope.row)"
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
            :page-sizes="[1, 2, 3, 5]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 添加用户 对话框 -->
      <el-dialog
        width="960"
        title="添加用户对话框"
        :visible.sync="dialogVisible"
      >
        <!-- 表单 -->
        <el-form :rules="rules" ref="formRef" :model="form" label-width="10%">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="formSubmit('form')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 编辑按钮对话框 -->
      <el-dialog width="960" title="编辑用户" :visible.sync="dialogVisible2">
        <!-- 表单 -->
        <el-form :rules="rules2" ref="formRef" :model="form2" label-width="15%">
          <el-form-item prop="username" label="用户名称">
            <el-input disabled v-model="form2.username"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form2.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="mobile" label="手机号">
            <el-input v-model="form2.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="formSubmit2">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 删除按钮对话框 -->
      <el-dialog width="960" title="提示" :visible.sync="dialogVisible3">
        <span class="TipContent"
          ><i class="el-icon-warning-outline"></i
          >此操作将永久删除是否继续？</span
        >
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="confirmDelete">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 设置 对话框 -->
      <el-dialog width="960" title="分配角色" :visible.sync="dialogVisible4">
        <div>
          当前用户:&nbsp;<span>{{ row.username }}</span>
        </div>
        <div>
          当前角色:&nbsp;<span>{{ row.role_name }}</span>
        </div>
        <span>分配新角色&nbsp;</span>
        <el-select v-model="selectRole" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.roleName"
          >
          </el-option>
        </el-select>
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="confirmSet">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'UserList',
  created () {
    // 获取用户列表数据
    this.getUserData()
  },
  data () {
    return {
      inputValue: '',
      tableData: [],
      pagenum: 1,
      pageSize: 5, // 单页的数量
      currentPage: 1,
      dialogVisible: false, // 对话框可见性
      dialogVisible2: false, // 编辑按钮的可见性
      dialogVisible3: false, // 删除按钮的可见性
      dialogVisible4: false, // 设置按钮的可见性
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为3~8个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为3~8个字符', trigger: 'blur' }
        ],
        email: [
          {
            type: 'email',
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确'
          }
        ],
        mobile: [
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机格式不正确'
          }
        ]
      },
      form2: {
        username: '',
        email: '',
        mobile: ''
      },
      rules2: {
        username: [
          { min: 3, max: 8, message: '长度为3~8个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输邮箱', trigger: 'blur' },
          {
            type: 'email',
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '邮箱格式不正确'
          }
        ],
        mobile: [
          { required: true, message: '请输手机号', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '手机格式不正确'
          }
        ]
      },
      rowId: 0, // 存放编辑的行id
      row: {}, // 存放点击按钮后拿到的每一行的数据
      roleList: [],
      selectRole: '',
      rid: 0
    }
  },
  methods: {
    async getUserData () {
      // 调度action发起异步请求拿到用户列表
      await this.$store.dispatch('user/UserList')
      this.tableData = this.$store.state.user.userList
    },
    // 当前页变化
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      console.log('currentPage', currentPage)
    },
    // pageSize变化
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      console.log('pageSize', pageSize)
    },
    // 弹出对话框
    dialogShow () {
      this.dialogVisible = true
    },
    // 添加用户 表单提交
    async formSubmit () {
      this.dialogVisible = false
      // 手动校验
      this.$refs.formRef.validate()
      try {
        // 分发添加用户的action
        await this.$store.dispatch('user/add_user', this.form)
        // 重新调度action发起异步请求拿到用户列表
        await this.$store.dispatch('user/UserList')
        this.tableData = this.$store.state.user.userList
        this.$message.success('添加用户成功')
      } catch (err) {
        this.$message.error('操作失败')
        console.log(err)
      }
    },
    // 编辑行
    handleEdit (_, row) {
      this.dialogVisible2 = true
      this.form2.username = row.username
      this.rowId = row.id
    },
    // 编辑的表单提交

    async formSubmit2 () {
      // 手动校验
      this.$refs.formRef.validate()
      try {
        // 分发编辑用户的action
        await this.$store.dispatch('user/edit_user', { rowId: this.rowId, data: { email: this.form2.email, mobile: this.form2.mobile } })
        this.$message.success('编辑用户成功')
        // 再次分发获取用户列表的action
        // 调度action发起异步请求拿到用户列表
        await this.$store.dispatch('user/UserList')
        this.tableData = this.$store.state.user.userList
        this.dialogVisible2 = false
      } catch (err) {
        this.$message.error('操作失败')
        console.log(err)
      }
    },
    // 删除行
    handleDelete (_, row) {
      this.dialogVisible3 = true
      // 将用户id存到rowId中
      this.rowId = row.id
    },
    // 确认删除的回调
    async confirmDelete () {
      try {
        this.dialogVisible3 = false
        // 分发删除数据的action
        await this.$store.dispatch('user/DeleteItem', this.rowId)
        // 再次分发获取用户列表的action
        await this.$store.dispatch('user/UserList')
        this.tableData = this.$store.state.user.userList
        this.dialogVisible3 = false
      } catch (err) { console.log(err) }
    },
    // 设置行
    async handleSet (_, row) {
      try {
        this.rowId = row.id
        this.row = row
        // 展示弹出框
        this.dialogVisible4 = true
        // 1、分发获取角色列表的action
        await this.$store.dispatch('roles/RoleList')
        // 2、从状态树上拿角色列表存data中
        this.roleList = this.$store.state.roles.roleList
      } catch (err) {
        console.log(err)
      }
    },
    // 确认设置的回调
    async confirmSet () {
      try {
        this.dialogVisible4 = false
        // 1、拿到用户id和分配的角色id
        this.roleList.forEach((item) => {
          if (item.roleName === this.selectRole) {
            this.rid = item.id
          }
        })
        // 2、分发分配角色的action
        const res = await this.$store.dispatch('user/SetItem', { target: this.rowId, rid: this.rid })
        if (res.data.meta.msg === '设置角色成功') {
          this.$message.success('设置角色成功')
          // 3、再次分发获取用户列表的action重新获取用户的列表
          await this.$store.dispatch('user/UserList')
          this.tableData = this.$store.state.user.userList
          this.dialogVisible4 = false
        } else {
          this.$message.warning('操作失败')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // switch状态改变的回调
    async onchangeState (id, newState) {
      try {
        // 1、拿到当前的状态
        // 2、分发改变状态的action
        const res = await this.$store.dispatch('user/changeState', { uid: id, type: newState })
        if (res.data.meta.msg === '设置状态成功') {
          this.$message({
            type: 'success',
            message: '设置状态成功',
            duration: 1000
          })
        }
      } catch (err) {
        this.$message.error('操作失败')
        console.log(err)
      }
    },
    // 根据id查循用户的信息
    async queryUserMessage (value) {
      try {
        // 分发根据id查旬用户信息的action
        await this.$store.dispatch('user/getUserMessage', value)
        this.tableData = this.$store.state.user.userList
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
  },
  watch: {

  },
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
.TipContent {
  font-size: 20px;
  .el-icon-warning-outline {
    font-size: 24px;
    color: #e6a23c;
  }
}
</style>
