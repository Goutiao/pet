<template>
 <div class="search-box"> 
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
  <el-button type="primary" @click="addRole" >添加角色</el-button>  
    </el-form-item>
  </el-form>

  <el-table :data="roleList" border style="width: 100%">
    <el-table-column prop="roleAu" label="ID" width="180" />
    <el-table-column prop="roleName" label="角色姓名" width="180" />
    <el-table-column prop="authority" label="操作" >
    <template #default="scope">
        <span
        type="primary"
        @click="changeRole(scope.row)"
             >
修改权限
        </span>
      </template>
      </el-table-column>
  </el-table>
    </div>
</template>

<script lang="ts">
  import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, onMounted,reactive,toRefs } from 'vue'
import { getRoleList } from '@/request/api'
import { RoleInitData,RoleInt } from '@/type/role'
import {useRouter} from 'vue-router'

export default defineComponent({
    setup() {
    const data = reactive(new RoleInitData())
    const router = useRouter()
        onMounted(() => {
            getRoleList().then(res => {
                console.log(res);
                data.roleList = res.data
            })
        })
//添加角色
    const addRole = () => {
  //ui按钮
  ElMessageBox.prompt('请输入角色名称', '添加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      if (value) {
        data.roleList.push({roleAu:data.roleList.length+1,roleName:value,authority:[]})
      }
      ElMessage({
        type: 'success',
        message: `${value}角色添加成功`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })

    }
    const changeRole = (row :RoleInt) => {
      router.push({
        name: "authority",
        params: {
          id: row.roleAu,
          authority:row.authority.join(',')
        },
    
  })
}
        return {...toRefs(data),addRole,changeRole}
    }
})
</script>

<style scoped>

</style>