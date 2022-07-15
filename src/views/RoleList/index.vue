<template>
  <div>
    <BreadCrumb />
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <el-button type="primary">添加角色</el-button>
      </div>
      <!-- 卡片内容 -->
      <div class="text item">
        <el-table :data="roleList" :show-header="false" style="width: 100%">
          <!-- 外层表格的一列 -->
          <el-table-column type="expand" prop="icon" label="#" width="100">
            <!-- 展开行的内容 -->
            <template slot-scope="props">
              <!-- 嵌套内部表格 -->
              <el-table
                :data="props.row.children"
                :show-header="false"
                style="width: 100%"
              >
                <!-- 第一列 -->
                <el-table-column prop="date" width="200">
                  <template slot-scope="scope">
                    <el-tag>{{ scope.row.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </template>
                </el-table-column>
                <!-- 第二列 -->
                <el-table-column prop="name">
                  <template slot-scope="scope">
                    <!-- 内嵌TaBle -->
                    <el-table
                      :data="scope.row.children"
                      :show-header="false"
                      style="width: 100%"
                    >
                      <!-- 第一列 -->
                      <el-table-column prop="date" width="200">
                        <template slot-scope="scope">
                          <el-tag type="success">{{
                            scope.row.authName
                          }}</el-tag
                          ><i class="el-icon-caret-right"></i>
                        </template>
                      </el-table-column>
                      <!-- 第二列 -->
                      <el-table-column prop="date">
                        <template slot-scope="scope">
                          <!-- 动态标签 -->
                          <el-tag
                            v-for="tag in scope.row.children"
                            :key="tag.id"
                            :closable="true"
                            type="warning"
                            @close="closeTag(props.row.id, tag.id)"
                          >
                            {{ tag.authName }}
                          </el-tag>
                          <!-- /动态标签 -->
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <!-- 外层表格的二列 -->
          <el-table-column label="#" prop="index">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template></el-table-column
          >
          <!-- 外层表格三列 -->
          <el-table-column label="角色名称" prop="roleName"> </el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
          <el-table-column label="操作" prop="operation">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                size="mini"
                icon="el-icon-delete"
                type="danger"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-s-tools"
                @click="handleSet(scope.$index, scope.row)"
                >权限管理</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分配权限对话框 -->
      <el-dialog width="960" title="分配权限" :visible.sync="dialogVisible">
        <!-- 树形菜单 -->
        <el-tree
          :data="menuRight"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
          :default-expand-all="true"
          ref="treeMenu"
        >
        </el-tree>

        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmSetRole">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除权限提示对话框 -->
      <el-dialog width="960" title="提示" :visible.sync="dialogVisible2">
        <span class="TipContent"
          ><i class="el-icon-warning-outline"></i
          >此操作将永久删除是否继续？</span
        >
        <!-- 表单底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="confirmDeleteRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'

import { mapState } from 'vuex'
export default {
  created () {
    this.$store.dispatch('roles/RoleList')
    // 获取菜单权限
    this.getTreeAuthorizationList()
  },
  data () {
    return {
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogVisible2: false,
      roleId: 0,
      rightId: 0
    }
  },
  methods: {
    // 编辑
    handleEdit () {

    },
    // 删除
    handleDelete () {

    },
    // 分配权限
    handleSet (index, row) {
      this.roleId = row.id
      this.dialogVisible = true
      // 给树形选择器设置选中状态的节点
      setTimeout(() => {
        const checkedArr = this.$store.state.roles.roleList
        const resolveArr = checkedArr.map((item) => {
          return item.children
        })
        // 根据索引号拿到对应行的角色权限
        const lastArr = resolveArr[index]
        console.log('lastArr', lastArr)
        const nodeArr = []
        // 将二级树形节点的children取出来
        const lastArr2 = lastArr.map((item) => {
          return item.children
        })
        // 将遍历二级节点将三级节点中的children数组解构放到节点数组
        lastArr2.forEach((item) => {
          item.forEach((item) => {
            nodeArr.push(...item.children)
          })
        })
        // 调用组件的API设置选中的节点
        this.$refs.treeMenu.setCheckedNodes(nodeArr)
      }, 0)
    },
    // 确认提交分配权限的表单
    async confirmSetRole () {
      this.dialogVisible = false
      // 获取选中的节点的id数组
      const res = this.$refs.treeMenu.getCheckedNodes(false, true)
      const treeNodeArr = res.map(item => {
        return item.id
      })
      // 将数组转换成字符串
      const treeNodeStr = treeNodeArr.toString()
      // 分发更新角色权限的action
      await this.$store.dispatch('rights/addRight', { roleId: this.roleId, rids: treeNodeStr })
      // 再次分发一个获取角色权限列表的action更新视图
      this.$store.dispatch('roles/RoleList')
    },
    // 分发一个获取菜单权限列表的action
    getTreeAuthorizationList () {
      this.$store.dispatch('rights/TreeAuthorization')
    },
    // 关闭tag标签
    async closeTag (roleId, rightId) {
      this.dialogVisible2 = true
      this.roleId = roleId
      this.rightId = rightId
    },
    // 确定删除权限
    async confirmDeleteRole () {
      // 分发一个删除此标签权限的action
      await this.$store.dispatch('rights/deleteRolesRight', { roleId: this.roleId, rightId: this.rightId })
      this.dialogVisible2 = false
      // 再次分发一个获取角色权限列表的action更新视图
      this.$store.dispatch('roles/RoleList')
    }
  },
  computed: {
    ...mapState('roles', ['roleList']),
    ...mapState('rights', ['menuRight'])
  },
  watch: {},
  filters: {},
  components: {
    BreadCrumb
  }
}
</script>

<style scoped lang='less'>
.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
.TipContent {
  font-size: 20px;
  .el-icon-warning-outline {
    font-size: 24px;
    color: #e6a23c;
  }
}
.box-card {
  margin-top: 20px;
}
</style>
