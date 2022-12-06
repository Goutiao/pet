<template>
    <div class="login-box">
        <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
  >
  <h2>后台管理系统</h2>
    <el-form-item label="账号：" prop="username">
      <el-input v-model="ruleForm.username"  autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button class='loginBtn' type="primary" @click="submitForm(ruleFormRef) "
        >登录</el-button
      >
      <el-button class='resetBtn' @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs,ref } from 'vue'
import {LoginData} from '../type/login'
import type { FormInstance } from 'element-plus'
import { login } from '../request/api'
import { useRouter } from 'vue-router'


export default defineComponent({
    setup () {
        const data = reactive(new LoginData())
const rules ={
                username: [{ required: true, message: '请输入账号', trigger: 'blur' },
                    {min:3,max:10,message:'账号的长度是3-10位',trigger:'blur'}],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                    {min:3,max:10,message:'密码的长度是3-10位',trigger:'blur'
                }],
  
    }
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const resetForm = () => {
      data.ruleForm.username = ""
        data.ruleForm.password=""
      }
    const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login(data.ruleForm).then((res) => {
        localStorage.setItem('token', res.data.token)
        router.push('/')
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
    
    return {
      ...toRefs(data),
      rules,
      resetForm,
      ruleFormRef,
      submitForm
    }
    }
})
</script>

<style lang="scss" scoped>
.login-box{
    width: 100%;
    height: 100%;
    background: url(../assets/bg.webp);
    padding:1px;
    text-align: center;
    .demo-ruleForm{
        width: 500px;
       margin:200px auto;
       background-color: white;
       padding: 40px;
       border-radius: 20px;
.loginBtn{
    width: 48%;
}
.resetBtn{
    width:49%;
}
h2{
    margin-bottom:20px;
}
    }
}
</style>