<template>
  <el-table
    :data="listTest"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="300">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
  </el-table>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
@Component
export default class VuexTable extends Vue {
  @State private listTest: any;
}
</script>