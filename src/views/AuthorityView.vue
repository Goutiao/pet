<template>
    <div>
        <el-tree
        ref="treeRef"
    :data="auList"
    show-checkbox
    node-key="roleId"
    :check-strictly="true"
    :default-checked-keys="Au.authority"
    :props="defaultProps"
  />
  <el-button type="primary" @click="changeAu" >确认修改</el-button> 
    </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs } from 'vue'
import {useRoute} from 'vue-router'
import { AuInitData } from '@/type/authority'
import {getAuList} from '../request/api'
export default defineComponent({
    setup() {
        const defaultProps = {
  children: 'roleList',
  label: 'name',
}
    const route = useRoute()
        const params: any = route.params
        onMounted(() => {
            getAuList().then(res => {
                data.auList = res.data
            console.log(res)
        })
    })
        const data = reactive(new AuInitData(params.id, params.authority))
        const changeAu = () => {
        console.log(data.treeRef.getCheckedKeys().sort(function(a:number,b:number){a-b}));
        
    }
        return {...toRefs(data),defaultProps,changeAu}
    }
})
</script>

<style scoped>

</style>