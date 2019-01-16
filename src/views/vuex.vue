<template>
  <div class="vuex">
    <el-button type="primary" @click.native="addNewData">添加数据</el-button>
    <VuexTable v-if="listTest.length"></VuexTable>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import VuexTable from '../components/vuex/index.vue';
@Component({
  components: {
    VuexTable,
  },
})
export default class VuexComp extends Vue {
  private tableData: any[] = [];
  @State private listTest: any;
  @Mutation('setListTest') private setListTest!: any;
  private addNewData() {
    this.tableData.push({
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
    });
    this.setListTest(this.tableData);
  }
}
</script>