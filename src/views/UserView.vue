<template>
    <div>
        <div class="search-box"> <el-form :inline="true" :model="selectUserData" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="selectUserData.nickName" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="角色">
        <el-select v-model="selectUserData.roleAu" class="m-2" placeholder="Select" size="large">
            <el-option label="全部" :value="3" :key="3"/>
    <el-option
      v-for="item in roleList"
      :key="item.roleAu"
      :label="item.roleName"
      :value="item.roleAu"
    />
  </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>  
    </el-form-item>
  </el-form></div>
  <el-table :data="userlist" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="nickName" label="姓名" width="180" />
    <el-table-column prop="role" label="角色" >
    <template #default="scope">
        <span
        type="primary"
              v-for="item in scope.row.role"
              :key="item.role"
             >
{{item.roleName}} <!-- @click.prevent="show(scope.row)" -->
        </span>
      </template>
      </el-table-column>
      <el-table-column prop="role" label="操作" >
    <template #default="scope">
        <el-button
        link
        type="primary"
        size="small"
        @click="changeUser(scope.row)"
             >
编辑
        </el-button>
      </template>
      </el-table-column>
  </el-table>
    </div>
    <el-dialog v-model="isShow" title="编辑信息">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select mutiple v-model="active.role" placeholder="请选择角色">
          <el-option
      v-for="item in roleList"
      :key="item.roleAu"
      :label="item.roleName"
      :value="item.roleAu"
    />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateUser">更改</el-button>
        <el-button type="primary"
          >取消</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted,reactive,toRefs,watch} from 'vue'
import { getUserList, getRoleList } from '@/request/api';
import {InitData,UserInt} from '../type/user'
export default defineComponent({
    setup() {
        const data = reactive(new InitData())
        onMounted(() => {
            getUser()
            getRole()
        })
        const getUser = () => {
            getUserList().then((res) => {
                // console.log(res)
                data.userlist =res.data
            })

        }
        const getRole = () => {
            getRoleList().then((res) => {
                // console.log(res)
                data.roleList = res.data
            })
        }
    //     const show = (row: any) => {
    //         console.log(row.role)
    //         for (const item in row.role) {
    //             console.log(item);
    //         console.log(typeof(item));

    //         }


    //   }
    //查询按钮
    const onSubmit = () => {
      let arr: UserInt[] = []
      if (data.selectUserData.nickName || data.selectUserData.roleAu) {
       // 查询昵称
        if (data.selectUserData.nickName)
        {
          arr = data.userlist.filter((value: UserInt) => {
            return value.nickName.indexOf(data.selectUserData.nickName) !== -1
          })
        }
        //查询角色id
        if (data.selectUserData.roleAu)
        {
          arr = (data.selectUserData.nickName ? arr : data.userlist).filter((value) =>
          {
            console.log(data.userlist);    
            return value.role.find((item) => {
const result = data.selectUserData.roleAu ===item.roleAu  
              console.log(data.selectUserData.roleAu === item.roleAu)
              console.log(item.roleAu);
              console.log(data.selectUserData.roleAu);
              console.log(item); 
           return result })
          })  
        }
      }
      else { arr = data.userlist }
      data.userlist = arr
    }

    watch([() => data.selectUserData.nickName, () => { data.selectUserData.roleAu }], () => {
                if (data.selectUserData.nickName == "" || data.selectUserData.roleAu == 0) {
                    getUser()
      }
    })
    //编辑角色
    const changeUser = (row: UserInt) => {

      data.active = {
        id: row.id,
        userName: row.userName,
        nickName: row.nickName,
        role: row.role.map((value) => value.roleAu)
        
      }
//console.log(data.active.role);
      data.isShow=true
    }
    const updateUser = () => {
      console.log(data.active.role);
      let obj: any = data.userlist.find((value) => value.id == data.active.id)
      obj.nickName = data.active.nickName
      
      obj.role = data.roleList.filter(value => {
        console.log(data.active.role)
//console.log(data.active.role);
        return data.active.role.indexOf(value.roleAu) !== -1
      })
      data.userlist.forEach((item,i) => {
        if (item.id == obj.id) {
          data.userlist[i]=obj
        }
      })
      data.isShow=false
      console.log(obj.role);
      
      
    }
        return {...toRefs(data),onSubmit,changeUser,updateUser}
    }
})
</script>

<style scoped>

</style>