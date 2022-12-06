<template>
  <div class="home">
    <el-container>
      <el-header height="80px"
        ><el-row :gutter="20">
          <el-col :span="4"
            ><div class="grid-content ep-bg-purple" />
            <img src="../assets/logo.png" class="logo"
          /></el-col>
          <el-col :span="16"
            ><div class="grid-content ep-bg-purple" />
            <h2>宠物寄养管理系统</h2></el-col
          >
          <el-col :span="4" class="el-btn"
            ><div class="grid-content ep-bg-purple" />
            <el-button @click="delToken">退出登录</el-button></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px"
          ><el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="item in list"
              :key="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu></el-aside
        >
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const list = router.getRoutes().filter((v) => v.meta.isShow);
    const delToken = () => {
      localStorage.removeItem("token");
      router.push("/login");
    };
    return { list, active: route.path, delToken };
  },
});
</script>
<style lang="scss" scoped>
.el-header {
  height: 80px;
  background-color: #666;
  .logo {
    height: 80px;
  }
  .loginout,
  h2 {
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: aliceblue;
  }
  .el-btn {
    height: 80px;
    line-height: 80px;
  }
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}
</style>

