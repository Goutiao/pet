<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="pageList.comList" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="产品" width="180" />
      <el-table-column prop="title" label="分类" width="180" />
      <el-table-column prop="introduce" label="品牌" />
      <el-table-column prop="introduce" label="花费" />
      <el-table-column prop="introduce" label="购买日期" />
      <el-table-column prop="introduce" label="耗尽日期" />
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="prev, pager, next"
      :page-size="selectData.pagesize"
      :total="selectData.count"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  computed,
  watch,
  onMounted,
} from "vue";
import { getGoodsList } from "@/request/api";
import { ListInt, InitData } from "@/type/goods";

export default defineComponent({
  setup() {
    /* eslint-disable */
    const data = reactive(new InitData());
    onMounted(() => {
      getGoods();
    });
    const getGoods = () => {
      getGoodsList().then((res) => {
        console.log(res);
        data.list = res.data;
        data.selectData.count = res.data.length;
      });
    };

    const pageList = reactive({
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });
    const currentChange = (page: number) => {
      data.selectData.page = page;
    };
    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize;
    };
    const onSubmit = () => {
      let arr: ListInt[] = [];
      if (data.selectData.title || data.selectData.introduce) {
        if (data.selectData.title) {
          arr = data.list.filter((value: ListInt) => {
            return value.title.indexOf(data.selectData.title) !== -1;
          });
        } else if (data.selectData.introduce) {
          arr = data.list.filter((value: ListInt) => {
            return value.introduce.indexOf(data.selectData.introduce) !== -1;
          });
        } else {
          arr = data.list;
        }
        data.list = arr;
        data.selectData.count = arr.length;
      }

      watch(
        [
          () => data.selectData.title,
          () => {
            data.selectData.introduce;
          },
        ],
        () => {
          if (data.selectData.title == "" && data.selectData.introduce == "") {
            getGoods();
          }
        }
      );
    };
    return { ...toRefs(data), sizeChange, currentChange, pageList, onSubmit };
  },
});
</script>

<style scoped>
</style>
